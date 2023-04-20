import React from 'react';

function Lessons() {
    function setup()
    {
        // assign variables with references to the DOM nodes we will be interacting with
        const iframe = document.getElementById("inner");
        const button = document.getElementById("send");
        // we will assign this value once the iframe is ready
        let iWindow = iframe.contentWindow;

        // otherwise, get the value of our text input
        const data = localStorage.getItem("Login");
        console.log("React sent data:")
        console.log(data)

        // and send it to the embedded page
        iWindow.postMessage(data, "http://localhost:5000/js/cards.js");
    }

    return (
        <iframe id="inner" src="http://localhost:5000" onLoad={setup} style={{border: "none", width: "100%", height: "100%"}}/>
    );
}

export default Lessons;