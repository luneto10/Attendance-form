import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    const handlePrev = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    return (
        <div className="d-flex justify-content-center">
            <button
                className="btn border-0 me-2"
                onClick={handlePrev}
                disabled={currentPage === 1}
            >
                <ArrowBackIosOutlinedIcon />
            </button>
            <span className="align-self-center">
                Page {currentPage} of {totalPages}
            </span>
            <button
                className="btn border-0 ms-2"
                onClick={handleNext}
                disabled={currentPage === totalPages}
            >
                <ArrowForwardIosOutlinedIcon />
            </button>
        </div>
    );
}

export default Pagination;
