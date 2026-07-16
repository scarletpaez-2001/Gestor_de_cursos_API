import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

// Versión estándar usando Axios (Requisito base)
export const getCourses = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.body,
      teacherId: item.userId, // El userId de la API simula nuestro docente
    }));
  } catch (error) {
    console.error("Error al obtener los cursos con Axios:", error);
    throw new Error("No fue posible cargar los cursos.");
  }
};

// --- DESAFÍO 4: Versión alternativa usando Fetch API ---
export const getCoursesWithFetch = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Error al consumir la API con Fetch.");
    }
    const data = await response.json();
    return data.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.body,
      teacherId: item.userId,
    }));
  } catch (error) {
    console.error("Error al obtener los cursos con Fetch:", error);
    throw new Error("No fue posible cargar los cursos.");
  }
};