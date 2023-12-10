
const Card = ({ country }) => {
  const { flagImage, name, continent } = country;

  return (
    <div>
      <img src={flagImage} alt={`Flag of ${name}`} />
      <h2>{name}</h2>
      <p>{continent}</p>
    </div>
  );
};

export default Card;