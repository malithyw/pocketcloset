import React from 'react';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './Settings.css';
import useWindowDimensions from '../dimensions.js';
import { state } from '../Login.js'

const databaseURL = "https://pocketcloset-542e3-default-rtdb.firebaseio.com/";

const Settings = (props) => {

    const mapToObj = (m) => {
        return Array.from(m).reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
        }, {});
    };

    const logOut = () => {
        console.log(props.internalUser)
        console.log(props.events)
        const sampleDict = {
            events: JSON.stringify(mapToObj(props.events)),
        };
        console.log(props.internalUser.uid);
        console.log(`${databaseURL + "users/" + props.internalUser.uid}.json`);
        return fetch(`${databaseURL + "users/" + props.internalUser.uid}.json`, {
            method: "PATCH",
            body: JSON.stringify(sampleDict),
        }).then((res) => {
            props.setInternalUser(null);
            props.setUser(null);
            props.setEmail(null);
            props.setLoaded(null);
            props.setEvents(new Map());
        });
    };

    const { height, width } = useWindowDimensions();

    console.log("settings")
    return (
        <div>
            <Button variant="light" className="btn bg-transparent" onClick={logOut}>Log Out</Button>
            <img
                src={require('../images/rain.png')}
                className='img-fluid shadow-4' width='auto'
                alt='not working' />
        </div>


    );
}

export default Settings;
