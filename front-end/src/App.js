import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Home from "./pages/Home";
import { Navbar, Nav, Container} from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Lookbooks from './pages/Lookbooks';
import Closet from './pages/Closet';
import Calendar from './pages/Calendar';
import Camera from './pages/Camera'

function App() {
  return (
    <div >
        <div>
        <Router>
         <Navbar bg="light" fixed="bottom" >
          <Container>
          <Navbar.Brand href="/home">(home)</Navbar.Brand>
            <Nav className="me-auto">
            {/* <Navbar.Link href="/home">(home icon)</Navbar.Link> */}
              <Nav.Link href="/calendar">(calendar)</Nav.Link>
              <Nav.Link href="/lookbooks">(lookbooks)</Nav.Link>
              <Nav.Link href="/closet">(closet)</Nav.Link>
              <Nav.Link href="/camera">(camera)</Nav.Link>
            </Nav>
          </Container>
          </Navbar>
          <Routes>
              <Route path="#/calendar" element={<Calendar/>} />
              <Route path="#/lookbooks" element={<Lookbooks/>} />
              <Route path="#/closet" element={<Closet/>} />
              <Route path="#/camera" element={<Camera/>} />
              <Route path="#/home" element={<Home/>}/>
              <Route path="*" element={<Home/>}/>
          </Routes>
        </Router>
       </div>
       </div>
  );
}

export default App;
