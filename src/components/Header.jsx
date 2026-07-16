const Header = ({ darkMode, onToggleDarkMode }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div>
          <h1>Gestor de Cursos React</h1>
          <p>SPA con API, LocalStorage, componentes y buenas prácticas de seguridad.</p>
        </div>
        <button type="button" onClick={onToggleDarkMode} className="btn-toggle">
          {darkMode ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
        </button>
      </div>
    </header>
  );
};

export default Header;