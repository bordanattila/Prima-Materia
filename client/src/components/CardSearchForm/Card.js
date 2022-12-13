import React from "react";

function Card(props) {
    // map through the props to insert data for HTML element
    return props.card.map((item) => (
        <div>
            <p style={{
                    color: "white",
                }}
                >{item.name}</p>
            {/* <img src={item.imageUrl}></img> */}
        </div>
    ))
}

export default Card;

// {/* need a card component to use in all pages */}
// <Card
// card={temp}
// ></Card>