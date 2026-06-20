import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Home as HomeIcon } from "lucide-react";

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [conScroll, setConScroll] = useState(false);
  const location = useLocation();
  const navegar = useNavigate();

  useEffect(() => {
    const manejarScroll = () => setConScroll(window.scrollY > 20);
    window.addEventListener("scroll", manejarScroll);
    return () => window.removeEventListener("scroll", manejarScroll);
  }, []);

  useEffect(() => {
    setMenuAbierto(false);
  }, [location]);

  const irADepartamentos = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      document.getElementById("departamentos")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navegar("/");
      setTimeout(() => {
        document.getElementById("departamentos")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  const enlaces = [
    { texto: "Inicio", ruta: "/" },
    { texto: "Departamentos", accion: irADepartamentos },
    { texto: "Nosotros", ruta: "/nosotros" },
    { texto: "Preguntas frecuentes", ruta: "/preguntas-frecuentes" },
  ];

  return (
    <nav className={`navbar ${conScroll || location.pathname !== "/" ? "navbar-scroll" : ""}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <HomeIcon size={22} strokeWidth={2.2} />
          <span>HomeIQ</span>
        </Link>

        <div className="navbar-links-desktop">
          {enlaces.map((enlace) =>
            enlace.accion ? (
              <a key={enlace.texto} href="#departamentos" className="navbar-link" onClick={enlace.accion}>
                {enlace.texto}
              </a>
            ) : (
              <Link key={enlace.texto} to={enlace.ruta} className="navbar-link">
                {enlace.texto}
              </Link>
            )
          )}
          <Link to="/contacto" className="btn-nav-cta">Cotizar</Link>
        </div>

        <button
          className="navbar-toggle"
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label="Abrir menú"
        >
          {menuAbierto ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <div className={`navbar-mobile ${menuAbierto ? "navbar-mobile-abierto" : ""}`}>
        {enlaces.map((enlace) =>
          enlace.accion ? (
            <a key={enlace.texto} href="#departamentos" className="navbar-mobile-link" onClick={enlace.accion}>
              {enlace.texto}
            </a>
          ) : (
            <Link key={enlace.texto} to={enlace.ruta} className="navbar-mobile-link">
              {enlace.texto}
            </Link>
          )
        )}
        <Link to="/contacto" className="btn-nav-cta btn-nav-cta-mobile">
          Cotizar
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;