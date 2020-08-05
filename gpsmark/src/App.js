import React, { Component, useRef } from "react";
import { withScriptjs } from "react-google-maps";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Map from "./components/Map.js";
import AddPlaces from "./components/AddPlaces.js";
import ShowPlaces from "./components/ShowPlaces.js";
import DeletePlace from "./components/DeletePlace.js";
import EditPlace from "./components/EditPlace"

import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter } from 'react-pro-sidebar';
import { MdPlace, MdMap, MdAddLocation } from "react-icons/md";




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
            <Route path="/DeletePlace">
              <DeletePlace />
            </Route>
            <Route path="/EditPlace">
              <EditPlace />
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
              <SubMenu title="Places" icon={<MdAddLocation />} >
                <MenuItem icon={<MdAddLocation />} > <Link to="/AddPlaces">Add new </Link></MenuItem>
                <MenuItem icon={<MdAddLocation />} > <Link to="/EditPlace"></Link>Edit </MenuItem>
                <MenuItem icon={<MdAddLocation />} > <Link to="/DeletePlace">Delete </Link></MenuItem>
              </SubMenu>

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
      <h3>MapApp</h3>

      <MapLoader
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCTIuglr0yoyg7N3YinUj0xEeKmQCA8VT0"
        loadingElement={<div style={{ height: `150%` }} />}

      />

    </div>
  );
}

export default App;
