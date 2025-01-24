interface SuccessMessageProps {
    name: string;
    course: string;
    labTime: string;
}

function SuccessMessage({ name, course, labTime }: SuccessMessageProps) {
    return (
        <div className="alert alert-success mt-4 text-center">
            <p>
                Thank you, <strong>{name}</strong>, for attending the class!
            </p>
            <p>
                Course: <strong>{course}</strong>
            </p>
            <p>
                Lab Time: <strong>{labTime}</strong>
            </p>
            <p className="text-muted">
                If you entered the wrong name, please contact the LAs for
                assistance.
            </p>
        </div>
    );
};

export default SuccessMessage;
