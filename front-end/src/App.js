import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./pages/Home";
import { Navbar, Nav, Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import Lookbooks from "./pages/Lookbooks";
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
import Login from "./Login";
import { useState } from "react";
import { events, setEvents } from "./Login";

function App() {
  // const app = express();
  // const router = express.Router();
  // app.use( express.static( "public" ) );
  // var path = require('path');
  // app.use(express.static(path.resolve('./public')));
  // const { height, width } = useWindowDimensions();
  const height = 70;
  const width = 70;
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState(new Map());

  return (
    <div>
      {
        <div>
          <Login
            events={events}
            setUser={setUser}
            setEvents={setEvents}
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
                    <Nav.Link href="#/home">
                      {" "}
                      <img
                        src={homePNG}
                        className="img-fluid shadow-4"
                        height={height}
                        width={width}
                        alt="not working"
                      />
                    </Nav.Link>
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
                    <Calendar aboveEvents={events} setAboveEvents={setEvents} />
                  }
                />
                <Route exact path="/closet" element={<Closet />} />
                <Route exact path="/camera" element={<Camera user={user} />} />
                <Route exact path="/home" element={<Home />} />
                <Route exact path="/settings" element={<Settings />} />
                <Route exact path="*" element={<Home />} />
              </Routes>
            </HashRouter>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
