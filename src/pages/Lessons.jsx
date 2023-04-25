import React from 'react';

function Lessons() {
    function setup()
    {
        const iframe = document.getElementById("inner");
        const button = document.getElementById("send");
        
        let iWindow = iframe.contentWindow;

        const data = localStorage.getItem("Login");
        console.log("React sent data: " + data);
        
        iWindow.postMessage(data, "http://localhost:5000/js/cards.js");
    }

    return (
        <iframe id="inner" src="http://localhost:5000" onLoad={setup} style={{border: "none", width: "100%", height: "100%"}}/>
    );
}

export default Lessons;
