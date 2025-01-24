import { DateTime } from "luxon";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

interface StudentCardProps {
    student: any;
    onEdit: (student: any) => void;
    onDelete: (id: string) => void;
}

function StudentCard({ student, onEdit, onDelete }: StudentCardProps) {
    return (
        <div className="card mb-3">
            <div className="card-body bg-light rounded-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title mb-0">{student.name}</h5>
                    <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => onEdit(student)}
                    >
                        Edit
                    </button>
                </div>
                <p className="mb-1">
                    <strong>NUID:</strong> {student.nuid}
                </p>
                <p className="mb-1">
                    <strong>Course:</strong> {student.course}
                </p>
                <p className="mb-1">
                    <strong>Lab Time:</strong> {student.labTime}
                </p>
                <p className="mb-1">
                    <strong>Date:</strong>{" "}
                    {DateTime.fromISO(student.createdAt).toLocaleString(
                        DateTime.DATE_MED
                    )}
                </p>
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onDelete(student._id)}
                    >
                        <DeleteOutlinedIcon />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StudentCard;
