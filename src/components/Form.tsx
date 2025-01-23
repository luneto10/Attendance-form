import React, { useState } from "react";
import axios from "axios";
interface FormProps {
    studentsData: {
        nuid: string;
        name: string;
        course: string;
        labTime: string;
    }[];
}
function Form({ studentsData }: FormProps) {
    const [name, setName] = useState<string>("");
    const [nuid, setNuid] = useState<string>("");
    const [course, setCourse] = useState<string>("CSCE 156");
    const [labTime, setLabTime] = useState<string>("8:30 AM - 10:20 AM");
    const [submittedData, setSubmittedData] = useState<{
        nuid: string;
        name: string;
        course: string;
        labTime: string;
    } | null>(null);

    const handleCourseChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedCourse = event.target.value;
        setCourse(selectedCourse);

        if (selectedCourse === "CSCE 156H") {
            setLabTime("4:30 PM - 6:20 PM");
        } else {
            setLabTime("8:30 AM - 10:20 AM");
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const payload = {
            nuid: nuid,
            name: name,
            course : course,
            labTime: labTime,
        };

        try {
            // Send POST request to the host
            const response = await axios.post(
                "http://localhost:3000/api/students",
                payload
            );
            console.log("Response:", response.data);

            setSubmittedData({ nuid, name, course, labTime });
            studentsData.push({ nuid, name, course, labTime });
        } catch (error) {
            console.error("Error sending data:", error);
            alert("Failed to send data. Please try again.");
        }

        // Reset the form
        setName("");
        if (course !== "CSCE 156H") {
            setLabTime("8:30 AM - 10:20 AM");
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center bg-light"
            style={{ height: "100vh", width: "100vw" }}
        >
            <div className="d-flex justify-content-center align-items-center flex-column">
                <h1 className="text-3xl font-bold mb-4">Attendance</h1>

                {
                    <form
                        onSubmit={handleSubmit}
                        className="d-flex justify-content-center flex-column"
                        style={{ width: "fit-content" }}
                    >
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                            className="border border-gray-300 p-2 rounded mb-2"
                            required
                        />
                        <input
                            type="text"
                            id="nuid"
                            name="nuid"
                            value={nuid}
                            onChange={(e) => setNuid(e.target.value)}
                            placeholder="Your NUID"
                            className="border border-gray-300 p-2 rounded mb-2"
                            required
                        />
                        <div>
                            <select
                                id="course"
                                name="course"
                                value={course}
                                onChange={handleCourseChange}
                                className="border border-gray-300 p-2 rounded mb-2"
                                required
                            >
                                <option value="CSCE 156">CSCE 156</option>
                                <option value="CSCE 156H">CSCE 156H</option>
                            </select>

                            <select
                                id="labTime"
                                name="labTime"
                                value={labTime}
                                onChange={(e) => setLabTime(e.target.value)}
                                className="border border-gray-300 p-2 rounded mb-2"
                                required
                                disabled={course === "CSCE 156H"}
                            >
                                <option value="8:30 AM - 10:20 AM">
                                    8:30 AM - 10:20 AM
                                </option>
                                <option value="11:30 AM - 1:20 PM">
                                    11:30 AM - 1:20 PM
                                </option>
                                <option value="2:30 PM - 3:20 PM">
                                    2:30 PM - 3:20 PM
                                </option>
                                {course === "CSCE 156H" && (
                                    <option value="6:30 PM - 8:20 PM">
                                        6:30 PM - 8:20 PM
                                    </option>
                                )}
                                <option value="4:30 PM - 6:20 PM">
                                    4:30 PM - 6:20 PM
                                </option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    </form>
                }

                {submittedData && (
                    <div className="mt-4 p-4 bg-green-100 rounded shadow text-center">
                        <p className="text-lg">
                            Thank you,{" "}
                            <span className="font-bold">
                                {submittedData.name}
                            </span>
                            , for attending the class!
                        </p>
                        <p className="text-lg">
                            Course:{" "}
                            <span className="font-bold">
                                {submittedData.course}
                            </span>
                        </p>
                        <p className="text-lg">
                            Lab Time:{" "}
                            <span className="font-bold">
                                {submittedData.labTime}
                            </span>
                        </p>
                        <p className="text-sm text-gray-600 mt-2">
                            If you entered the wrong name, please contact the
                            LAs (Learning Assistants) for assistance.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Form;
