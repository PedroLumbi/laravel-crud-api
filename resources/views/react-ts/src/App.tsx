import React, { useEffect, useState } from "react";
import { getStudents, createStudent, updateStudent, deleteStudent } from "./api/studentService";
import { Student } from "./types/Student";
import StudentForm from "./components/Student/StudentForm";
import StudentList from "./components/Student/StudentList";
import styles from "./App.module.css";

const App: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | undefined>(undefined);

  const fetchStudents = async () => {
    const data = await getStudents();
    setStudents(data);
  };

  const handleSaveStudent = async (student: Student) => {
    if (student.id) {
      await updateStudent(student.id, student);
    } else {
      await createStudent(student);
    }
    setEditingStudent(undefined);
    fetchStudents();
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
  };

  const handleDeleteStudent = async (id: number) => {
    await deleteStudent(id);
    fetchStudents();
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className={styles.appContainer}>
      <h1 className={styles.title}>CRUD de Estudiantes</h1>
      <StudentForm onSubmit={handleSaveStudent} studentToEdit={editingStudent} />
      <StudentList students={students} onEdit={handleEditStudent} onDelete={handleDeleteStudent} />
    </div>
  );
};

export default App;
