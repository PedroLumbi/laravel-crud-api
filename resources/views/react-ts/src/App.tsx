import React, { useEffect, useState } from "react";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "./api/studentService";
import { Student } from "./types/Student";

const App: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [form, setForm] = useState<Student>({
    name: "",
    email: "",
    phone: "",
    career: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchStudents = async () => {
    const data = await getStudents();
    setStudents(data);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateStudent(editingId, form);
      setEditingId(null);
    } else {
      await createStudent(form);
    }
    setForm({ name: "", email: "", phone: "", career: "" });
    fetchStudents();
  };

  const handleEdit = (student: Student) => {
    setForm(student);
    setEditingId(student.id || null);
  };

  const handleDelete = async (id: number) => {
    await deleteStudent(id);
    fetchStudents();
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">CRUD de Estudiantes</h1>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleInputChange}
          className="border p-2 m-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Correo"
          value={form.email}
          onChange={handleInputChange}
          className="border p-2 m-2"
        />
        <input
          type="text"
          name="phone"
          placeholder="Teléfono"
          value={form.phone}
          onChange={handleInputChange}
          className="border p-2 m-2"
        />
        <input
          type="text"
          name="career"
          placeholder="Carrera"
          value={form.career}
          onChange={handleInputChange}
          className="border p-2 m-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2"
        >
          {editingId ? "Actualizar" : "Crear"}
        </button>
      </form>

      {/* Lista de estudiantes */}
      <ul>
        {students.map((student) => (
          <li
            key={student.id}
            className="flex justify-between items-center border p-2"
          >
            <div>
              {student.name} - {student.email} - {student.phone} -{" "}
              {student.career}
            </div>
            <div>
              <button
                onClick={() => handleEdit(student)}
                className="bg-yellow-500 text-white px-2 py-1 mr-2"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(student.id!)}
                className="bg-red-500 text-white px-2 py-1"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
