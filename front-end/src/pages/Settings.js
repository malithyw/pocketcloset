import React from 'react';
import { Link } from "react-router-dom";
import { Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './Settings.css';
import useWindowDimensions from '../dimensions.js';

const Settings = () =>  {
    const { height, width } = useWindowDimensions();

    console.log("settings")
    return (
        <div>
 <img
        src={require('../images/rain.png')}
        className='img-fluid shadow-4' width='auto'
        alt='not working'/> 
        <Button variant="light" className="btn bg-transparent" onClick={ () => (logOut())}>Log Out</Button>
        </div>
       
     
    );
}

export default Settings;
