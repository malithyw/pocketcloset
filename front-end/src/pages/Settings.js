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
        const sampleDict = {
            events: JSON.stringify(mapToObj(props.events)),
        };
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

    return (
        <body className="background">
            <div>
                <Button variant="light" className="btn bg-transparent" onClick={logOut}>Log Out</Button>
            </div>
        </body>


    );
}

export default Settings;
