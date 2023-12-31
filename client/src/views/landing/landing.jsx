
import { Link } from 'react-router-dom';
import './landing.css';  

function Landing() {
  return (
    <div className='landing-background'> 
    <div className='Earth'></div>
    <Link to="/home"> <button className='boton-ingreso'>Home</button></Link>
    </div>
  );
}

export default Landing;
