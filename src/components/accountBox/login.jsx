import React, { useContext } from "react";
import { useState } from 'react';
import { BoxContainer,
    FormContainer,
    Input,
    AltPrompt,
    ColorLink,
    SubmitButton} from "./common";
import { AccountContext } from "./accountContext";

export function LoginForm(props) {
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

        fetch("http://localhost:5000/users/sign-in", requestOptions)
        .then(response => response.text())
        .then(result => {
            result = JSON.parse(result);
            console.log(result)
            if (result.error)
            {
                return;
            }
            window.location.href = "/lessons";
        })
        .catch(error => console.log('error', error));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        doLogin();

        //window.location.href = "/lessons";
    }

    return (<BoxContainer>
        <FormContainer>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
            <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
        </FormContainer>
        <AltPrompt href="#">Forgot password?</AltPrompt>
        <SubmitButton onClick={handleSubmit} type="submit">Login</SubmitButton>
        <AltPrompt href="#">Don't have an account?<ColorLink onClick={switchToSignup}>Sign up!</ColorLink></AltPrompt>
    </BoxContainer>);
}