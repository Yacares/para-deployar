const { Router } = require("express");
const { Country, Activity } = require("../db")
const axios = require('axios');



const router = Router();



router.get('/countries', async (req, res) => {
  const { name } = req.query;
  try {
    const response = await axios.get('http://localhost:5000/countries');
    const countriesData = response.data;

    // Flatten and map the data structure before saving to the database
    const flattenedData = countriesData.map(country => {
      // Check if country is defined before processing
      if (!country) {
        console.error('Error: country is not defined');
        return null;
      }

      // Check if capital is an array, and if yes, join the elements
      const capital = Array.isArray(country.capital) ? country.capital.join(', ') : country.capital;

      // Check if continents is an array, and if yes, join the elements
      const continents = Array.isArray(country.continents) ? country.continents.join(', ') : country.continents;

      return {
        id: country.cca3,
        name: country.name.common,
        flags: country.flags.png,
        continents: continents,
        capital: capital,
        subregion: country.subregion,
        area: country.area,
        population: country.population,
        coat: country.coatOfArms.png,
        maps: country.maps.openStreetMaps,
      };
    });

    // Filter out null values (countries with undefined structure)
    const validData = flattenedData.filter(data => data !== null);

    const createdCountries = [];
    for (const countryData of validData) {
      const [createdCountry] = await Country.findOrCreate({
        where: { id: countryData.id },
        defaults: countryData,
      });
      createdCountries.push(createdCountry.toJSON());
    }

    // Map activities for each country
    for (const createdCountry of createdCountries) {
      const activities = await Activity.findAll({
        include: [Country],
        where: { '$Countries.id$': createdCountry.id },
      });

      createdCountry.activities = activities.map(activity => ({
        id: activity.id,
        name: activity.name,
        difficulty: activity.difficulty,
        duration: activity.duration,
        season: activity.season,
      }));
    }

    if (name) {
      const nameLowerCase = name.toLowerCase();
      const matchingCountries = createdCountries.filter((country) => {
        const countryName = country.name.toLowerCase();
        return countryName.includes(nameLowerCase);
      });

      if (matchingCountries.length === 0) {
        // If no matches were found, return an appropriate message.
        return res.status(404).json({ message: 'No se encontró el pais con el nombre especificado.' });
      }

      return res.status(200).json(matchingCountries);
    }

    // If no query parameter is provided, return all created countries
    res.status(200).json({ message: 'Data fetched and saved successfully!', createdCountries });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/activities', async (req, res) => {
  try {
    const { name, difficulty, duration, season, countries } = req.body; // Corrected variable name

    // Validate that required fields are present in the request body
    if (!name || !difficulty || !season || !countries) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    // Verificar si ya existe una actividad con el mismo nombre
    const existingActivity = await Activity.findOne({ where: { name } });

    if (existingActivity) {
      return res.status(400).json({ error: 'Ya existe una actividad con este nombre.' });
    }


   
    const arrayCountry = [];

    for (const countryId of countries) {
      // Check if the country exists
      const country = await Country.findByPk(countryId);
      if (!country) {
        return res.status(404).json({ message: `Country with ID ${countryId} not found.` });
      }else{
        arrayCountry.push(country);
      }
    }
    const createdActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });
    

        await createdActivity.addCountry(arrayCountry);
        res.status(201).json({ message: 'Activity created successfully.', Activity: createdActivity.toJSON() });

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }

});

router.get('/activities', async (req, res) => {
  try {

    const activities = await Activity.findAll({
      include: [Country], 
    });

   
    if (!activities || activities.length === 0) {
      return res.status(404).json({ message: 'No activities found.' });
    }

    const activitiesWithCountryIds = activities.map(activity => ({
      id: activity.id,
      name: activity.name,
      difficulty: activity.difficulty,
      duration: activity.duration,
      season: activity.season,
      countries: activity.Countries.map(country => ({
        id: country.id,
        name: country.name,
      })),
    }));

    res.status(200).json({ message: 'Data fetched and saved successfully!', creactedActivities: activitiesWithCountryIds  });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/countries/:idPais', async (req, res) => {
  const { idPais } = req.params;

  try {
    // Obtener el país por su ID (idPais)
    const country = await Country.findByPk(idPais);

    if (!country) {
      return res.status(404).json({ message: `Country with ID ${idPais} not found.` });
    }

    // Obtener las actividades turísticas asociadas a este país
    const activities = await Activity.findAll({
      include: [Country],
      where: { '$Countries.id$': idPais }, // Filtrar por el país específico
    });

    // Formatear los datos para la respuesta
    const countryDetails = {
      id: country.id,
      name: country.name,
      flags: country.flags,
      continents: country.continents,
      capital: country.capital,
      subregion: country.subregion,
      area: country.area,
      population: country.population,
      coat: country.coat,
      maps: country.maps,
      activities: activities.map(activity => ({
        id: activity.id,
        name: activity.name,
        difficulty: activity.difficulty,
        duration: activity.duration,
        season: activity.season,
      })),
    };

    // Enviar la respuesta con los detalles del país y sus actividades asociadas
    res.status(200).json(countryDetails);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;