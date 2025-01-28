import api from './axiosConfig';
import { Student } from '../types/Student';

export const getStudents = async (): Promise<Student[]> => {
  const response = await api.get('/students');
  return response.data;
};

export const createStudent = async (student: Student): Promise<Student> => {
  const response = await api.post('/students', student);
  return response.data;
};

export const updateStudent = async (id: number, student: Student): Promise<Student> => {
  const response = await api.patch(`/students/${id}`, student);
  return response.data;
};

export const deleteStudent = async (id: number): Promise<void> => {
  await api.delete(`/students/${id}`);
};
