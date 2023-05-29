import React from "react";

export default function Dado(props) {

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#ffffff"
    }

    return(
        <div className="tenzies-dado" onClick={props.held} style={styles}>
            <h2>{props.value}</h2>
        </div>
    )
}