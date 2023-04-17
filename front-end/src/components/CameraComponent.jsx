import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Webcam from "react-webcam";
import '../pages/Camera.css';
import screenshotButton from '../pages/icons/screenshotButton.webp';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const CameraComponent = (props) => {
    const [ifPicture, setIfPicture] = React.useState(false);
    const [picture, setPicture] = React.useState("");

    function takePhoto(image) {
        setPicture(image);
        setIfPicture(true);
        props.sendDataToCamera([image, true]);
    }

    return (
        <div className="row">
            <Webcam>
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
        
    );
}

export default CameraComponent;