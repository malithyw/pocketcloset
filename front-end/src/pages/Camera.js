import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Camera.css';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    List,
    ListItem,
    Box,
    ListItemText,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    TextField
} from "@mui/material";
import CameraComponent from '../components/CameraComponent';
import camera from "../images/camera.png";

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

// const useStyles = makeStyles({
//     accordionSummary: {
//         justifyContent: center,
//         display: flex
//     }
//   })

const Camera = (props) => {
    const [picture, setPicture] = React.useState("");
    const [contin, setContin] = React.useState(false);
    const [tags, setTags] = React.useState([]);
    const [newTag, setNewTag] = React.useState("");
    const [name, setName] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [openSave, setOpenSave] = React.useState(false);

    // const classes = useStyles();

    const user = props.user;

    const handleCameraComponentImage = (data) => {
        setPicture(data[0]);
        setContin(data[1]);
    }

    function handleOpen() {
        setOpen(true);
    }

    function handleSaveClose() { 
        setContin(false);
        setOpenSave(false);
    }

    function handleClose() {
        setOpen(false);
    }

    function goBack() {
        setPicture("");
        setContin(false);
        setOpen(false);
    }

    function deleteTag(event) {
        let newTags = tags.filter(tag => tag !== event.target.id);
        setTags(newTags);
    }

    function addTag() {
        if (newTag !== "" && tags.indexOf(newTag) === -1 && tags.length <= 3) {
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
        if (name !== "" && tags.length !== 0) {
            const addNameToTags = tags;
            addNameToTags.push(name);
            addNameToTags.push("all")
            setTags(addNameToTags);
            let piece = {
                "image": picture,
                "name": name,
                "tags": tags
            };
                fetch(`${firebaseConfig.databaseURL + "/users/" + user.uid}/closet/clothes/.json`, { method: 'POST', body: JSON.stringify(piece) })
                    .then((res) => {
                        if (res.status !== 200) {
                            console.log("piece not stored");
                        } else {
                            console.log("piece stored");
                        }
                    }).catch(error => alert(error))
                setTags([]);
                setName("");
                setNewTag("");
                setPicture("");
                setOpenSave(true);
        } else { 
            alert("Cannot add piece to closet without tags or name!");
        }
    }

    return (
        <div >
            {contin ?
                <div>
                    <React.Fragment>
                        <button onClick={handleOpen} className="goBack">{"<"}</button>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Delete Image?</DialogTitle>
                            <DialogContent>Going back will delete the image</DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button
                                    onClick={goBack}>
                                    Okay
          </Button>
                            </DialogActions>
                        </Dialog>
                    </React.Fragment>
                    <div className="row-2">
                        <img className="icon2" src={camera} />
                    </div>
                    <div className="row">
                        <a>Add to Your Virtual Closet</a>
                    </div>
                    <img src={picture} />
                    <div className="row">
                        <TextField id="nameInput"label="Piece's Name" variant="filled" className="input" onChange={updateInput} />
                    </div>
                    <div className="row-2">
                        <TextField id="tagInput" label="Tags" variant="filled" className="input" style={{marginBottom: "20px"}} onChange={updateInput} />
                        <button className="col-2" onClick={addTag}>+</button>
                    </div>
                    <div className="row">
                    {tags.map(tag =>
                        <div className="col-5">
                            <div id={tag} key={tag} style={{ whiteSpace: "normal", textAlign: "left", color: "black", display: "inline-block", height: "35px", background: "white", borderRadius: "15px", paddingLeft: "5px", paddingTop: "5px", paddingRight: "5px" }}>
                                {tag}
                                <button style={{ textAlign: "right", marginTop: "-20px",marginLeft: "7px", color: "black"}} id={tag} onClick={deleteTag}>x</button>
                            </div>
                        </div>)}
                    </div>
                    <React.Fragment>
                    <div className="otherButtons">
                            <Button onClick={save} variant="contained" style={{background: "white", color: "black"}}>Save</Button>
                    </div>
                        <Dialog open={openSave} onClose={handleSaveClose}>
                            <DialogTitle>Item added to Closet</DialogTitle>
                            <DialogActions>
                                <Button
                                    onClick={handleSaveClose}>
                                    Okay
          </Button>
                            </DialogActions>
                        </Dialog>
                    </React.Fragment>
                </div>
                :
                <div>
                    <div className="row-2">
                        <img className="icon" src={camera} />
                    </div>
                    <div className="row">
                        <a>Add to Your Virtual Closet</a>
                    </div>
                    <div className="row">
                        <Accordion className="Accordion">
                            <AccordionSummary>
                                <Typography align="center" sx={{ width: '100%' }}>Tips?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <List>
                                    <ListItem className="FirstListItem">
                                        <ListItemText>• Make sure you have good lighting for clearer images.</ListItemText>
                                    </ListItem>
                                    <ListItem className="ListItem">
                                        <ListItemText>• An empty background will make your clothing piece pop out more.</ListItemText>
                                    </ListItem>
                                    <ListItem className="ListItem">
                                        <ListItemText>• If your photos are centered, your pieces will look better in your closet.</ListItemText>
                                    </ListItem>
                                </List></AccordionDetails>
                        </Accordion>
                    </div>
                    <CameraComponent sendDataToCamera={handleCameraComponentImage} />
                </div>
            }
        </div>
    );
}

export default Camera;