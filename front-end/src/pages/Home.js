import React from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './Home.css';
import useWindowDimensions from '../dimensions.js';
import background from "../images/background.png";

const Home = () =>  {
    const { height, width } = useWindowDimensions();

    console.log("home")
    console.log("height ", height)
    console.log("width ", width)

    return (
        <div>
            
        </div>
    );
}

export default Home;
