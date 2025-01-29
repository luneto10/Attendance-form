import axios from "axios";

// Busca estudantes da API
export const getStudents = async (): Promise<Student[]> => {
    const response = await axios.get(`http://localhost:3000/api/students`);
    return response.data;
};

// Remove um estudante pelo ID
export const deleteStudentById = async (id: string): Promise<void> => {
    await axios.delete(`http://localhost:3000/api/students/${id}`);
};

// Remove todos os estudantes
export const deleteAllStudents = async (): Promise<void> => {
    await axios.delete("http://localhost:3000/api/students");
};
