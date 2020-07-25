import React, { Component } from 'react';
import { render } from 'react-dom';
import { withScriptjs } from "react-google-maps";
import Map from './components/Map.js';


function App() {
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

export default App;
