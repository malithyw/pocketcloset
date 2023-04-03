import React from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './Home.css';
import useWindowDimensions from '../dimensions.js';
import background from "../images/background.png";

const Home = () =>  {
    const { height, width } = useWindowDimensions();
    // document.body.style.backgroundImage = homePIC;

    console.log("home")
    return (
    //     <div style={{ backgroundImage: `url(${background})`}}>
    //     Hello World
    //   </div>
        <div>
            <img
      src={require('../images/background.png')}
      className='img-fluid shadow-4' width='auto'
      alt='not working'/> 

        </div>
    );
}

export default Home;
