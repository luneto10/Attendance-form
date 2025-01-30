import axios, { AxiosResponse } from 'axios';
import {
    createDeviceId,
    getGeolocation,
    getIpAddress,
} from "./fingerprintUtils";

export const getStudents = async (): Promise<Student[]> => {
    const response = await axios.get(`http://10.9.213.184:3000/api/students`);
    return response.data;
};

export const getStudentById = async (id: string): Promise<Student> => {
    const response = await axios.get(`http://10.9.213.184/api/students/${id}`);
    return response.data;
};

export const createStudent = async (
    student: Student
): Promise<AxiosResponse> => {
    const deviceId = await createDeviceId()
    // const geoLocation = await getGeolocation();
    const ipAddress = await getIpAddress();
    const payload = {
        ...student,
        deviceId: deviceId,
        // geoLocation: geoLocation,
        ipAddress: ipAddress,
    };

    return (await axios.post("http://10.9.213.184:3000/api/students", payload))
};

export const deleteStudentById = async (id: string): Promise<void> => {
    await axios.delete(`http://10.9.213.184:3000/api/students/${id}`);
};

export const deleteAllStudents = async (): Promise<void> => {
    await axios.delete("http://10.9.213.184:3000/api/students");
};
