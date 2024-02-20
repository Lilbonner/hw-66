import './App.css'
import Navbar from "./components/Navbar.tsx";
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home.tsx";
import MealForm from "./components/mealForm.tsx";

function App() {

  return (
    <div>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/editMeal/:id" element={<MealForm />} />
            <Route path="/addMeal" element={<MealForm />} />
        </Routes>
     </div>
  )
}

export default App
