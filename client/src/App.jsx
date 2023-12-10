import {Route,Routes} from "react-router-dom";
import Detail from "./views/detail/detail";
import Form from "./views/form/form";
import Home from "./views/home/home"
import Landing from "./views/landing/landing"

function App(){
  return(
  <div>
    <Routes>
  <Route path= "/" Component={Landing}/>
  <Route path= "/home" Component={Home}/>
  <Route path= "/home/:id" component={Detail}/>
  <Route path= "/form" component={Form}/>
    </Routes>
  </div>

  );
}

export default App;