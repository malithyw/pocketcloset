import React from 'react';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './Settings.css';
import useWindowDimensions from '../dimensions.js';
import {
    updatePassword
} from "firebase/auth";
import { auth } from '../Login.js';

const databaseURL = "https://pocketcloset-542e3-default-rtdb.firebaseio.com/";

const Settings = (props) => {
    const [name, setName] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");

    const mapToObj = (m) => {
        return Array.from(m).reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
        }, {});
    };

    const logOut = () => {
        //do a check are u sure you want to logout?
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

    const handleChange = (event) => {
        if (event.target.id === "nameChange") {
            setName(event.target.value);
        } else if (event.target.id === "passwordChange") {
            setPassword(event.target.value);
        } else if (event.target.id === "newPassword") {
            setNewPassword(event.target.value);
        }
    }

    const changeName = () => {
        if (confirm("Are you sure that you want to change your name?")) {
            fetch(`${databaseURL + "users/" + props.internalUser.uid}/name.json`, {
                method: "PUT", body: JSON.stringify({ name }),
            }).then(() => {
                let input = document.getElementById("nameChange");
                input.value = "";
                alert("Your name has been changed.");

            });
        }
    }

    const changePassword = () => {
        if (confirm("Are you sure you want to change your password?")) {
            updatePassword(props.internalUser, newPassword).then(() => {
                alert("password has successfully been changed");
                let input = document.getElementById("newPassword");
                input.value = "";
            }).catch((error) => {
                alert(error);
            });
        }
    }

    const { height, width } = useWindowDimensions();

    return (
        <body className="background">
            <div>
                <p className="a">Settings</p>
            </div>
            <p className="title">Change Name?</p>
            <div className="row">
                <p className="col-4">Name:</p>
                <input className="col-4" id="nameChange" onChange={handleChange} />
                <button className="col-2" onClick={changeName}>Change</button>
            </div>
            <p className="title">Change Password?</p>
            <div className="row">
                <p className="col-5">New Password:</p>
                <input className="col-4" id="newPassword" label="New Password" onChange={handleChange} />
                <button className="col-2" onClick={changePassword}>Change</button>
            </div>
            <div className="row">
                <button onClick={logOut}>Log Out</button>
            </div>
        </body>


    );
}

export default Settings;
