import { DateTime } from "luxon";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
function StudentRow({ student, onEdit, onDelete }: any) {
    return (
        <tr>
            <td className="text-sm">{student.name}</td>
            <td className="text-sm">{student.nuid}</td>
            <td className="text-sm">{student.course}</td>
            <td className="text-sm">{student.labTime}</td>
            <td className="text-sm">
                {DateTime.fromISO(student.createdAt).toLocaleString(
                    DateTime.DATE_MED
                )}
            </td>
            <td className="text-center">
                <button
                    className="btn btn-sm p-0"
                    onClick={() => onEdit(student)}
                >
                    Edit
                </button>
                <button
                    className="btn btn-sm p-0 ms-1"
                    onClick={() => onDelete(student._id)}
                >
                    <DeleteOutlinedIcon />
                </button>
            </td>
        </tr>
    );
}

export default StudentRow;
