const mapCountryModel = (country) => ({
    id: country.cca3,
    name: country.name.official,
    flags: country.flags.png,
    continents: Array.isArray(country.continents) ? country.continents.join(', ') : country.continents,
    capital: Array.isArray(country.capital) ? country.capital.join(', ') : country.capital,
    subregion: country.subregion,
    area: country.area,
    population: country.population,
  });

module.exports = {
    mapCountryModel,
};