import React, { Component } from "react";


class showPlaces extends Component {
    state = {
        Places: [],
        nick_name: "",
        addrees: "",
        img: "",
    };

    handleChange = (event) => {
        console.log(event.target.value);
        // this.state.value = event.target.value;
        this.setState({ [event.target.id]: event.target.value });
    };

    componentDidMount() {
        this.getPlaylist();
    }

    getPlaylist = () => {
        fetch("http://localhost:3000/places/1")
            .then((response) => response.json())
            .then((json) => this.setState({ Places: json }))
            // .then(playlist => console.log(this.state.playlist))
            .catch((error) => console.error(error));
    };



    render() {
        console.log(this.state.Places)
        return (
            <div>
                {this.state.Places.map((places, index) => {
                    return (
                        <div className='container'>
                            <h4>{places.nick_name}</h4>
                            <h4>{places.addrees}</h4>
                        </div>
                    )

                })}
            </div>
        )

    }
}

export default showPlaces;
