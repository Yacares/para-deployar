import React from 'react';
import { useLocation } from 'react-router-dom';
import './detail.css';
import { Link } from 'react-router-dom';

function Detail() {
    const location = useLocation();
    console.log('location:', location);

    const country = location.state && location.state.country;
    console.log('country:', country);

    if (!country) {
        return <p>No country data found</p>;
    }

    return (
        <div className='detail-container'>
            <Link to="/home"> <button className='form-buttons'>Home</button></Link>
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <div className='title-container'>
                            <h1 className='detail-title'>{country.name}</h1>
                            <h2>ID: {country.id}</h2>
                        </div>
                        <div className='img-container-detail'><img className='img-details' src={country.flags} alt={`Flag of ${country.name}`} /></div>
                        <div className='text-container'>
                            <h2>Continent: {country.continents}</h2>
                            <h2>Capital: {country.capital}</h2>
                            <h2>Subregion: {country.subregion}</h2>
                            <h2>Area: {country.area}</h2>
                            <h2>Population: {country.population}</h2>
                        </div>
                    </div>
                    <div className="flip-card-back">

                        <img className='img-coat' src={country.coat} alt={`Coat of Arms of ${country.name}`} />
                        <button className='nav-buttons'><a href={country.maps} target="_blank" rel="noopener noreferrer"> Google Maps</a> </button>

                        
                        <ul className='activity-list'>
                        <h2>Activities:</h2>
                            {country.activities.map((activity) => (
                                <li key={activity.id}>
                                    <h2>{activity.name}</h2> Difficulty: {activity.difficulty} // Duration: {activity.duration} // Season: {activity.season}
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>



            </div>

        </div>
    );
}

export default Detail;