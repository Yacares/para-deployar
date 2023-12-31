import React, { useState } from 'react';
import { createActivity } from '../../redux/action/action';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './form.css';

function FormPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const country = location.state && location.state.countries;

  const [activityData, setActivityData] = useState({
    name: '',
    difficulty: '',
    duration: '',
    season: '',
    countries: [],
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    name: '',
    difficulty: '',
    duration: '',
    season: '',
    countries: '',
  });

  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    let errorMessage = '';

    if (e.target.name === 'name' && /[^a-zA-Z\s]/.test(e.target.value)) {
      errorMessage = 'Can only contain letters and spaces.';
    }

    if ((e.target.name === 'duration' || e.target.name === 'difficulty') && !/^\d+$/.test(e.target.value)) {
      errorMessage = 'Can only contain integers.';
    }

    setErrorMessages({
      ...errorMessages,
      [e.target.name]: errorMessage,
    });

    setActivityData({
      ...activityData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCountrySelect = (countryId) => {
    const isSelected = activityData.countries.includes(countryId);
    let updatedCountries;

    if (isSelected) {
      updatedCountries = activityData.countries.filter((id) => id !== countryId);
    } else {
      updatedCountries = [...activityData.countries, countryId];
    }

    setActivityData((prevData) => ({
      ...prevData,
      countries: updatedCountries,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!activityData.name || !activityData.difficulty || !activityData.season || activityData.countries.length === 0) {
      setErrorMessages({
        ...errorMessages,
        countries: 'Please select at least one.',
      });
      return;
    }

    const difficulty = parseInt(activityData.difficulty, 10);
    if (isNaN(difficulty) || difficulty < 1 || difficulty > 5) {
      setErrorMessages({
        ...errorMessages,
        difficulty: 'Difficulty must be a number between 1 and 5.',
      });
      return;
    }

    const duration = parseInt(activityData.duration, 10);
    if (!isNaN(duration) && duration > 72) {
      setErrorMessages({
        ...errorMessages,
        duration: 'Duration cannot be more than 72 hs',
      });
      return;
    }

    // Check if the activity name already exists
    const isNameExists = country.some((c) =>
      c.activities.some((a) => a.name.toLowerCase() === activityData.name.toLowerCase())
    );

    if (isNameExists) {
      setErrorMessages({
        ...errorMessages,
        name: <span style={{ color: 'red' }}>Activity name already exists.</span>,
      });
      return;
    }

    try {
      console.log('Enviando datos de actividad:', activityData);
      await dispatch(createActivity(activityData));
      setIsSuccess(true);
    } catch (error) {
      console.error('Error al crear la actividad:', error);
    }
  };

  const handleCreateAnother = () => {
    setActivityData({
      name: '',
      difficulty: '',
      duration: '',
      season: '',
      countries: [],
    });
    setIsSuccess(false);
    setErrorMessages({
      name: '',
      difficulty: '',
      duration: '',
      season: '',
      countries: '',
    });
  };

  const filteredCountries = country
    ? country
        .slice()
        .filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name))
    : [];

  return (
    <div className='form-container'>
      {isSuccess ? (
        <div className='success-container'>
          <h1 className='main-title'>Upload has been successful</h1>
          <button className='form-buttons' onClick={handleCreateAnother}>
            Create another
          </button>
          <Link to="/home"> <button className='form-buttons'>Home</button>  </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
           <div className='input-container'><Link to="/home"> <button className='form-buttons'>Home</button></Link></div>
          <h1 className='main-title'>Create New Activity</h1>
          <div className='input-container'>
            <label className="label-form" htmlFor="name">
              Name:
              <input
                className='searchbar'
                type="text"
                id="name"
                name="name"
                value={activityData.name}
                onChange={handleInputChange}
                required
              />
               <span className="error-message">{errorMessages.name}</span>
            </label>
           

            <label className="label-form" htmlFor="difficulty">
              Difficulty:
              <input
                className='searchbar'
                type="number"
                id="difficulty"
                name="difficulty"
                value={activityData.difficulty}
                onChange={handleInputChange}
                min="1"
                max="5"
                required
              />
            </label>

            <label className="label-form" htmlFor="duration">
              Duration:
              <input
                className='searchbar'
                type="number"
                id="duration"
                name="duration"
                value={activityData.duration}
                onChange={handleInputChange}
                min="0"
                max="72"
              />
              hs
            </label>

            <label className="label-form" htmlFor="season">
              Season:
              <select
                className='dropdown-menu'
                id="season"
                name="season"
                value={activityData.season}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled hidden>
                  Select Season
                </option>
                <option value="Summer">Summer</option>
                <option value="Fall">Fall</option>
                <option value="Winter">Winter</option>
                <option value="Spring">Spring</option>
              </select>
            </label>
          </div>



          <div className="form-question">
            <h2 className="form-question" htmlFor="countries">
              Which Countries does it belong to?
              <p className="form-question-subtitle">(please choose atleast 1)</p>
            </h2>
            
          <div className='search-container'>
            <input
              placeholder="Search..."
              className='searchbar'
              type='text'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          </div>
          <div className="country-grid">
            {filteredCountries &&
              filteredCountries.map((country) => (
                <div key={country.id} className="country-item">
                  <h2 className='country-title'>{country.id}</h2>
                  <label className="container">
                    <input
                      className="country-checkbox"
                      type="checkbox"
                      value={country.id}
                      checked={activityData.countries.includes(country.id)}
                      onChange={() => handleCountrySelect(country.id)}
                    />
                    <svg viewBox="0 0 64 64" height="2em" width="2em">
                      <path
                        d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                        pathLength="575.0541381835938"
                        className="path"
                      ></path>
                    </svg>
                  </label>
                  <div className='img-form-container'>
                    {' '}
                    <img className='img-form' src={country.flags} alt="" />{' '}
                  </div>
                </div>
              ))}
          </div>

          <div className='button-container'>
            <button className='nav-buttons' type="submit">
              Create Activity
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default FormPage;
