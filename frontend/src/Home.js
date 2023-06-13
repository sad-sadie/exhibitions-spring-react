import React from 'react';
import './Home.css';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';
import Navbar from "./NavBar";


const Home = () => {


    return (
        <div>

            <Navbar/>
            <div className="exhibitions_container">

                <h1>Observe exhibitions</h1>

                <Button className={"good_class"} color="primary" tag={Link} to={"/getExhibitions"}>By default</Button>

                <Button className={"good_class"} color="primary" tag={Link} to={"/getExhibitions?sortType=theme"}>By theme</Button>

                <Button className={"good_class"} color="primary" tag={Link} to={"/getExhibitions?sortType=price"}>By price</Button>

                <Button className={"good_class"} color="primary" tag={Link} to={"/getHalls"}>Observe hall</Button>

            </div>
        </div>
    );
}

export default Home;