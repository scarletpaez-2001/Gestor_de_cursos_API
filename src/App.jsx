import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CourseList from "./components/CourseList";
import { getCourses } from "./services/courseService"; // Puedes usar getCoursesWithFetch para probar el Desafío 4
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [favorites, setFavorites] = useLocalStorage("favoriteCourses", []);
  const [darkMode, setDarkMode] = useLocalStorage("darkModeEnabled", false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCourses = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getCourses();
      setCourses(data);
    } catch (error) {
      setError(error.message || "Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  // Extraer lista de docentes únicos para el select (Desafío 1)
  const availableTeachers = useMemo(() => {
    const ids = courses.map((course) => course.teacherId);
    return [...new Set(ids)].sort((a, b) => a - b);
  }, [courses]);

  // Filtrar cursos por texto y por ID de docente
  const filteredCourses = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase().trim();
    return courses.filter((course) => {
      const matchesSearch = course.title.toLowerCase().includes(normalizedSearch);
      const matchesTeacher = selectedTeacher === "" || String(course.teacherId) === String(selectedTeacher);
      return matchesSearch && matchesTeacher;
    });
  }, [courses, searchTerm, selectedTeacher]);

  // Manejar favoritos
  const handleToggleFavorite = (course) => {
    const exists = favorites.some((fav) => fav.id === course.id);
    if (exists) {
      const updatedFavorites = favorites.filter((fav) => fav.id !== course.id);
      setFavorites(updatedFavorites);
      return;
    }
    setFavorites([...favorites, course]);
  };

  // DESAFÍO 2: Contador de favoritos por Docente
  const favoritesCountByTeacher = useMemo(() => {
    const counts = {};
    favorites.forEach((fav) => {
      counts[fav.teacherId] = (counts[fav.teacherId] || 0) + 1;
    });
    return counts;
  }, [favorites]);

  return (
    <div className={darkMode ? "dark-theme" : "light-theme"}>
      <main className="app">
        <Header darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} />

        <section className="summary">
          <p>Total de cursos cargados: {courses.length}</p>
          <p>Tus favoritos: {favorites.length}</p>
        </section>

        {/* Panel informativo del Desafío 2 */}
        {favorites.length > 0 && (
          <section className="summary favorite-stats">
            <h4>Favoritos por Docente:</h4>
            <div className="stats-grid">
              {Object.entries(favoritesCountByTeacher).map(([teacherId, count]) => (
                <span key={teacherId} className="stat-tag">
                  Docente {teacherId}: {count} ★
                </span>
              ))}
            </div>
          </section>
        )}

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          teacherId={selectedTeacher}
          onTeacherChange={setSelectedTeacher}
          availableTeachers={availableTeachers}
        />

        {loading && <p className="message">Cargando cursos desde la API...</p>}
        
        {error && (
          <div className="error">
            <p>{error}</p>
            <button type="button" onClick={loadCourses}>
              Reintentar
            </button>
          </div>
        )}

        {!loading && !error && (
          <CourseList
            courses={filteredCourses}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </main>
    </div>
  );
}

export default App;