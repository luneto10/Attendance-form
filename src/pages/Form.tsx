import React, { useState } from "react";
import axios from "axios";
import TextInput from "../components/TextInput";
import SelectInput from "../components/SelectInput";
import SuccessMessage from "../components/SuccessMessage";

interface FormProps {
    studentsData: {
        nuid: string;
        name: string;
        course: string;
        labTime: string;
    }[];
}

function Form({ studentsData }: FormProps) {
    const [formData, setFormData] = useState({
        name: "",
        nuid: "",
        course: "CSCE 156",
        labTime: "8:30 AM - 10:20 AM",
    });

    const [submittedData, setSubmittedData] = useState<typeof formData | null>(
        null
    );

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prevData) => {
            const updatedData = { ...prevData, [name]: value };

            // Automatically update labTime for "CSCE 156H"
            if (name === "course" && value === "CSCE 156H") {
                updatedData.labTime = "4:30 PM - 6:20 PM";
            } else if (name === "course" && value !== "CSCE 156H") {
                updatedData.labTime = "8:30 AM - 10:20 AM";
            }

            return updatedData;
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await axios.post("http://localhost:3000/api/students", formData);

            setSubmittedData(formData);
            studentsData.push(formData);

            setFormData({
                name: "",
                nuid: "",
                course: "CSCE 156",
                labTime: "8:30 AM - 10:20 AM",
            });
        } catch (error) {
            console.error("Error sending data:", error);
            alert("Failed to send data. Please try again.");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center py-4 vh-100">
            <div className="card p-4 w-100" style={{ maxWidth: "500px" }}>
                <h1 className="text-center mb-4">Attendance</h1>

                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-12">
                            <TextInput
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                label="Name"
                                placeholder="Enter your name"
                                required
                            />
                        </div>

                        <div className="col-12">
                            <TextInput
                                id="nuid"
                                name="nuid"
                                value={formData.nuid}
                                onChange={handleChange}
                                label="NUID"
                                placeholder="Enter your NUID"
                                required
                            />
                        </div>

                        <div className="col-12">
                            <SelectInput
                                id="course"
                                name="course"
                                value={formData.course}
                                onChange={handleChange}
                                label="Course"
                                options={[
                                    { value: "CSCE 156", label: "CSCE 156" },
                                    { value: "CSCE 156H", label: "CSCE 156H" },
                                ]}
                                required
                            />
                        </div>

                        <div className="col-12">
                            <SelectInput
                                id="labTime"
                                name="labTime"
                                value={formData.labTime}
                                onChange={handleChange}
                                label="Lab Time"
                                options={[
                                    {
                                        value: "8:30 AM - 10:20 AM",
                                        label: "8:30 AM - 10:20 AM",
                                    },
                                    {
                                        value: "11:30 AM - 1:20 PM",
                                        label: "11:30 AM - 1:20 PM",
                                    },
                                    {
                                        value: "2:30 PM - 3:20 PM",
                                        label: "2:30 PM - 3:20 PM",
                                    },
                                    {
                                        value: "4:30 PM - 6:20 PM",
                                        label: "4:30 PM - 6:20 PM",
                                    },
                                    {
                                        value: "6:30 PM - 8:20 PM",
                                        label: "6:30 PM - 8:20 PM",
                                    },
                                ]}
                                disabled={formData.course === "CSCE 156H"}
                                required
                            />
                        </div>

                        <div className="col-12">
                            <button
                                type="submit"
                                className="btn btn-primary w-100 mt-3"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>

                {submittedData && (
                    <SuccessMessage
                        name={submittedData.name}
                        course={submittedData.course}
                        labTime={submittedData.labTime}
                    />
                )}
            </div>
        </div>
    );
}

export default Form;
