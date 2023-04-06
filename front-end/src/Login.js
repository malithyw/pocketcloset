import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { TextField, Alert, AlertTitle } from "@mui/material";
// import {EVENTS} from "./components/staticEvents"
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Calendar from "./pages/Calendar";
import { getDatabase } from "firebase/database";

// const EVENTS;
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getDatabase(app);

function Login({ events, setUser, setEvents, setEmail, email, setInternalUser, internalUser, setLoaded, loaded }) {
  const [password, setPassword] = useState(null);
  const [alert, setAlert] = useState(null);
  const [firstInputValue, setFirstInputValue] = useState(null);

  const user_field = (
    <TextField
      id="outlined-basic"
      label="Email"
      fullWidth
      onChange={handleUserChange}
      variant="outlined"
    />
  );
  const pass_field = (
    <TextField
      id="outlined-basic"
      label="Password"
      fullWidth
      onChange={handlePassChange}
      variant="outlined"
    />
  );

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

  const logOut = () => {
    // console.log(internalUser)
    // console.log(EVENTS)
    const sampleDict = {
      events: JSON.stringify(mapToObj(events)),
    };
    console.log(internalUser.uid);
    console.log(`${databaseURL + "users/" + internalUser.uid}.json`);
    return fetch(`${databaseURL + "users/" + internalUser.uid}.json`, {
      method: "PATCH",
      body: JSON.stringify(sampleDict),
    }).then((res) => {
      setInternalUser(null);
      setUser(null);
      setEmail(null);
      setLoaded(null);
      setEvents(new Map());
    });
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
    // const map = new Map();
    // let counter = 0;
    // console.log(Object.entries(json))
    // for (const[key, value] in Object.entries(json)) {
    //   // let eventObj = {
    //   //   key: obj["title"],
    //   //   date: obj["date"],
    //   //   isAllDay: obj["isAllDay"],
    //   //   startTime: obj["startTime"],
    //   //   hasOutfit: obj["hasOutfit"],
    //   // };
    //   map.set(key, value)
    //   counter++
    // }
    const eventObj = JSON.parse(json);
    const map = new Map(Object.entries(eventObj));
    for (const key of map.keys()) {
      console.log(typeof key);
    }
    console.log(map);
    setEvents(map);
    // {<Calendar events={events} setEvents={setEvents}></Calendar>}
  };

  const signIn = () => {
    setAlert(null);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        // props.user= userCredential.user
        setInternalUser(userCredential.user);
        loadUser(userCredential.user.uid);
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
    console.log(target.value);
  };

  function reset() {
    setEmail("");
    setPassword("");
    setAlert(null);
  }

  function handleUserChange(e) {
    console.log(e.target.value);
    setEmail(e.target.value);
    console.log(email);
  }

  function handlePassChange(e) {
    console.log(e.target.value);
    setPassword(e.target.value);
    console.log(password);
  }

  return (
    <div>
      {alert && (
        <div>
          <Alert onClose={() => reset()} severity="error">
            <AlertTitle>Error</AlertTitle>
            Those credentials either already exist, in which case you should
            login instead, or you did not use a valid email and password.
          </Alert>
        </div>
      )}
      {!internalUser && (
        <div>
          {user_field}
          {pass_field}
          {
            <Button variant="contained" onClick={() => signIn()}>
              Login
            </Button>
          }
          {
            <Button variant="contained" onClick={() => create()}>
              Create
            </Button>
          }
        </div>
      )}
    </div>
  );
}

export default Login;
