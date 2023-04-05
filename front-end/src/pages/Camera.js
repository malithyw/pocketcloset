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

const Camera = (props) => {
    const height = 70;
    const width = 70;
    const [picture, setPicture] = React.useState("");
    const [contin, setContin] = React.useState(false);
    const [tags, setTags] = React.useState([]);
    const [newTag, setNewTag] = React.useState("");

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
        }
    }

    return (
        <div>
            <p>Add to Your Virtual Closet</p>
            {contin ?
                <div>
                    <button onClick={goBack}>{"<"}</button>
                    <img src={picture} />
                    <p>Add Tags for this Piece</p>
                    <input id="tagInput" onChange={updateInput} />
                    <button onClick={addTag}>Add</button>
                    {tags.map(tag => <li>{tag}</li>)}
                    {/* //create tag objects later that have x for deletion */}
                    <button>Save</button>
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
