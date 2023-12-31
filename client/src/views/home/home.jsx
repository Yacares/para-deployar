import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCountries, changePage, loadActivities } from "../../redux/action/action";
import Cards from "../../components/cards/cards";
import './home.css'

function Home() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries.countries);
  const pagination = useSelector((state) => state.countries.pagination);
  const activities = useSelector((state) => state.activities.activities);

  console.log('Activities:', activities);

  useEffect(() => {
    dispatch(loadCountries());
    dispatch(loadActivities());
  }, [dispatch]);



  return (


    <div className="contenedor-home">
     
      <Cards
        countries={countries}
        pagination={pagination}
        activities={activities}
        changePage={(page) => dispatch(changePage(page))}
      />
    </div >
  );
}

export default Home;