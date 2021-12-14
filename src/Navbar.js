
import './Navbar.css';
import car from './images/sports-car.png';
const Navbar = () => {
  return (
    <header>
      <nav className="nav">
        <ul className="nav-ul">
          <li className="nav-item"><img className="logo" src={car} alt="logo" /></li>
          <li className="nav-item">TypeRacer</li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
