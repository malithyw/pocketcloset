import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./pages/Home";
import { Navbar, Nav, Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import Closet from "./pages/Closet";
import Calendar from "./pages/Calendar";
import Camera from "./pages/Camera";
import Settings from "./pages/Settings";
import cameraPNG from "./images/camera.png";
import homePNG from "./images/house.png";
import closetPNG from "./images/hanger.png";
import calendarPNG from "./images/calendar.png";
import settingsPNG from "./images/settings.png";
import useWindowDimensions from "./dimensions.js";
import Login from "./pages/Login"
import { useState } from "react";

function App() {
  const { height, width  } = useWindowDimensions();
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState(new Map());
  const [internalUser, setInternalUser] = useState(null);
  const [loaded, setLoaded] = useState(null);
  const [email, setEmail] = useState(null);
  const [background, setBackground] = useState("../pages/backgrounds/blue.png");

  return (
    <div style={{ backgroundImage:`url(${background})`,backgroundRepeat:"no-repeat",
    height:height, width:width, overflow:"hidden"}}>
      {
        <div>
          <Login
            events={events}
            setUser={setUser}
            setEvents={setEvents}
            setInternalUser={setInternalUser}
            internalUser={internalUser}
            loaded={loaded}
            setLoaded={setLoaded}
            email={email}
            setEmail={setEmail}
            setBackground={setBackground}
          ></Login>
        </div>
      }
      {user && (
        <div>
          <div>
            <HashRouter>
              <Navbar fixed="bottom" height="40">
                <Container fluid>
                  {/* <Navbar.Brand href="#"></Navbar.Brand> */}
                  <Nav className="me-auto">
                    <Nav.Link href="#/camera">
                      <img
                        src={cameraPNG}
                        className="img-fluid shadow-4"
                        height={height}
                        width={width}
                        alt="not working"
                      />
                    </Nav.Link>
                    <Nav.Link href="#/closet">
                      <img
                        src={closetPNG}
                        className="img-fluid shadow-4"
                        height={height}
                        width={width}
                        alt="not working"
                      />
                    </Nav.Link>
                    {/* <Nav.Link href="#/home">
                      {" "}
                      <img
                        src={homePNG}
                        className="img-fluid shadow-4"
                        height={height}
                        width={width}
                        alt="not working"
                      />
                    </Nav.Link> */}
                    <Nav.Link href="#/calendar">
                      <img
                        src={calendarPNG}
                        className="img-fluid shadow-4"
                        height={height}
                        width={width}
                        alt="not working"
                      />
                    </Nav.Link>
                    <Nav.Link href="#/settings">
                      <img
                        src={settingsPNG}
                        className="img-fluid shadow-4"
                        height={height}
                        width={width}
                        alt="not working"
                      />
                    </Nav.Link>
                  </Nav>
                </Container>
              </Navbar>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route
                  exact
                  path="/calendar"
                  element={
                    <Calendar aboveEvents={events} setAboveEvents={setEvents} background={background} />
                  }
                />
                <Route exact path="/closet" element={<Closet background={background} />} />
                <Route exact path="/camera" element={<Camera user={user} background={background} />} />
                {/* <Route exact path="/home" element={<Home />} /> */}
                <Route exact path="/settings" element={<Settings setUser={setUser} setEvents={setEvents} setEmail={setEmail} setInternalUser={setInternalUser} setLoaded={setLoaded} events={events} internalUser={internalUser} setBackground={setBackground} background={background}/>} />
                <Route exact path="*" element={<Calendar aboveEvents={events} setAboveEvents={setEvents} background={background} />} />
              </Routes>
            </HashRouter>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
