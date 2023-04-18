import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Camera.css';
import CameraComponent from '../components/CameraComponent';

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
        if (confirm("Going back will delete your image. Is this okay?")) { 
            setPicture("");
            setContin(false);
        }
    }

    function deleteTag(event) {
        let newTags = tags.filter(tag => tag !== event.target.id);
        setTags(newTags);
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

        const addNameToTags = tags;
        addNameToTags.push(name);
        addNameToTags.push("all")
        setTags(addNameToTags);
        let piece = {
            "image": picture,
            "name": name,
            "tags": tags
        };
        if (tags.length !== 0) {
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
            setContin(false);
        } else { 
            alert("Cannot add piece to closet without tags or name!");
        }
    }

    return (
        <body style={{ backgroundImage: `url(${props.background})`, width: '400px', height: '990px' }} >
            <div className="row">
                <a>Add to Your Virtual Closet</a>
            </div>
            {contin ?
                <div>
                    <button onClick={goBack}>{"<"}</button>
                    <div className="row">
                        <img src={picture} />
                    </div>
                    <div className="row">
                        <p className="col-4">Name</p>
                        <input className="col-4" id="nameInput" onChange={updateInput} />
                    </div>
                    <div className="row">
                        <p className="col-4">Tags</p>
                        <input className="col-4" id="tagInput" onChange={updateInput} />
                        <button className="col-1" onClick={addTag}>Add</button>
                    </div>
                        {tags.map(tag => 
                            <ui className="col">
                            <div style={{ whiteSpace: "normal", textAlign: "left", color: "white", display: "inline-block", height: "35px", background: "pink", borderRadius: "15px", paddingLeft: "10px", paddingTop: "5px", paddingRight: "5px",marginLeft:"15px", marginBottom: "15px"}}>
                                {tag}
                                <button style={{ textAlign: "right", marginTop: "-20px", marginLeft:"-1px"}} id={tag} onClick={deleteTag}>x</button>
                            </div>
                        </ui>)}
                    <div className="otherButtons">
                        <button onClick={save}>Save Piece</button>
                    </div>
                </div>
                :
                <div>
                    <CameraComponent sendDataToCamera={handleCameraComponentImage} />
                </div>
            }
        </body>
    );
}

export default Camera;