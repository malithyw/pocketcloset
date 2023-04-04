import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Webcam from "react-webcam";
import PictureTags from "../pages/PictureTags";
import { Nav} from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import { HashRouter } from 'react-router-dom';

const CameraComponent = () => {
    const [ifPicture, setIfPicture] = React.useState(false);
    const [picture, setPicture] = React.useState("");

    function takePhoto(image) {
        setPicture(image);
        if (picture != "") {
            setIfPicture(true);
        }
    }

    function deletePhoto() {
        setPicture("");
        setIfPicture(false);
    }

    return (
        <div>
            {
                ifPicture ? <div>
                    <button onClick={deletePhoto}>x</button>
                    <img src={picture} />
                        <Nav.Link href="#/camera/tags">Continue</Nav.Link>
                        {/* <Routes>
                            <Route exact path="/camera/tags" element={<PictureTags />} />
                        </Routes> */}
                </div> :
                    <div>
                        <p>Add to Virtual Closet!</p>
                        <p>If you can, place a white background behind the clothes.</p>
                        <Webcam>
                            {({ getScreenshot }) => (
                                <button onClick={() => {
                                    //source code: https://www.npmjs.com/package/react-webcam
                                    const image = getScreenshot();
                                    takePhoto(image);
                                }}>Take picture here</button>
                            )}
                        </Webcam>
                    </div>}
        </div>
    );
}

export default CameraComponent;