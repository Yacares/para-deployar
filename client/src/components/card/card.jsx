import { Link } from 'react-router-dom';
import './card.css'


const Card = ({ country }) => {

  if (!country) {
    return null;
  }

  const { flags, name, continents, id, population } = country;

  return (

    <div>

      <div className="card">
        <div className='img-container'> <img className='country-img' src={flags} alt={`Flag of ${name}`} />  </div>
        <p className="heading">{name} <p className="subtitle">  Continent: {continents}</p>  </p>
        <p > Population: {population} </p>
        <div className='button-container-card'>
          <Link className="link-home"to={`/home/${id}`} state={{ country }}>
            <button className='detail-button'>Details</button>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Card;