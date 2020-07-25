import React, { Component } from "react";


const DirectionInstructions = (props)=>{
    if(props.directions.routes){
        console.log(props.directions.routes[0].legs[0].steps[10].instructions)
        
        
        return(
     
     
            this.props.directions.routes.map((instructions)=>{

                return(
<h3>
                         <h3>{instructions}</h3>
                    </h3>
                )
                    
        })
        )
    }
}

export default DirectionInstructions;