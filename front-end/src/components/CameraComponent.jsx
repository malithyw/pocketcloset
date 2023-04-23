import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../pages/Camera.css';
import ImageUploading from 'react-images-uploading';
import Webcam from 'react-webcam';
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

    function addImage(imageList) {
        console.log(imageList);
        setPicture(imageList[0].dataURL);
        setIfPicture(true);
        props.sendDataToCamera([imageList[0].dataURL, true]);
    }

    return (
        <div>
            <div className="row">
                <Webcam>
                    {({ getScreenshot }) => (
                        <div className="otherButtons">
                            <img className="screenshot" src={screenshotButton} onClick={() => {
                                //source code: https://www.npmjs.com/package/react-webcam
                                // timer = window.setTimeout(3000);
                                const image = getScreenshot();
                                takePhoto(image);
                            }} />
                        </div>
                    )}
                </Webcam>
            </div>
            <div className="or">or</div>
            <div style={{ textAlign: "center" }} className="row">
                <ImageUploading
                    maxNumber={1}
                    dataURLKey="dataURL"
                    onChange={(imageList) => addImage(imageList)}
                >
                    {({
                        onImageUpload,
                    }) => (
                            <div>
                                <button onClick={onImageUpload}>
                                    Upload Image Here
                                            </button>
                            </div>
                        )}
                </ImageUploading>
            </div>
        </div>

    );
}

export default CameraComponent;