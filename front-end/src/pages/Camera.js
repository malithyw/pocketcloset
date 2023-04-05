import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Camera.css';
import CameraComponent from '../components/CameraComponent';
import { Navbar, Nav, Container } from "react-bootstrap";
import cameraPNG from "../images/camera.png"
import homePNG from "../images/house.png"
import closetPNG from "../images/hanger.png"
import calendarPNG from "../images/calendar.png"
import settingsPNG from "../images/settings.png"

import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDiomZpBaGnw99a60AA2u6rgA3wCmU_wXg",
    authDomain: "pocketcloset-542e3.firebaseapp.com",
    databaseURL: "https://pocketcloset-542e3-default-rtdb.firebaseio.com",
    projectId: "pocketcloset-542e3",
    storageBucket: "pocketcloset-542e3.appspot.com",
    messagingSenderId: "730839004045",
    appId: "1:730839004045:web:0d1b296e019d2660b7c3c4",
    measurementId: "G-N05QV7RL04"
  };

const app = initializeApp(firebaseConfig);

const Camera = (props) => {
    const height = 70;
    const width = 70;
    const [picture, setPicture] = React.useState("");
    const [contin, setContin] = React.useState(false);
    const [tags, setTags] = React.useState([]);
    const [newTag, setNewTag] = React.useState("");
    const [name, setName] = React.useState("");
    const user = props.user;

    const handleCameraComponentImage = (data) => {
        setPicture(data[0]);
        setContin(data[1]);
    }

    function goBack() {
        setContin(false);
    }

    function addTag() {
        //also check for duplicate tags
        if (newTag !== "") {
            let allTags = tags;
            allTags.push(newTag);
            setTags(allTags);
            setNewTag("");
            let input = document.getElementById("tagInput");
            input.value = "";
        }
    }

    function updateInput(event) {
        if (event.target.id === "tagInput") {
            setNewTag(event.target.value);
        } else if (event.target.id === "nameInput") { 
            setName(event.target.value);
        }
    }

    function save() { 
        let piece = {
                "image": picture,
                "name": name,
                "tags": tags
        };
        //add to closet, get user ID and add info below
        fetch(`${firebaseConfig.databaseURL + "/users/" + user.uid}/closet/clothes/.json`, { method: 'POST', body: JSON.stringify(piece) })
                .then((res) => {
                    if (res.status !== 200) {
                        console.log("piece not stored");
                    } else {
                        console.log("piece stored");
                        alert("Piece has been added to closet");
                    }
                }).catch(error => alert(error))
        setTags([]);
        setName("");
        setNewTag("");
        setPicture("");
        goBack();//because it restarts camera
    }

    return (
        <div>
            <a>Add to Your Virtual Closet</a>
            {contin ?
                <div>
                    <button onClick={goBack}>{"<"}</button>
                    <img src={picture} />
                    <p>Name the Piece</p>
                    <input id="nameInput" onChange={updateInput} />
                    <p>Add Tags for this Piece</p>
                    <input id="tagInput" onChange={updateInput} />
                    <button onClick={addTag}>Add</button>
                    {tags.map(tag => <li>{tag}</li>)}
                    {/* //create tag objects later that have x for deletion */}
                    <button onClick={save}>Save</button>
                    {/* //needs to go to closet to view piece? or go back to camera--needs to check if any tags were created*/}
                </div>
                :
                <div>
                    <CameraComponent sendDataToCamera={handleCameraComponentImage} />
                    <Navbar fixed="bottom" height='40' >
                        <Container fluid>
                            {/* <Navbar.Brand href="#"></Navbar.Brand> */}
                            <Nav className="me-auto">
                                <Nav.Link href="#/camera"><img
                                    src={cameraPNG}
                                    className='img-fluid shadow-4' height={height} width={width}
                                    alt='not working' /></Nav.Link>
                                <Nav.Link href="#/closet"><img
                                    src={closetPNG}
                                    className='img-fluid shadow-4' height={height} width={width}
                                    alt='not working' /></Nav.Link>
                                <Nav.Link href="#/home"> <img
                                    src={homePNG}
                                    className='img-fluid shadow-4' height={height} width={width}
                                    alt='not working' /></Nav.Link>
                                <Nav.Link href="#/calendar"><img
                                    src={calendarPNG}
                                    className='img-fluid shadow-4' height={height} width={width}
                                    alt='not working' /></Nav.Link>
                                <Nav.Link href="#/settings"><img
                                    src={settingsPNG}
                                    className='img-fluid shadow-4' height={height} width={width}
                                    alt='not working' /></Nav.Link>
                            </Nav>
                        </Container>
                    </Navbar>
                </div>
            }
        </div>
    );
}

export default Camera;