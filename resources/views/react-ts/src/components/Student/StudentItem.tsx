import React from "react";
import { Student } from "../../types/Student";
import styles from "./StudentItem.module.css";

interface Props {
  student: Student;
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
}

const StudentItem: React.FC<Props> = ({ student, onEdit, onDelete }) => {
  return (
    <li className={styles.studentItem}>
      <div>
        {student.name} - {student.email} - {student.phone} - {student.career}
      </div>
      <div className={styles.actions}>
        <button onClick={() => onEdit(student)} className={styles.editButton}>Editar</button>
        <button onClick={() => onDelete(student.id!)} className={styles.deleteButton}>Eliminar</button>
      </div>
    </li>
  );
};

export default StudentItem;
