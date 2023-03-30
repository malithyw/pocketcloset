import React from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './Home.css';
import useWindowDimensions from '../dimensions';'../dimensions'

const Home = () =>  {
    const { height, width } = useWindowDimensions();

    console.log("home")
    return (
        <div>
            <img
      src={require('../images/real_background.png')}
      className='img-fluid shadow-4' height={height} width={width}
      alt='not working'/>

        </div>
    );
}

export default Home;
