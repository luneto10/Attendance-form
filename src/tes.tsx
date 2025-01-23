import React, { useState } from "react";

// Array to store all submitted data
const studentsData: { name: string; course: string; labTime: string }[] = [];

function App() {
    const [name, setName] = useState<string>("");
    const [course, setCourse] = useState<string>("CSCE 156");
    const [labTime, setLabTime] = useState<string>("8:30 AM - 10:20 AM");
    const [submittedData, setSubmittedData] = useState<{
        name: string;
        course: string;
        labTime: string;
    } | null>(null);

    const handleCourseChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedCourse = event.target.value;
        setCourse(selectedCourse);

        // Automatically set lab time for CSCE 156H
        if (selectedCourse === "CSCE 156H") {
            setLabTime("4:30 PM - 6:20 PM");
        } else {
            setLabTime("8:30 AM - 10:20 AM"); // Default lab time for CSCE 156
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevents the page from refreshing

        const newSubmission = { name, course, labTime };
        studentsData.push(newSubmission); // Save the submission to the array
        setSubmittedData(newSubmission); // Display the submitted data

        console.log(studentsData); // Log the array to the console

        // Reset form
        setName("");
        if (course !== "CSCE 156H") {
            setLabTime("8:30 AM - 10:20 AM"); // Reset lab time for CSCE 156
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center bg-light"
            style={{ height: "100vh", width: "100vw" }}
        >
            <div className="text-center">
                <h1 className="font-bold mb-4">Attendance</h1>

                <form onSubmit={handleSubmit} className="d-flex flex-column">
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
                        {course === "CSCE 156" && <option value="6:30 PM - 8:20 PM">
                            6:30 PM - 8:20 PM
                        </option>}
                        <option value="4:30 PM - 6:20 PM">
                            4:30 PM - 6:20 PM
                        </option>
                    </select>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </form>

                {/* Display Submitted Data */}
                {submittedData && (
                    <div className="mt-4 p-4 bg-green-100 rounded shadow">
                        <p className="text-lg">
                            Thank you,{" "}
                            <span className="font-bold">
                                {submittedData.name}
                            </span>
                            !
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

export default App;
