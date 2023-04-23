import React from 'react';
import { Link } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import defaultback from './backgrounds/default.png'
import { Grid, TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import useWindowDimensions from '../dimensions.js';
import CssBaseline from '@mui/material/CssBaseline';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {
    updatePassword
} from "firebase/auth";
import {
    Dialog,
    DialogTitle,
    DialogActions,
    Button
} from '@mui/material';
import blue from './backgrounds/blue.png';
import brown from './backgrounds/brown.png';
import burntRed from './backgrounds/burnt_red.png';
import darkSeaGreen from './backgrounds/dark_sea_green.png';
import darkMode from './backgrounds/dark-mode.png';
import rosyBrown from './backgrounds/rosy_brown.jpeg';
import royalBlue from './backgrounds/royal_blue.png';
import firstBackground from '../pages/backgrounds/default_bg.png';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import './Settings.css';
const databaseURL = "https://pocketcloset-542e3-default-rtdb.firebaseio.com/";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const Settings = (props) => {
    const [name, setName] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [currBackground, setCurrBackground] = React.useState(0);
    const backgroundOptions = [firstBackground, blue, royalBlue, darkSeaGreen, rosyBrown, brown, burntRed, darkMode];
    const [open, setOpen] = React.useState(false);
    const [changePass, setChangePass] = React.useState(false);
    const [changeUser, setChangeUser] = React.useState(false);
    const [changeBack, setChangeBack] = React.useState(false);
    const [backbutton, setBackButton] = React.useState(false);

    const getCurrName = () => {
        fetch(`${databaseURL + "users/" + props.internalUser.uid}/name.json`, {
            method: "GET"
        }).then((res) => {
            return res.json();
        }).then(data => setChangedName(data.name)).catch((error) => {
            console.log(error);
        });
    }

    const [changedName, setChangedName] = React.useState(getCurrName);

    const mapToObj = (m) => {
        return Array.from(m).reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
        }, {});
    };

    const logOut = () => {
        //do a check are u sure you want to logout?
        const sampleDict = {
            events: JSON.stringify(mapToObj(props.events)),
        };
        console.log(`${databaseURL + "users/" + props.internalUser.uid}.json`);
        return fetch(`${databaseURL + "users/" + props.internalUser.uid}.json`, {
            method: "PATCH",
            body: JSON.stringify(sampleDict),
        }).then((res) => {
            props.setInternalUser(null);
            props.setUser(null);
            props.setEmail(null);
            props.setLoaded(null);
            props.setEvents(new Map());
        });
    };

    const handleChange = (event) => {
        if (event.target.id === "nameChange") {
            setName(event.target.value);
        } else if (event.target.id === "passwordChange") {
            setPassword(event.target.value);
        } else if (event.target.id === "newPassword") {
            setNewPassword(event.target.value);
        }
    }

    const changeName = () => {
            fetch(`${databaseURL + "users/" + props.internalUser.uid}/name.json`, {
                method: "PUT", body: JSON.stringify({ name }),
            }).then(() => {
                setChangedName(name);
                let input = document.getElementById("nameChange");
                input.value = "";
                alert("Your name has been changed.");
                setName("");

            });
    }

    const changePassword = () => {
            updatePassword(props.internalUser, newPassword).then(() => {
                let input = document.getElementById("newPassword");
                input.value = "";
            }).catch((error) => {
                alert(error);
            });
        setOpen(false);
    }

    const changeBackground = (right) => {
        if (right) {
            if (currBackground === backgroundOptions.length - 1) {
                setCurrBackground(0);
            } else {
                setCurrBackground(currBackground + 1);
            }
        } else {
            if (currBackground === 0) {
                setCurrBackground(backgroundOptions.length - 1);
            } else {
                setCurrBackground(currBackground - 1);
            }

        }
    }

    const saveBackground = () => {
        let background = backgroundOptions[currBackground];
        fetch(`${databaseURL + "users/" + props.internalUser.uid}/background/.json`, {
            method: "PUT", body: JSON.stringify({ background }),
        }).then(() => {
            props.setBackground(background);
        });
    }

    function handleOpen() { 
        setOpen(true);
    }

    function reset() {
        setChangeBack(false)
        setBackButton(false)
        setChangePass(false)
        setChangeUser(false)
        console.log("reset")
    }
    function backgroundChange() {
        setChangeBack(true)
        setBackButton(true)
        console.log("background")
    }

    function userChange() {
        setChangeUser(true)
        setBackButton(true)
        console.log("user")
    }
    function passChange() {
        setChangePass(true)
        setBackButton(true)
        console.log("pass")
    }
    function handleClose() { 
        setOpen(false);
    }

    return (
        
        <div>
            {backbutton && 
            (<div className="backbutton-settings">
            <Avatar onClick={() => reset()} sx={{ m: 0, bgcolor: 'pink', width: 70, height: 70  }}>
                    <ArrowBackIcon />
                </Avatar>
            </div>)}
            {changeBack && (
                <div className="background-stuff">
                <div className="row">
                        <div className="col-3">
                            <Button onClick={() => changeBackground(false)}>{"<"}</Button>
                        </div>
                        <div className="col-6">
                            <img className="image" src={backgroundOptions[currBackground]} />
                        </div>
                        <div className="col-3">
                            <Button onClick={() => changeBackground(true)}>{">"}</Button>
                        </div>
                    
                    {/* <div className="row"> */}
                        {/* <button onClick={saveBackground}>Save New Background</button> */}
                    {/* </div> */}
                </div>
                <div className='save-settings'>
                    <Button sx={{width: 250}} variant="contained" onClick={saveBackground}>Save New Background</Button>
                </div>
            </div>
                                  )}
        {changePass && (
            <div className="userchange-settings">
                
            <Typography component="h1" variant="h5" color={'white'}>
                Please enter a new password
            </Typography>
            <div className="userprompt-settings" >
                <TextField id="newPassword" onChange={handleChange} />
            </div>
            <React.Fragment>
                <div className="passsubmit-settings">
                            <Button  sx={{width: 200}} variant="contained"  onClick={handleOpen}>Change Password</Button>
                            </div>
                    <Dialog open={open} onClose={handleClose}>
                                <DialogTitle>Are you sure you want to change your password?</DialogTitle>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button
                                        onClick={changePassword}>
                                        Change Password
              </Button>
                                </DialogActions>
                            </Dialog>
                        </React.Fragment>
            </div>
            )}
        {changeUser && (
     
        
        
        <div className="userchange-settings">

            <Typography component="h1" variant="h5" color={'white'}>
                Please enter a new username
            </Typography>
            <div className="userprompt-settings">
            <TextField  id="nameChange" onChange={handleChange} />
            </div>
            <div className="usersubmit-settings">
            <Button  sx={{width: 150}} variant="contained"  onClick={changeName}>Save Name</Button>
            </div>
            </div>
        )}
        {!backbutton  && (
            <div>
                <div className='settings-name'>
        <Grid container rowSpacing={12} columnSpacing={{ xs: 3, sm: 2, md: 3 }}>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={6}>
            <Typography component="h1" variant="h2" color={'white'}>
                Settings
            </Typography>
        </Grid>
        <Grid item xs={3}>
        </Grid>
        </Grid>
    </div>
    <div className="internal-grid-settings" >
    <Grid container rowSpacing={12} columnSpacing={{ xs: 3, sm: 2, md: 3 }}>
            <Grid item xs={3} onClick={() => backgroundChange()}>
                <Avatar sx={{ m: 0, bgcolor: 'pink', width: 70, height: 70  }}>
                    <PhoneIphoneIcon />
                </Avatar>
            </Grid>
            <Grid item xs={6} onClick={() => backgroundChange()}>
                <Typography component="h1" variant="h5" color={'white'}>
                    Change Background
                </Typography>
            </Grid>
    <Grid item xs={3}>
    </Grid>
    <Grid item xs={3} onClick={() => userChange()}>
        <Avatar  sx={{ m: 0, bgcolor: 'pink', width: 70, height: 70  }}>
            <PersonIcon />
        </Avatar>
    </Grid>
    <Grid item xs={6} onClick={() => userChange()}>
        <Typography component="h1" variant="h5" color={'white'}>
            Change Username
        </Typography>
    </Grid>
    <Grid item xs={3}>
    </Grid>
    <Grid item xs={3}>
        <Avatar onClick={() => passChange()} sx={{ m: 0, bgcolor: 'pink', width: 70, height: 70  }}>
            <LockOpenIcon />
        </Avatar>
    </Grid>
    <Grid item xs={6} onClick={() => passChange()}>
        <Typography component="h1" variant="h5" color={'white'}>
            Change Password
        </Typography>
    </Grid>
    <Grid item xs={3}>
    </Grid>
    </Grid>
    <Nav className="logoutbutton-settings" variant="pills" defaultActiveKey="/">
      <Nav.Item>
        <Nav.Link href="/pocketcloset" onClick={logOut}>Log Out</Nav.Link>
      </Nav.Item>
    </Nav>
    {/* <Button className='logout' sx={{width: 250}} href="#" variant="contained" onClick={logOut}>Log Out</Button> */}


</div> 
    
    </div>)}
    </div>

    );
}

export default Settings;
