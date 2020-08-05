import React, { Component } from "react";

import { withScriptjs } from "react-google-maps";
import MapShow from "../components/MapShow";
class showPlaces extends Component {
    state = {
        Places: [],
        nick_name: "",
        addrees: "",
        img: "",
        showThisMap: {}
    };

    handleChange = (event) => {
        console.log(event.target.value);
        // this.state.value = event.target.value;
        this.setState({ [event.target.id]: event.target.value });
    };

    componentDidMount() {
        this.getplaces();
    }

    getplaces = () => {
        fetch("http://localhost:3000/places/1")
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    Places: json
                })
                return json
            })
            .then((json) => {
                const places = {}
                json.forEach(place => {
                    places[place.id] = false
                });
                this.setState({ showThisMap: places })
            })
            // .then(playlist => console.log(this.state.playlist))
            .catch((error) => console.error(error));
    };

    showMap = (id) => {
        const showThisMap = { ...this.state.showThisMap }

        for (const i in showThisMap) {
            showThisMap[i] = false
        }
        showThisMap[id] = true
        this.setState({ showThisMap: { ...this.state.showThisMap, ...showThisMap } })

    }



    render() {
        console.log(this.state.Places)
        return (
            <div>
                <h3>Favorite Places</h3>
                {this.state.Places.map((places, index) => {
                    return (
                        <>

                            <div key={places.id} className='container'>
                                <h4>Title: {places.nick_name}</h4>
                                <h4 >Address: {places.addrees}</h4>
                                <button className="btn btn-primary" onClick={() => this.showMap(places.id)}  >Route</button>
                                {this.state.showThisMap[places.id] ? <MapApp place={places.addrees} ></MapApp> : ''}



                            </div>
                        </>
                    )

                })}
            </div>
        )

    }
}


function MapApp(place) {
    const MapLoader = withScriptjs(MapShow);
    return (
        <div className="App">

            <MapLoader
                place={place}
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCTIuglr0yoyg7N3YinUj0xEeKmQCA8VT0"
                loadingElement={<div style={{ height: `150%` }} />}
            />
        </div>
    );
}


export default showPlaces;
