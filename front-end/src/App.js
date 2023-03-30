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
import cameraPNG from "./images/camera.png"
import homePNG from "./images/house.png"
import closetPNG from "./images/hanger.png"
import calendarPNG from "./images/calendar.png"


function App() {
  // const app = express();
  // const router = express.Router();
  // app.use( express.static( "public" ) );
  // var path = require('path');
  // app.use(express.static(path.resolve('./public')));
  // useWindowDimensions()
  return (
    <div>
      <div>
        <HashRouter>
          <Navbar bg="light" fixed="bottom">
            <Container>
              {/* <Navbar.Brand href="#">(home)</Navbar.Brand> */}
              <Nav className="me-auto">
                <Nav.Link href="#"> <img
      src={require(homePNG)}
      className='img-fluid shadow-4' height={height} width={width}
      alt='not working'/></Nav.Link>
                <Nav.Link href="#/calendar"><img
      src={require(calendarPNG)}
      className='img-fluid shadow-4' height={height} width={width}
      alt='not working'/></Nav.Link>
                <Nav.Link href="#/closet"><img
      src={require(closetPNG)}
      className='img-fluid shadow-4' height={height} width={width}
      alt='not working'/></Nav.Link>
                <Nav.Link href="#/camera"><img
      src={require(cameraPNG)}
      className='img-fluid shadow-4' height={height} width={width}
      alt='not working'/></Nav.Link>
              </Nav>
            </Container>
          </Navbar>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/calendar" element={<Calendar />} />
            <Route exact path="/closet" element={<Closet />} />
            <Route exact path="/camera" element={<Camera />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="*" element={<Home />} />
          </Routes>
        </HashRouter>
      </div>
    </div>
  );
}

export default App;
