import React from 'react';

const Ordenamiento = ({ orderByAlphabet, orderByPopulation }) => {
  return (
    <div>
      <button onClick={orderByAlphabet}>Ordenar Alfabéticamente</button>
      <button onClick={orderByPopulation}>Ordenar por Población</button>
    </div>
  );
};

export default Ordenamiento;