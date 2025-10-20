import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./nav-bar.css";
// import "./veterinary-logo.css";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="nav-bar">
      <img
        className="veterinary-logo"
        onClick={() => navigate(`/`)}
        src={logo}
      />
      <button className="back-button" onClick={() => navigate(`/`)}>
        Back →
      </button>
    </div>
  );
};

export default NavBar;
