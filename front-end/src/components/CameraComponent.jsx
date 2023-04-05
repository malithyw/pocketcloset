import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Webcam from "react-webcam";
import { Nav } from "react-bootstrap";

const CameraComponent = (props) => {
    const [ifPicture, setIfPicture] = React.useState(false);
    const [picture, setPicture] = React.useState("");

    const sendDataToCamera = () => {
        props.sendDataToCamera([picture, true]);
    }

    //if comes back from tags, deletes image do we want a reset?

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
                    <button onClick={sendDataToCamera}>Continue</button>
                </div> :
                    <div>
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