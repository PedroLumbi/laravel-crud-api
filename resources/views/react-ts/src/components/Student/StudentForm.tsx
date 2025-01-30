import React, { useState, useEffect } from "react";
import { Student } from "../../types/Student";
import styles from "./StudentForm.module.css"; // Importa los estilos como un módulo

interface Props {
  onSubmit: (student: Student) => void;
  studentToEdit?: Student;
}

const StudentForm: React.FC<Props> = ({ onSubmit, studentToEdit }) => {
  const [form, setForm] = useState<Student>({ name: "", email: "", phone: "", career: "" });

  useEffect(() => {
    if (studentToEdit) {
      setForm(studentToEdit);
    }
  }, [studentToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: "", email: "", phone: "", career: "" });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <input type="text" name="name" placeholder="Nombre" value={form.name} onChange={handleChange} className={styles.inputField} />
      <input type="email" name="email" placeholder="Correo" value={form.email} onChange={handleChange} className={styles.inputField} />
      <input type="text" name="phone" placeholder="Teléfono" value={form.phone} onChange={handleChange} className={styles.inputField} />
      <input type="text" name="career" placeholder="Carrera" value={form.career} onChange={handleChange} className={styles.inputField} />
      <button type="submit" className={styles.submitButton}>
        {studentToEdit ? "Actualizar" : "Crear"}
      </button>
    </form>
  );
};

export default StudentForm;
