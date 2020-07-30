import React, { Component } from "react";
import { render } from "react-dom";
import { withScriptjs } from "react-google-maps";
import Map from "./components/Map.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends Component {
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    fetch("http://localhost:3000/users")
      .then((data) => data.json())
      .then((json) => console.log(json))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <Menu />
      </div>
    );
  }
}

function Menu() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/Map">MapApp</Link>
            </li>
            <li>
              <Link to="/Add">Add</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/Map">
            <MapApp />
          </Route>
          <Route path="/Add">
            <Add />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function MapApp() {
  const MapLoader = withScriptjs(Map);
  return (
    <div className="App">
      <h3>Hello</h3>
      <MapLoader
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCTIuglr0yoyg7N3YinUj0xEeKmQCA8VT0"
        loadingElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}

function Add() {
  return (
    <div className="App">
      <h3>Add</h3>
    </div>
  );
}

export default App;
