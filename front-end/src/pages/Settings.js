import React from 'react';
import { Link } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './Settings.css';
import useWindowDimensions from '../dimensions.js';
import {
    updatePassword
} from "firebase/auth";
import blue from './backgrounds/blue.png';
import brown from './backgrounds/brown.png';
import burntRed from './backgrounds/burnt_red.png';
import darkSeaGreen from './backgrounds/dark_sea_green.png';
import darkMode from './backgrounds/dark-mode.png';
import rosyBrown from './backgrounds/rosy_brown.jpeg';
import royalBlue from './backgrounds/royal_blue.png';

const databaseURL = "https://pocketcloset-542e3-default-rtdb.firebaseio.com/";

const Settings = (props) => {
    const [name, setName] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [currBackground, setCurrBackground] = React.useState(0);
    const backgroundOptions = [blue, royalBlue, darkSeaGreen, rosyBrown, brown, burntRed, darkMode];


    const getCurrName = () => {
        fetch(`${databaseURL + "users/" + props.internalUser.uid}/name.json`, {
            method: "GET"
        }).then((res) => {
            return res.json();
        }).then(data => setChangedName(data.name)).catch((error) => {
            console.log(error);
        });
    }

    const [changedName, setChangedName] = React.useState(getCurrName);

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
                setChangedName(name);
                let input = document.getElementById("nameChange");
                input.value = "";
                alert("Your name has been changed.");
                setName("");

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

    const changeBackground = (right) => { 
        if (right) {
            if (currBackground === backgroundOptions.length - 1) {
                setCurrBackground(0);
            } else { 
                setCurrBackground(currBackground + 1);
            }
        } else { 
            if (currBackground === 0) {
                setCurrBackground(backgroundOptions.length - 1);
            } else { 
                setCurrBackground(currBackground - 1);
            }

        }
    }

    const saveBackground = () => { 
        let background = backgroundOptions[currBackground];
        fetch(`${databaseURL + "users/" + props.internalUser.uid}/background/.json`, {
            method: "PUT", body: JSON.stringify({ background }),
        }).then(() => {
            props.setBackground(background);
        });
    }

    return (
        <div style={{ backgroundImage: `url(${props.background})`, width: '400px', height: '990px' }}>
            <div>
                <p className="a">Settings</p>
                <p className="a">Hello {changedName}</p>
            </div>
            <div className="title">Change Background</div>
            <div className="row">
                <div className="col-3">
                <button onClick={() => changeBackground(false)}>{"<"}</button>
                </div>
                <div className="col-6">
                    <img className="image" src={backgroundOptions[currBackground]} />
                </div>
                <div className="col">
                    <button onClick={() => changeBackground(true)}>{">"}</button>
                </div>
            </div>
            <button onClick={saveBackground}>Save New Background</button>
            <p className="title">Add/Change Name?</p>
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
                <Nav.Link href="#/home" onClick={logOut}>Log Out</Nav.Link>
        </div>
    </div>
    );
}

export default Settings;
