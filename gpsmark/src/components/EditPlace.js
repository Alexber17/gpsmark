import React, { Component } from "react";

import { withScriptjs } from "react-google-maps";
import MapShow from "../components/MapShow";
class EditPlace extends Component {
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
                <h3>Edit Places</h3>
                {this.state.Places.map((places, index) => {
                    return (
                        <>

                            <div key={places.id} className='container'>
                                <h4>Title: {places.nick_name}</h4>
                                <h4 >Address: {places.addrees}</h4>
                                <button className="btn btn-primary" onClick={() => this.showMap(places.id)}  >Edit</button>
                                {this.state.showThisMap[places.id] ? <UpdatePlaces place={places} getdata={this.getplaces} ></UpdatePlaces> : ''}



                            </div>
                        </>
                    )

                })}
            </div>
        )

    }
}


class UpdatePlaces extends Component {
    state = {
        Place: [],
        nick_name: "",
        addrees: "",
        img: "",
        showThisMap: {}
    };

    componentDidMount() {
        console.log(this.props.place)
        this.setState({
            nick_name: this.props.place.nick_name,
            addrees: this.props.place.addrees,
            img: this.props.place.img
        })
    }

    handleChange = (event) => {
        console.log(event.target.value);
        this.state.value = event.target.value;
        this.setState({ [event.target.id]: event.target.value });
    };

    handleUpdate = (event) => {
        event.preventDefault();
        fetch(`http://localhost:3000/places/${this.props.place.id}`, {
            body: JSON.stringify({
                nick_name: this.state.nick_name,
                addrees: this.state.addrees,
                img: this.state.img,
            },

            ),
            method: "PUT",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((newTodo) => {
                this.props.getdata()
            });
    };

    render() {

        return (


            <form onSubmit={this.handleUpdate}>

                <div className="form-group">
                    <label htmlFor="nick_name">Title</label>
                    <input
                        className="form-control"
                        type="text"
                        value={this.state.nick_name}
                        onChange={this.handleChange}
                        id="nick_name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="addrees">address</label>
                    <input
                        type="text"
                        className="form-control"
                        value={this.state.addrees}
                        onChange={this.handleChange}
                        id="addrees"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="img">img</label>
                    <input
                        type="text"
                        className="form-control"
                        value={this.state.img}
                        onChange={this.handleChange}
                        id="img"
                    />
                </div>
                <br />
                <input className="btn btn-primary" type="submit" />


            </form>


        );
    }
}





export default EditPlace;
