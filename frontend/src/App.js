import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import AddHall from "./AddHall";
import Registration from "./Registration";
import GetExhibitions from "./GetExhibitions";
import GetHalls from "./GetHalls";
import AddExhibition from "./AddExhibition";
import GetStats from "./GetStats";
import DetailedStats from "./DetailedStats";
import Login from "./Login";


const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/home" element={<Home/>}/>
                <Route exact path="/addHall" element={<AddHall/>}/>
                <Route exact path="/registration" element={<Registration/>}/>
                <Route exact path="/getExhibitions" element={<GetExhibitions/>}/>
                <Route exact path="/getHalls" element={<GetHalls/>}/>
                <Route exact path="/addExhibition" element={<AddExhibition/>}/>
                <Route exact path="/getStats" element={<GetStats/>}/>
                <Route exact path="/getStats/:theme" element={<DetailedStats/>}/>
                <Route exact path="/login" element={<Login/>}/>
            </Routes>
        </Router>
    )
}

export default App;