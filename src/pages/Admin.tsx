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

function Admin() {
    const [students, setStudents] = useState<Student[]>([]);
    const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [rowsPerPage] = useState<number>(10);

    // Retrieve `selectedDay` from Local Storage or use today's date as default
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
            const studentsData = await getStudents();
            const convertedStudents = studentsData.map((student) => ({
                ...student,
                createdAt: convertToCST(student.createdAt),
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
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1 className="mb-0">Students List</h1>
                <button
                    className="btn btn-outline-secondary"
                    onClick={handleRefresh}
                >
                    <RefreshOutlinedIcon />
                </button>
            </div>

            <div className="mb-4">
                <div className="row">
                    <div className="col-md-3">
                        <label htmlFor="course" className="form-label">
                            Filter by Course:
                        </label>
                        <select
                            id="course"
                            className="form-select"
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="CSCE 156">CSCE 156</option>
                            <option value="CSCE 156H">CSCE 156H</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="labTime" className="form-label">
                            Filter by Lab Time:
                        </label>
                        <select
                            id="labTime"
                            className="form-select"
                            value={selectedLabTime}
                            onChange={(e) => setSelectedLabTime(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="8:30 AM - 10:20 AM">
                                8:30 AM - 10:20 AM
                            </option>
                            <option value="11:30 AM - 1:20 PM">
                                11:30 AM - 1:20 PM
                            </option>
                            <option value="2:30 PM - 3:20 PM">
                                2:30 PM - 3:20 PM
                            </option>
                            <option value="4:30 PM - 6:20 PM">
                                4:30 PM - 6:20 PM
                            </option>
                            <option value="6:30 PM - 8:20 PM">
                                6:30 PM - 8:20 PM
                            </option>
                        </select>
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
                        <label htmlFor="searchNuid" className="form-label">
                            Search by NUID:
                        </label>
                        <input
                            type="text"
                            id="searchNuid"
                            className="form-control"
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
                {students.length > rowsPerPage && (
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
