import logo from './logo.svg';
import './App.css';
import{Home} from './Home';
import{Users} from './Users';
import{Items} from './Items';
import{SubItems} from './SubItems';
import{ItemTypes} from './ItemTypes';
import{Checkins} from './Checkins';
import{Chechouts} from './Checkouts';
import {BrowserRouter,Router,Route,Routes,NavLink} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter> 
    <div className="App container">
      <h3 className="d-flex justify-content-center m-3">
        React JS Frontend
      </h3>


      <nav className="navbar navbar-expand-sm bg-light navbar-dark">
        <ul className="navbar-nav">
          <li className= "nav-item- M-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/home">
              Home
            </NavLink>
          </li>
          <li className= "nav-item- M-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/users">
              Users
            </NavLink>
          </li>
          <li className= "nav-item- M-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/items">
              Items
            </NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/users" element={<Users/>}/>
        <Route exact path="/items" element={<Items/>}/>
      </Routes>
    </div>
    </BrowserRouter> 
  );
}

export default App;