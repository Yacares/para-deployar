import { Route, Routes } from "react-router-dom";
import Detail from "./views/detail/detail";
import FormPage from "./views/form/formPage";
import Home from "./views/home/home"
import Landing from "./views/landing/landing"
import './App.css'

function App(){
  return(
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/:id" element={<Detail />} />
        <Route path="/form" element={<FormPage />} />
      </Routes>
    </div>
  );
}

export default App;