import './App.css';
import{Home} from './Home';
import{Users} from './Users';
import{Items} from './Items';
import {ItemTypes} from './ItemTypes';
import {Checkouts} from './Checkouts';
import {BrowserRouter,Route,Routes,NavLink, Link} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter> 
    <div className="App container">
      <h3 className="d-flex justify-content-center m-3">
        React JS Frontend
      </h3>


      <nav className="navbar navbar-expand-sm bg-light navbar-dark">
        <ul className="navbar-nav">
          <li className= "nav-item M-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/home">
              Home
            </NavLink>
          </li>
          <li className= "nav-item M-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/users">
              Users
            </NavLink>
          </li> 
           <li className= "nav-item M-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/checkouts">
              Checkouts
            </NavLink>
          </li>
          <li className= "nav-item M-1">
            <div className="dropdown">
              <a className="btn btn-light btn-outline-primary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                Menu
              </a>

              <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li><Link className="dropdown-item" to="/items">Items</Link></li>
                <li><Link className="dropdown-item" to="/itemTypes">Item types</Link></li>
                <li><Link className="dropdown-item" to="/users">Users</Link></li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/users" element={<Users/>}/>
        <Route exact path="/Checkouts" element={<Checkouts/>}/>
        <Route exact path="/Items" element={<Items/>}/>
        <Route exact path="/ItemTypes" element={<ItemTypes/>}/>
      </Routes>
    </div>
    </BrowserRouter> 
  );
}

export default App;
