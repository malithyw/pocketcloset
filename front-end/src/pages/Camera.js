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

    const handleCameraComponentImage = (data) => {
        setPicture(data[0]);
        setContin(data[1]);
    }

    return (
        <div>
            <p>Add to Your Virtual Closet</p>
            {contin ?
                <div>
                    <p>Add Tags for this Piece</p>
                    <img src={picture} />
                </div>

                :
                <div>
                    <CameraComponent sendDataToCamera={handleCameraComponentImage}/>
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
