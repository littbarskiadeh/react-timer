import React from "react";

const LogItem = (props) => {

    const myStyle = {
        listStyle: 'none', 
        fontSize:'18px',
        fontWeight: 'bold'
    }

    let items = props.duration.map((el, index) => <li style={myStyle} key={index}>{el}</li>)

    return (
        <ul>{items} </ul>
    );
}

export default LogItem;