import { useEffect } from "react";
import { loadCountries } from "../../redux/action/action";
import Cards from "../../components/cards/cards"

useEffect(()=>{
    dispatch(loadCountries());
},[dispatch]);




function Home(){
    return(
    <div>
     <Cards countries={countries}/>
    </div>
    )
    }
    
    export default Home;
