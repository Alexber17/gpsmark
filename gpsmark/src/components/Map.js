/*global google*/

import React, { Component } from "react";
import mapStyle from '../mapStyle'
import {
  Marker,
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  DirectionsRenderer,
} from "react-google-maps";


import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyCTIuglr0yoyg7N3YinUj0xEeKmQCA8VT0");
Geocode.enableDebug();

class Map extends React.Component {
  state = {
    directions: [],
    destination: "",
    latOrigin: 0,
    lngOrigin: 0,
    latDestin: 0,
    lngDestin: 0,
    destinationAddress: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // this.setState({
    //   destinationAddress: this.state.destinationAddress,
    // });
    console.log(this.state.destinationAddress);
    this.geoDestiny();
  };

  geoDestiny = () => {
    Geocode.fromAddress(this.state.destinationAddress).then(
      (response) => {
        let { lat, lng } = response.results[0].geometry.location;
        this.setState({
          latDestin: lat,
          lngDestin: lng,
        });
        console.log(this.state.latDestin, this.state.lngDestin);
        this.getpositon();
      },
      (error) => {
        console.error(error);
      }
    );
  };

  displayLocationInfo = (position) => {
    let lng2 = position.coords.longitude;
    let lat2 = position.coords.latitude;
    console.log(`longitude: ${lat2} | latitude: ${lng2}`);
    this.setState({
      latOrigin: lat2,
      lngOrigin: lng2,
    });
    console.log("disply" + this.state.lat);

    this.loadMap();
  };

  getpositon = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.displayLocationInfo);
    }
  };

  loadMap = () => {
    console.log(
      `origin lat: ${this.state.latOrigin}, lng: ${this.state.lngOrigin} `
    );
    console.log(
      `Destino lat:  ${this.state.latDestin}, lng: ${this.state.lngDestin} `
    );

    let origin = { lat: this.state.latOrigin, lng: this.state.lngOrigin };
    let destination = { lat: this.state.latDestin, lng: this.state.lngDestin };
    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          console.log(result);
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };

  componentDidMount = () => {
    this.getpositon();
    console.log("component" + this.state.lat);
  };

  render() {
    const GoogleMapExample = withGoogleMap((props) => (
      <GoogleMap
        defaultCenter={{ lat: this.state.latOrigin, lng: this.state.lngOrigin }}
        defaultZoom={13}
        options={{styles: mapStyle}}

      >
        <DirectionsRenderer directions={this.state.directions} />
        <Marker lat={this.state.latOrigin} lng={this.state.lngOrigin} />
      </GoogleMap>
    ));

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <lable htmlFor="description" className="col-sm-1 col-form-label">
              Destination Address:
            </lable>

            <div class="col-sm-11">
              <input
                type="text"
                required
                value={this.state.destinationAddress}
                className="form-control"
                id="destinationAddress"
                onChange={this.handleChange}
              />
            </div>
            <br />
            <div class="col-10">
              <button type="submit" class="btn btn-primary">
                Create{" "}
              </button>
            </div>
            <br />
          </div>
        </form>
        <GoogleMapExample
          containerElement={<div style={{ height: `500px`, width: "100%" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        ></GoogleMapExample>


        <div>.
       
          {this.state.directions.routes
            ? <>
            <h3>{this.state.directions.routes[0].legs[0].end_address}</h3>
            <h6>{this.state.directions.routes[0].legs[0].distance.text}</h6>
            <h6>{this.state.directions.routes[0].legs[0].duration.text}</h6>
          
            {this.state.directions.routes[0].legs[0].steps.map((elemen) => (
              <div className="directions" >
                {" "}
                <p
                  dangerouslySetInnerHTML={{ __html: elemen.instructions }}
                />{" "}
              </div>
            ))}
            </>: ""}
        </div>
      </div >
    );
  }
}

export default Map;
