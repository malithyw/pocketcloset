import React, { useState} from 'react';
import { Button, Form} from 'react-bootstrap';
import {
  TextField,
  Alert,
  AlertTitle,
} from "@mui/material";


import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const databaseURL = "https://pocketcloset-542e3-default-rtdb.firebaseio.com/";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// class Show extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {};
//     this.f = props.f;
//     this.error = props.error;
//     this.status = false;
//     this.getShowInfo(props.user_name);
//   }    

//   render () {
//       return (<div>
//         {!this.state.data && 
//           (<div> 
//             <p>Loading...</p>
//           </div>)
//         }
//         {this.state.data && 
//           (<div> 
//             <p>Rating: {this.state.data["show"]["rating"]["average"]}</p>
//             <p>Status: {!this.state.data["show"]["status"] ? "Don't know" : this.state.data["show"]["status"]}</p>
//             <p>Where to Watch: {!this.state.data["show"]["webChannel"] ? "Don't know" : this.state.data["show"]["webChannel"]["name"]}</p>
//             <p>On average, each episode is {this.state.data["show"]["averageRuntime"]} minutes long.</p>
//             <p>Ready to Watch? <a href={this.state.data["show"]["officialSite"]}>Click here</a></p>
//             <p>Summary: {this.state.data["show"]["summary"].replace(/<\/?[^>]+(>|$)/g, "")}</p>
//             <p>Language: {this.state.data["show"]["language"]}</p>
//             <p>Genres: {this.state.data["show"]["genres"].join(", ")}</p>
//             <p><img src={this.state.data["show"]["image"]["medium"]} alt="Poster image of show."></img></p>
//             <p>If you'd like to read more, here's the IMDb website: <a href={"https://www.imdb.com/title/" + this.state.data["show"]["externals"]["imdb"]}>Click here</a></p>
//           </div>)
//           }
//       </div> );
//   }
  
//   getShowInfo = async(show_name) => {
//     let url = BASE_URL + "/search/shows?q=" + show_name.replaceAll(" ","%20")
//     this.status = true
//     const response = await fetch(url);
//     const json = await response.json();
//     if (json && json.length > 0) {
//       this.name = json[0]["show"]["name"]
//       this.setState({data: json[0]});
//       this.f(this);
//     }
//     else {
//       this.error(show_name);
//     }
//   };
// }

function Login({setUser})  {
  const [internalUser, setInternalUser] = useState(null);
  const [loaded, setLoaded] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [firstInputValue, setFirstInputValue] = useState("");
  const [alert, setAlert] = useState(null);
  const [showNames, setShowNames] = useState([]);
  const [show, setShow] = useState(null);
  const [key_count, setKey] = useState(0);
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const user_field = <TextField
      id="outlined-basic"
      label="Email"
      fullWidth
      value={email}
      onChange={handleUserChange}
      variant="outlined"
    />;
  const pass_field = <TextField
      id="outlined-basic"
      label="Password"
      fullWidth
      value={password}
      onChange={handlePassChange}
      variant="outlined"
    />;

//   const sendData = () => {
//     const newShow = <Show user_name={firstInputValue} error={error_notify} name={""} f={temp} key={key_count}/>;
//     setKey(key_count + 1);
//     setShow(newShow);
//     setFirstInputValue("");
//     console.log(showNames);
//     console.log(newShow);
//     const sampleDict = {
//       date: new Date(),
//       shows: showNames
//     };

//     return fetch(`${databaseURL + "/testData/" + user.uid}.json`, {
//       method: "PATCH",
//       body: JSON.stringify(sampleDict)
//     }).then((res) => {
//     });
//   };

  const loadUser = (user_cred) => {
    setLoaded(true)
    // return fetch(`${databaseURL + "/testData/" + user_cred}.json`, {
    //   method: "GET",
    // }) .then((response) => response.json())
    // .then((json) => {
    //   if (json.shows) {
    //     console.log(json.shows)
    //     setShowNames(json.shows)
    //     setShow(<Show user_name={json.shows[0]} error={error_notify} name={""} f={temp} key={key_count}/>)
    //     setKey(key_count + 1);
    //   }
    // });
    // return {

    // }
  };

  const logOut = () => {
    console.log(internalUser)
    const sampleDict = {
      // username: user,
      date: new Date(),
      shows: showNames
    };

    // return fetch(`${databaseURL + "/testData/" + user.uid}.json`, {
    //   method: "PATCH",
    //   body: JSON.stringify(sampleDict)
    // }).then((res) => {
      setUser(null)
      setInternalUser(null)
      setEmail(null)
      setPassword(null)
    //   setShowNames([])
    //   setShow(null)
      setLoaded(null)
    // });
  }

  const create = () => {
    setAlert(null)
    setPassword(null)
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      console.log("success");
      console.log(auth);
      console.log(email);
      console.log(password);
      setUser(userCredential.user);
      setInternalUser(userCredential.user)
      setLoaded(true);
    })
    .catch((error) => {
      console.log("failed")
      console.log(email);
      console.log(password);
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      setAlert(true);
      // ..
    });
  }

  const signIn = () => {
      setAlert(null)
      setPassword(null)
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        // props.user= userCredential.user
        setInternalUser(userCredential.user)
        loadUser(userCredential.user.uid);
        // console.log(props)
      })
      .catch((error) => {
        console.log("failed");
        console.log(email);
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorMessage == "INVALID_EMAIL") {
          setEmail(email + "@key_entry.com")
          create()
        }
        setAlert(true);
      });

    }
    
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

//   function temp(this_show) {
//     if (!showNames.includes(this_show.name)) {
//       showNames.push(this_show.name);
//       // setShowNames(showNames);
//       console.log(showNames)
//     }
//     forceUpdate();
//   }

//   function clicked(name) {
//     const newShow = <Show user_name={name} name={""} error={error_notify} f={temp} key={key_count}/>;
//     setKey(key_count + 1);
//     setShow(newShow);
//     forceUpdate();
//   }

  function error_notify(old_name) {  
    return (
      alert("We don't recognize " + old_name + ". Please try again.")
    );
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
    {
      alert &&
      <div>
      <Alert onClose={() => reset()} severity="error">
      <AlertTitle>Error</AlertTitle>
      Those credentials either already exist, in which case you should login instead, or you did not use a valid email and password.
      </Alert>
      </div>
    }
    {
      !internalUser &&
      <div>
        { user_field}
                 { pass_field }
                {<Button variant="contained" onClick={() => signIn()}>
                Login
              </Button>}
              {<Button variant="contained" onClick={() => create()}>
                Create
              </Button>}
      </div>
    }
    {internalUser && loaded &&
    (<div>
      {<Button variant="light" className="btn bg-transparent" onClick={ () => (logOut())}>Log Out</Button>}
      
    </div>)}
    </div>
    );
}

export default Login;