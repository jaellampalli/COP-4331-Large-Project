import React from "react";
import { BoxContainer,
    FormContainer,
    AltPrompt,
    ColorLink,
    SubmitButton } from "./common";
import { AccountContext } from "./accountContext";
import { useContext, useState } from 'react';
import FormInput from "./signupInputs";

export function SignupForm(props) {
    // used to switch screens
    const { switchToLogin } = useContext(AccountContext);

    // values to get from user
    const [values, setValues] = useState({
        email: "",
        initPass: "",
        password: "",
    });

    const inputs = [
        {
            id: "emailField",
            name: "email",
            type: "email",
            placeholder: "Email",
            pattern: "^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$",
            errMsg: "Invalid email",
            required: true,
        },
        {
            id: "initPassField",
            name: "initPass",
            type: "password",
            placeholder: "Password",
            pattern: "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,15}$",
            errMsg: "Must contain 8-15 characters and at least one uppercase, lowercase, and digit",
            required: true,
        },
        {
            id: "confirmPassField",
            name: "password",
            type: "password",
            placeholder: "Confirm password",
            pattern: values.initPass,
            errMsg: "Passwords do not match!",
            required: true,
        }
    ]

    // supplementary functions to help with getting inputs
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    };

    return (
        <BoxContainer>
            <FormContainer onSubmit={handleSubmit}>
                {inputs.map((input) =>(
                    <FormInput key={input.id} 
                    {...input} 
                    value={values[input.name]} 
                    onChange={onChange} />
                ))}
            </FormContainer>
            <SubmitButton onClick={handleSubmit} type="submit">Signup</SubmitButton>
            <AltPrompt href="#">Already have an account?<ColorLink onClick={switchToLogin}>Sign in!</ColorLink></AltPrompt>
        </BoxContainer>
    );
}