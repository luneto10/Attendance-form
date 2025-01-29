import axios from "axios";

export const getStudents = async (): Promise<Student[]> => {
    const response = await axios.get(`http://localhost:3000/api/students`);
    return response.data;
};

export const getStudentById = async (id: string): Promise<Student> => {
    const response = await axios.get(`http://localhost:3000/api/students/${id}`);
    return response.data;
};

export const createStudent = async (student: Student): Promise<void> => {
    await axios.post("http://localhost:3000/api/students", student);
}

export const deleteStudentById = async (id: string): Promise<void> => {
    await axios.delete(`http://localhost:3000/api/students/${id}`);
};

export const deleteAllStudents = async (): Promise<void> => {
    await axios.delete("http://localhost:3000/api/students");
};
