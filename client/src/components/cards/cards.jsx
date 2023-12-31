import React, { useState, useEffect } from 'react';
import Card from '../card/card';
import Paginacion from '../paginacion/paginacion';
import { Link } from 'react-router-dom';
import './cards.css'

const Cards = ({ countries, pagination, activities, changePage }) => {
  const [continentFilter, setContinentFilter] = useState(null);
  const [activityFilter, setActivityFilter] = useState(null);
  const [sortOrderName, setSortOrderName] = useState(null);
  const [sortOrderPopulation, setSortOrderPopulation] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [showNoResults, setShowNoResults] = useState(false);

  useEffect(() => {
    setFilteredCountries(countries);
  }, [countries]);

  const sortCountries = (countries, order) => {
    if (order === 'name-asc') {
      return [...countries].sort((a, b) => a.name.localeCompare(b.name));
    } else if (order === 'name-desc') {
      return [...countries].sort((a, b) => b.name.localeCompare(a.name));
    } else if (order === 'population-asc') {
      return [...countries].sort((a, b) => a.population - b.population);
    } else if (order === 'population-desc') {
      return [...countries].sort((a, b) => b.population - a.population);
    } else {
      return countries;
    }
  };

  const handleContinentFilterChange = (continent, newPage) => {
    setContinentFilter(continent);
    changePage(newPage);
  };

  const handleActivityFilterChange = (activity, newPage) => {
    setActivityFilter(activity === 'Todas' ? null : activity);
    changePage(newPage);
  };

  const handleSearch = (searchTerm) => {
    setSearchFilter(searchTerm);
    const filteredCountries = countries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredCountries(filteredCountries);
    setContinentFilter(null);
    setActivityFilter(null);
    setSortOrderName(null);
    setSortOrderPopulation(null);
    setShowNoResults(filteredCountries.length === 0);
    changePage(1);
  };

  const handleClearSearch = () => {
    setSearchFilter('');
    setFilteredCountries(countries);
    setContinentFilter(null);
    setActivityFilter(null);
    setSortOrderName(null);
    setSortOrderPopulation(null);
    setShowNoResults(false);
    changePage(1);
  };

  const handleSortChangeName = (order) => {
    setSortOrderName(order);
    setSortOrderPopulation(null);
    setShowNoResults(false);
    changePage(1);
  };

  const handleSortChangePopulation = (order) => {
    setSortOrderPopulation(order);
    setSortOrderName(null);
    setShowNoResults(false);
    changePage(1);
  };

  const handleClearFilters = () => {
    setSearchFilter('');
    setFilteredCountries(countries);
    setContinentFilter(null);
    setActivityFilter(null);
    setSortOrderName(null);
    setSortOrderPopulation(null);
    setShowNoResults(false);
    changePage(1);
  };

  const filterCountriesByActivity = (countries, activityFilter) => {
    if (!activityFilter || activityFilter === 'Todas') {
      return countries.filter((country) => country.activities.length > 0);
    }

    return countries.filter((country) =>
      country.activities.some((activity) =>
        activity.name.includes(activityFilter)
      )
    );
  };

  const filteredCountriesWithSearch =
    searchFilter !== ''
      ? countries.filter((country) =>
        country.name.toLowerCase().includes(searchFilter.toLowerCase())
      )
      : countries;

  const filteredCountriesWithFilter =
    continentFilter !== null
      ? filteredCountriesWithSearch.filter(
        (country) => country.continents === continentFilter
      )
      : filteredCountriesWithSearch;

  const filteredActivities =
    activityFilter !== null
      ? filterCountriesByActivity(
        filteredCountriesWithFilter,
        activityFilter
      )
      : filteredCountriesWithFilter;

  const sortedCountries = sortOrderName
    ? sortCountries(filteredActivities, sortOrderName)
    : sortOrderPopulation
      ? sortCountries(filteredActivities, sortOrderPopulation)
      : filteredActivities;

  const totalCountries = sortedCountries.length;
  const currentPage = pagination?.currentPage || 1;
  const pageSize = pagination?.pageSize || 10;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalCountries);
  const visibleCountries = sortedCountries.slice(startIndex, endIndex);

  return (
    <div className='whole-container'>
      <div className='img-hero'>
        <div className='navbar-container'>
          <ul className='navbar-cards'>
            <div className="searchbar-container">
              <input
                className='searchbar'
                placeholder="Search..."
                name="text"
                type="text"
                value={searchFilter}
                onChange={(e) => handleSearch(e.target.value)}
              />
              {searchFilter && (
                <button className='searchbar-button' onClick={handleClearSearch}>
                  X
                </button>
              )}
            </div>
            <li className='list-navbar'>
              <button className='nav-buttons' onClick={handleClearFilters}>Reset</button>
            </li>
            <select className='dropdown-menu'
              id="continentDropdown"
              onChange={(e) => handleContinentFilterChange(e.target.value === 'Todos' ? null : e.target.value, 1)}
            >
              <option value="Todos">Todos</option>
              {getUniqueContinents(countries).map((continent) => (
                <option key={continent} value={continent}>
                  {continent}
                </option>
              ))}
            </select>
            <li className='list-navbar'>
              <select className='dropdown-menu'
                onChange={(e) => handleSortChangeName(e.target.value)}
                value={sortOrderName || ''}
              >
                <option value='' disabled hidden>
                  Sort Alphabetically
                </option>
                <option value='name-asc'>Name (A-Z)</option>
                <option value='name-desc'>Name (Z-A)</option>
              </select>
            </li>
            <li className='list-navbar' >
              <select className='dropdown-menu'
                onChange={(e) => handleSortChangePopulation(e.target.value)}
                value={sortOrderPopulation || ''}
              >
                <option value='' disabled hidden>
                  Sort by Population
                </option>
                <option value='population-asc'>Min. to Max.</option>
                <option value='population-desc'>Max. to Min.</option>
              </select>
            </li>
            <li className='list-navbar'>
              <select className='dropdown-menu'
                onChange={(e) => handleActivityFilterChange(e.target.value)}
                value={activityFilter || ''}
              >
                <option value='' disabled hidden>
                  {activityFilter === null ? 'Select Activity' : 'Todas'}
                </option>
                {activities.map((activity, index) => (
                  <option key={activity.id || index} value={activity.name}>
                    {activity.name}
                  </option>
                ))}
              </select>
            </li>
            <li className='list-navbar'>
              <Link to="/form" state={{ countries }}><button className='nav-buttons'>Create Activity  </button></Link>
            </li>
          </ul>
        </div>
      </div>
      <div className='cards-container'>
        {showNoResults ? (
          <div className='no-results-message'>
            No results found. Please try again.
          </div>
        ) : (
          visibleCountries.map((country, index) => (
            <Card key={country.id || index} country={country} />
          ))
        )}
      </div>
      <footer className='footer-cards'>
        <Paginacion
          totalItems={totalCountries}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={(newPage) =>
            continentFilter !== null
              ? handleContinentFilterChange(continentFilter, newPage)
              : changePage(newPage)
          }
          onActivityFilterChange={handleActivityFilterChange}
        />
      </footer>
    </div>
  );
};

const getUniqueContinents = (countries) => [
  ...new Set(countries.map((country) => country.continents)),
];

export default Cards;
