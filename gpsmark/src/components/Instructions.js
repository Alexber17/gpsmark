import React, { Component } from "react";
import './custom.scss';
const DirectionInstructions = (props) => {
  if (props.directions.routes) {
    console.log(props.directions.routes[0].legs[0].steps[0].instructions);
    console.log(props.directions.routes[0].legs[0].end_address);



    return (
      <>
        <h3>{props.directions.routes[0].legs[0].end_address}</h3>
        {this.props.directions.routes.map((instructions) => {
          return (
            <div className="directions" >
              <h3>{instructions}</h3>
            </div>
          );
        })}
      </>



    )
  }
};

export default DirectionInstructions;
