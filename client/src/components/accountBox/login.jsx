import React, { useContext } from "react";
import { useState } from 'react';
import { BoxContainer,
    FormContainer,
    Input,
    AltPrompt,
    ColorLink,
    SubmitButton,
    ErrorMessage,
    ResultMessage } from "./common";
import { AccountContext } from "./accountContext";

export function LoginForm(props) {
    let resultMsg = '';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const { switchToSignup } = useContext(AccountContext);

    function doLogin()
    {
        if (!email)
        {
            console.error("Enter email");
            return;
        }
        
        if (!password)
        {
            console.error("Enter password");
            return;
        }
        
        // Send API request
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
        var urlencoded = new URLSearchParams();
        urlencoded.append("email", email);
        urlencoded.append("password", password);
    
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://large-project-cop4331.herokuapp.com/users/sign-in", requestOptions)
        .then(response => response.text())
        .then(result => {
            result = JSON.parse(result);
            console.log(result);

            // Give error if login was invalid
            if (result.message == "Invalid Credentials")
            {
                // Add code to display error message here
                resultMsg = result.message;
                return;
            }

            // If login was valid, save login and go to lessons page
            localStorage.setItem("Login", email);
            window.location.href = "/home";
        })
        .catch(error => console.log('error', error));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        doLogin();
    }

    return (<BoxContainer>
        <ResultMessage>{resultMsg}</ResultMessage>
        <FormContainer>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
            <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
        </FormContainer>
        <SubmitButton onClick={handleSubmit} type="submit">Login</SubmitButton>
        <AltPrompt href="#">Don't have an account?<ColorLink onClick={switchToSignup}>Sign up!</ColorLink></AltPrompt>
    </BoxContainer>);
}
