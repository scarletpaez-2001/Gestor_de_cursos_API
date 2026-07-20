const SearchBar = ({ searchTerm, onSearchChange, teacherId, onTeacherChange, availableTeachers }) => {
  return (
    <div className="search-container">
      <div className="search-field">
        <label htmlFor="search">Buscar curso:</label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Ejemplo: qui, temporibus, magnam..."
          maxLength={50}
        />
      </div>

      {/* DESAFÍO 1: Filtro por Docente */}
      <div className="search-field">
        <label htmlFor="teacher-filter">Filtrar por Docente (ID):</label>
        <select
          id="teacher-filter"
          value={teacherId}
          onChange={(event) => onTeacherChange(event.target.value)}
        >
          <option value="">Todos los docentes</option>
          {availableTeachers.map((id) => (
            <option key={id} value={id}>
              Docente {id}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchBar;