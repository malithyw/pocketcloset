import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { initializeApp, registerVersion } from "firebase/app";
import { styled } from '@mui/material/styles';
import { purple,red, pink, blue } from '@mui/material/colors';
import Calendar from './Calendar'
import "./Login.css"
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase } from "firebase/database";
import firstBackground from '../pages/backgrounds/default_bg.png';

const databaseURL = "https://pocketcloset-542e3-default-rtdb.firebaseio.com/";

const firebaseConfig = {
  apiKey: "AIzaSyDiomZpBaGnw99a60AA2u6rgA3wCmU_wXg",
  authDomain: "pocketcloset-542e3.firebaseapp.com",
  databaseURL: "https://pocketcloset-542e3-default-rtdb.firebaseio.com",
  projectId: "pocketcloset-542e3",
  storageBucket: "pocketcloset-542e3.appspot.com",
  messagingSenderId: "730839004045",
  appId: "1:730839004045:web:0d1b296e019d2660b7c3c4",
  measurementId: "G-N05QV7RL04",
};
const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#0063cc',
  borderColor: '#0063cc',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});

const ChangeButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(pink[100]),
  backgroundColor: pink[100],
  '&:hover': {
    backgroundColor: pink[200],
  },
}));


const SubmitButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(blue[100]),
  backgroundColor: blue[100],
  '&:hover': {
    backgroundColor: blue[200],
  },
}));

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getDatabase(app);
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/malithyw/pocketcloset">
        4px
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Login({ events, setUser, setEvents, setEmail, email, setInternalUser, internalUser, setLoaded, loaded, setBackground }) {
  const [password, setPassword] = useState(null);
  const [alert, setAlert] = useState(null);
  const [firstInputValue, setFirstInputValue] = useState(null);
  const [signingIn, setSigningIn] = useState(true);
  const [textColor, setTextColor] = useState("black");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    signIn()
  };

  const loadUser = (user_cred) => {
    setLoaded(true);
    return fetch(`${databaseURL + "users/" + user_cred}.json`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json["events"]);
        readIn(json["events"]);
      });
  };

  const mapToObj = (m) => {
    return Array.from(m).reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});
  };

  const create = () => {
    setAlert(null);
    setPassword(null);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log("success");
        console.log(auth);
        console.log(email);
        console.log(password);
        setUser(userCredential.user);
        setInternalUser(userCredential.user);
        setLoaded(true);
        setFirstInputValue(null);
        setBackground(firstBackground);
      })
      .catch((error) => {
        console.log("failed");
        console.log(email);
        console.log(password);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        setAlert(true);
        // ..
      });
  };

  const readIn = (json) => {
    const eventObj = JSON.parse(json);
    const map = new Map(Object.entries(eventObj));
    for (const key of map.keys()) {
      console.log(typeof key);
    }
    console.log(map);
    setEvents(map);
    console.log("just read it in");
    // <Calendar aboveEvents={map} setAboveEvents={setEvents}/>;
  };

  const signIn = () => {
    setAlert(null);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        // props.user= userCredential.user
        setInternalUser(userCredential.user);
        loadUser(userCredential.user.uid);
        fetch(`${firebaseConfig.databaseURL + "/users/" + userCredential.user.uid}/background/.json`, { method: 'GET' })
        .then((res) => {
          if (res.status !== 200) {
            setBackground(firstBackground);
          } else {
            return res.json();
          }
        }).then(data => {
          setBackground(data.background);
        }).catch(
          setBackground(firstBackground)
      )
      })
      .catch((error) => {
        console.log("failed");
        console.log(email);
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorMessage == "INVALID_EMAIL") {
          setEmail(email + "@key_entry.com");
          create();
        }
        setAlert(true);
      });
  };

  const handleInputChange = (event) => {
    const target = event.target;
    setFirstInputValue(target.value);
    // console.log(target.value);
  };

  function reset() {
    setEmail("");
    setPassword("");
    setAlert(null);
  }

  function handleUserChange(e) {
    // console.log(e.target.value);
    setEmail(e.target.value);
    // console.log(email);
  }

  function handlePassChange(e) {
    // console.log(e.target.value);
    setPassword(e.target.value);
    // console.log(password);
  }


  return (
    <div>
      {!internalUser && (setBackground(firstBackground))}
      {alert && (
        <div>
          <Alert onClose={() => reset()} severity="error">
            <AlertTitle>Error</AlertTitle>
            Those credentials either already exist, in which case you should
            login instead, or you did not use a valid email and password.
          </Alert>
        </div>
      )}
    {!internalUser && signingIn && (
      <div>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div className='icons'>
          <Avatar sx={{ m: 1, bgcolor: 'pink' }}>
            <LockOutlinedIcon />
          </Avatar>
          </div>
          <Typography component="h1" variant="h5" color={textColor}>
            Sign in
          </Typography>
          <div className='welcome_back'>
          <Typography component="h2" variant="h4" color={textColor}>
            Welcome back!
          </Typography>
          </div>
          <Box className="fields" component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              className="fields"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={handleUserChange}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              onChange={handlePassChange}
              id="password"
              autoComplete="current-password"
            />
            <div>

              
            <SubmitButton 
              type="submit"
              fullWidth
              onClick={() => signIn()}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              // color={"pink"}
            >
              Sign In
            </SubmitButton>
            </div>
            {/* <Grid container> */}
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              {/* <Grid item> */}
              <div className='change'>
                <ChangeButton
              type="submit"
              fullWidth
              onClick={() => setSigningIn(false)}
              variant="contained"
              sx={{ mt: 1, mb: 1 }}>            
                  {"Don't have an account? Sign Up"}
                </ChangeButton>
                </div>
              {/* </Grid> */}
            {/* </Grid> */}
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    </div>
    )}
    {!internalUser && !signingIn && (
        <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div className='icons'>
            <Avatar sx={{ m: 1, bgcolor: 'pink' }}>
              <LockOutlinedIcon />
            </Avatar>
            </div>
            <Typography component="h1" variant="h5" color={textColor}>
              Create an Account
            </Typography>
            <div className='welcome_back'>
            {/* <Grid container justify="flex-end"> */}
              <Typography justify="flex-end" component="h2" variant="h5" color={textColor}>
                Welcome to PocketCloset!
              </Typography>
            {/* </Grid> */}
            </div>
            <Box className="fields" component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                className="fields"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={handleUserChange}
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                onChange={handlePassChange}
                id="password"
                autoComplete="current-password"
              />

              <SubmitButton
                type="submit"
                fullWidth
                onClick={() => create()}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                // color={"pink"}
              >
                Create Account
              </SubmitButton>
              {/* <Grid container> */}
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                {/* <Grid item> */}
                <div className='change'>
                  <ChangeButton
                type="submit"
                fullWidth
                onClick={() => setSigningIn(true)}
                variant="contained"
                sx={{ mt: 1, mb: 1 }}>            
                    {"Already have an account? Sign In"}
                  </ChangeButton>
                </div>
                {/* </Grid> */}
              {/* </Grid> */}
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
      </div>
      )}
    </div>
  );
}