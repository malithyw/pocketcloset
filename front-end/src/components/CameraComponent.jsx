import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../pages/Camera.css';
import ImageUploading from 'react-images-uploading';
import Webcam from 'react-webcam';
import screenshotButton from '../pages/icons/screenshotButton.webp';

const CameraComponent = (props) => {
    const [ifPicture, setIfPicture] = React.useState(false);
    const [picture, setPicture] = React.useState("");

    const sendDataToCamera = () => {
        props.sendDataToCamera([picture, true]);
    }

    function deletePhoto() {
        setPicture([]);
        setIfPicture(false);
    }

    function addImage(list) { 
        if (list !== []) {
            setPicture(list[0].dataURL);
            setIfPicture(true);
        } else { 
            setIfPicture(false);
        }
    }

    function takePhoto(image) { 
        setIfPicture(true);
        setPicture(image);
    }

    return (
        <div>
            {
                ifPicture ? <div>
                    <div className="row">
                        <button style={{textAlign: "left"}} onClick={deletePhoto}>X</button>
                    </div>
                    <div className="row">
                        <img src={picture} />
                    </div>
                    <div className="otherButtons" >
                        <button onClick={sendDataToCamera}>Continue</button>
                    </div>
                </div> :
                    <div>
                        <p>Some Tips When Taking Photos:</p>
                        <li>Good Lighting</li>
                        <li>White Background</li>
                        <li>Clothing Item Centered</li>
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
                        <div className="or">or</div>
                        <div style={{textAlign:"center"}} className="row">
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
                    </div>}
        </div>
    );
}

export default CameraComponent;