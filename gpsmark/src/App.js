import React, { Component } from "react";
import { render } from "react-dom";
import { withScriptjs } from "react-google-maps";
import Map from "./components/Map.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import AddPlaces from "./components/AddPlaces.js";
import ShowPlaces from "./components/ShowPlaces.js"

import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { MdPlace, MdMap, MdAddLocation } from "react-icons/md";

import './custom.scss';



class App extends Component {
  state = {
    users: []
  }
  componentDidMount() {
    this.getData();
  }



  getData = () => {
    fetch("http://localhost:3000/users")
      .then((data) => data.json())
      .then((json) => this.setState({ users: json }))
      .catch((err) => console.log(err));
  };

  render() {
    if (this.state.users[0]) {
      console.log(this.state.users[0].username)
    }



    return (
      <Router>
        <div className="main">
          <Switch>
            <Route path="/Map">
              <MapApp />
            </Route>
            <Route path="/AddPlaces">
              <AddPlaces />
            </Route>
            <Route path="/ShowPlaces">
              <ShowPlaces />
            </Route>
          </Switch>
        </div>
        <div className="asideMenu">
          <ProSidebar>
            <SidebarHeader>
              <h3>{this.state.users[0] ? this.state.users[0].username : ''}</h3>
            </SidebarHeader>
            <Menu iconShape="circle">
              <MenuItem icon={<MdPlace />} ><Link to="/ShowPlaces">Favorite Places</Link></MenuItem>
              <MenuItem icon={<MdMap />}  ><Link to="/Map">MapApp</Link></MenuItem>
              <MenuItem icon={<MdAddLocation />} > <Link to="/AddPlaces">Add new place</Link></MenuItem>
            </Menu>
            <SidebarFooter>
              <p>By Alexander Bermudez</p>
            </SidebarFooter>
          </ProSidebar>


        </div>
      </Router>
    )
  }
}



function MapApp() {
  const MapLoader = withScriptjs(Map);
  return (
    <div className="App">
      <h3>Hello</h3>
      <MapLoader
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCTIuglr0yoyg7N3YinUj0xEeKmQCA8VT0"
        loadingElement={<div style={{ height: `150%` }} />}
      />
    </div>
  );
}

export default App;
