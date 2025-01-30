import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import StudentRow from "../components/StudentRow";
import StudentCard from "../components/StudentCard";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import { convertToCST, sortByDateAndName } from "../utils/dateUtils";
import {
    getStudents,
    deleteStudentById,
    deleteAllStudents,
} from "../utils/apiUtils";
import SelectInput from "../components/SelectInput";
import TextInput from "../components/TextInput";

function Admin() {
    const [students, setStudents] = useState<Student[]>([]);
    const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [rowsPerPage] = useState<number>(5);

    const [selectedDay, setSelectedDay] = useState<string>(() => {
        const storedDate = localStorage.getItem("selectedDay");
        const storedTimestamp = localStorage.getItem("selectedDayTimestamp");

        if (storedDate && storedTimestamp) {
            const now = new Date().getTime();
            const storedTime = parseInt(storedTimestamp, 10);

            if (now - storedTime < 60 * 60 * 1000) {
                return storedDate;
            } else {
                localStorage.removeItem("selectedDay");
                localStorage.removeItem("selectedDayTimestamp");
            }
        }

        const today = new Date();
        return convertToCST(today.toISOString());
    });

    const [selectedCourse, setSelectedCourse] = useState<string>("All");
    const [selectedLabTime, setSelectedLabTime] = useState<string>("All");
    const [searchNuid, setSearchNuid] = useState<string>("");

    const fetchStudents = async () => {
        setLoading(true);
        try {
            // const convertedStudents = [
            //     {
            //         _id: "1",
            //         nuid: "12345",
            //         name: "John Doe",
            //         course: "Computer Science",
            //         labTime: "Lab 1",
            //         createdAt: "2023-01-01T00:00:00.000Z",
            //     },
            //     {
            //         _id: "2",
            //         nuid: "67890",
            //         name: "Jane Smith",
            //         course: "Mathematics",
            //         labTime: "Lab 2",
            //         createdAt: "2023-01-02T00:00:00.000Z",
            //     },
            //     {
            //         _id: "3",
            //         nuid: "54321",
            //         name: "Bob Johnson",
            //         course: "Physics",
            //         labTime: "Lab 3",
            //         createdAt: "2023-01-03T00:00:00.000Z",
            //     },
            //     {
            //         _id: "4",
            //         nuid: "98765",
            //         name: "Alice Williams",
            //         course: "Chemistry",
            //         labTime: "Lab 4",
            //         createdAt: "2023-01-04T00:00:00.000Z",
            //     },
            //     {
            //         _id: "5",
            //         nuid: "24680",
            //         name: "Charlie Brown",
            //         course: "Biology",
            //         labTime: "Lab 5",
            //         createdAt: "2023-01-05T00:00:00.000Z",
            //     },
            //     {
            //         _id: "6",
            //         nuid: "13579",
            //         name: "Eve Green",
            //         course: "Computer Science",
            //         labTime: "Lab 6",
            //         createdAt: "2023-01-06T00:00:00.000Z",
            //     },
            //     {
            //         _id: "7",
            //         nuid: "86420",
            //         name: "Frank White",
            //         course: "Mathematics",
            //         labTime: "Lab 7",
            //         createdAt: "2023-01-07T00:00:00.000Z",
            //     },
            // ];
            const studentsData = await getStudents();
            const convertedStudents = studentsData.map((student) => ({
                ...student,
                createdAt: convertToCST(student.createdAt!),
            }));
            setStudents(convertedStudents);
            setFilteredStudents(convertedStudents);
        } catch (err) {
            setError("Failed to fetch students. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleRefresh = () => {
        fetchStudents();
    };

    const handleDeleteAll = async () => {
        if (window.confirm("Are you sure you want to delete all students?")) {
            try {
                await deleteAllStudents();
                setStudents([]);
                setFilteredStudents([]);
                alert("All students have been deleted successfully!");
            } catch (err) {
                alert("Failed to delete all students. Please try again.");
            }
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteStudentById(id);
            setStudents((prev) => prev.filter((student) => student._id !== id));
            if (students.length - 1 <= (currentPage - 1) * rowsPerPage) {
                setCurrentPage((prev) => prev - 1);
            }
        } catch (err) {
            setError("Failed to delete student. Please try again.");
        }
    };

    const handleEdit = (student: Student) => {
        console.log("Edit student:", student);
    };

    const handleDateChange = (newDate: string) => {
        setSelectedDay(newDate);
        localStorage.setItem("selectedDay", newDate);
        localStorage.setItem(
            "selectedDayTimestamp",
            new Date().getTime().toString()
        );
    };

    useEffect(() => {
        let filtered = students;

        if (selectedCourse !== "All") {
            filtered = filtered.filter(
                (student) => student.course === selectedCourse
            );
        }

        if (selectedLabTime !== "All") {
            filtered = filtered.filter(
                (student) => student.labTime === selectedLabTime
            );
        }

        if (selectedDay) {
            filtered = filtered.filter(
                (student) => student.createdAt === selectedDay
            );
        }

        if (searchNuid) {
            filtered = filtered.filter((student) =>
                student.nuid.includes(searchNuid)
            );
        }

        filtered.sort(sortByDateAndName);

        setFilteredStudents(filtered);

        if (filtered.length === 0 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.location.reload();
        }
    }, [
        selectedCourse,
        selectedLabTime,
        selectedDay,
        searchNuid,
        students,
        currentPage,
    ]);

    const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);
    const displayedStudents = filteredStudents.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return <h1 className="text-danger">{error}</h1>;
    }

    return (
        <div className="container vh-100 text-dark">
            <div className="d-flex justify-content-between align-items-center mb-3 mt-1">
                <h1 className="mb-0">Students List</h1>
                <button
                    className="btn btn-outline-secondary px-2 py-1"
                    onClick={handleRefresh}
                >
                    <RefreshOutlinedIcon />
                </button>
            </div>

            <div className="mb-4">
                <div className="row">
                    <div className="col-md-3">
                        <SelectInput
                            id="course"
                            label="Filter by Course"
                            name="course"
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                            options={[
                                { value: "All", label: "All" },
                                { value: "CSCE 156", label: "CSCE 156" },
                                { value: "CSCE 156H", label: "CSCE 156H" },
                            ]}
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <SelectInput
                            id="labTime"
                            label="Filter by Lab Time"
                            name="labTime"
                            value={selectedLabTime}
                            onChange={(e) => setSelectedLabTime(e.target.value)}
                            options={[
                                { value: "All", label: "All" },
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
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="day" className="form-label">
                            Filter by Day:
                        </label>
                        <input
                            type="date"
                            id="day"
                            className="form-control"
                            value={selectedDay}
                            onChange={(e) => handleDateChange(e.target.value)}
                        />
                    </div>
                    <div className="col-md-3">
                        <TextInput
                            id="searchNuid"
                            name="searchNuid"
                            label="Search by NUID"
                            value={searchNuid}
                            onChange={(e) => setSearchNuid(e.target.value)}
                            placeholder="Enter NUID"
                        />
                    </div>
                </div>
            </div>

            <div className="d-none d-md-block">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr className="text-center">
                            <th>Name</th>
                            <th>NUID</th>
                            <th>Course</th>
                            <th>Lab Time</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedStudents.map((student) => (
                            <StudentRow
                                key={student._id}
                                student={student}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="d-block d-md-none">
                {displayedStudents.map((student) => (
                    <StudentCard
                        key={student._id}
                        student={student}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

            <div className="d-flex justify-content-between align-items-center p-2">
                <button
                    className="btn btn-danger"
                    onClick={handleDeleteAll}
                    disabled={students.length === 0}
                >
                    Delete All
                </button>
                {filteredStudents.length > 0 && filteredStudents.length > rowsPerPage && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                )}
            </div>
        </div>
    );
}

export default Admin;
