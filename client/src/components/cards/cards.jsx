import Card from '../card/card';

const Cards = ({ countries }) => {
  return (
    <div>
      {countries.map((country) => (
        <Card key={country.id} country={country} />
      ))}
    </div>
  );
};

export default Cards;
