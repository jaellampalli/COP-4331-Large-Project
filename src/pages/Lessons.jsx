import React from 'react';

function Lessons() {
    function setup()
    {
        const iframe = document.getElementById("inner");
        const button = document.getElementById("send");
        
        let iWindow = iframe.contentWindow;

        const data = localStorage.getItem("Login");
        console.log("React sent data: " + data);
        
        iWindow.postMessage(data, "https://large-project-cop4331.herokuapp.com/js/cards.js");
    }

    return (
        <iframe id="inner" src="https://large-project-cop4331.herokuapp.com/" onLoad={setup} style={{border: "none", width: "100%", height: "100%"}}/>
    );
}

export default Lessons;
