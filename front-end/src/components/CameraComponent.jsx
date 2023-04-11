import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Webcam from "react-webcam";
import '../pages/Camera.css';
import screenshotButton from '../pages/icons/screenshotButton.webp';

const CameraComponent = (props) => {
    const [ifPicture, setIfPicture] = React.useState(false);
    const [picture, setPicture] = React.useState("");

    const sendDataToCamera = () => {
        props.sendDataToCamera([picture, true]);
    }

    //if comes back from tags, deletes image do we want a reset?

    function takePhoto(image) {
        setPicture(image);
        setIfPicture(true);
    }

    function deletePhoto() {
        setPicture("");
        setIfPicture(false);
    }

    return (
        <div>
            {
                ifPicture ? <div>
                    <button onClick={deletePhoto}>X</button>
                    <img src={picture} />
                    <div className="otherButtons" >
                        <button onClick={sendDataToCamera}>Continue</button>
                    </div>
                </div> :
                    <div>
                        <p>Better Photos With:</p>
                        <li>Good Lighting</li>
                        <li>White Background</li>
                        <li>Clothing Item Centered</li>
                        <div className="row">
                            <Webcam height={600} 
        width={400}>
                                {({ getScreenshot }) => (
                                    <div className="otherButtons">
                                        <img className="screenshot" src={screenshotButton} onClick={() => {
                                            //source code: https://www.npmjs.com/package/react-webcam
                                            // timer = window.setTimeout(3000);
                                            const image = getScreenshot();
                                            takePhoto(image);
                                        }}/>
                                    </div>
                                )}
                            </Webcam>
                        </div>
                    </div>}
        </div>
    );
}

export default CameraComponent;