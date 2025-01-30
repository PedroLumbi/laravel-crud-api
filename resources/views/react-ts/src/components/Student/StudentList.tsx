import React from "react";
import { Student } from "../../types/Student";
import StudentItem from "./StudentItem";
import styles from "./StudentList.module.css";

interface Props {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
}

const StudentList: React.FC<Props> = ({ students, onEdit, onDelete }) => {
  return (
    <ul className={styles.studentList}>
      {students.length > 0 ? (
        students.map((student) => <StudentItem key={student.id} student={student} onEdit={onEdit} onDelete={onDelete} />)
      ) : (
        <p>No hay estudiantes registrados.</p>
      )}
    </ul>
  );
};

export default StudentList;
