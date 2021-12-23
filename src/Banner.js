import './Banner.css';
import Car from './images/sports-car.png';

function Banner() {
  return (
    <div className="banner">
      <h1>TypeRacer</h1>
      <img class="something" src={Car} alt="Logo" />
    </div >
  )
}

export default Banner;
