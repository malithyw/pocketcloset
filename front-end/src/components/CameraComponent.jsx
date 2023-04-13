import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../pages/Camera.css';
import ImageUploading from 'react-images-uploading';

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
                        <p>Some Tips When Taking Photos:</p>
                        <li>Good Lighting</li>
                        <li>White Background</li>
                        <li>Clothing Item Centered</li>
                        <div className="row">
                            <ImageUploading
                                maxNumber={1}
                                dataURLKey="dataURL"
                                onChange={(imageList) => addImage(imageList)}
                                >
                                        {({
                                            onImageUpload,
                                        }) => (
                                         <div >
                                            <button onClick={
                                                onImageUpload}>
                                                Click to add Image Here
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