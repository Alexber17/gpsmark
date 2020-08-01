import React, { Component } from "react";


class AddPlaces extends Component {
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

  //   componentDidMount() {
  //     this.getPlaylist();
  //   }

  //   getPlaylist = () => {
  //     fetch("http://localhost:3000/playlists")
  //       .then((response) => response.json())
  //       .then((json) => this.setState({ playlist: json }))
  //       // .then(playlist => console.log(this.state.playlist))
  //       .catch((error) => console.error(error));
  //   };

  handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/users/1/places", {
      body: JSON.stringify({
        nick_name: this.state.nick_name,
        addrees: this.state.addrees,
        img: this.state.img,

      }),
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((newTodo) => {
        this.setState({
          Places: [newTodo, ...this.state.Places],
          nick_name: "",
          addrees: "",
          img: "",
        });
      });
  };

  render() {
    console.log(this.state.Places)
    return (


      <form onSubmit={this.handleSubmit}>

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

        <div classNameName="form-group">
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

export default AddPlaces;
