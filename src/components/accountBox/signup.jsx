import React from "react";
import { BoxContainer,
    FormContainer,
    Input,
    AltPrompt,
    ColorLink,
    SubmitButton } from "./common";
import { AccountContext } from "./accountContext";
import { useContext } from 'react';

export function SignupForm(props) {

    const { switchToLogin } = useContext(AccountContext);

    return (
        <BoxContainer>
            <FormContainer>
                <Input type="text" placeholder="Username" />
                <Input type="email" placeholder="Email" />
                <Input type="password" placeholder="Password" />
                <Input type="password" placeholder="Confirm password" />
            </FormContainer>
            <SubmitButton type = "submit">Signup</SubmitButton>
            <AltPrompt href = "#">Already have an account?<ColorLink onClick={switchToLogin}>Sign in!</ColorLink></AltPrompt>
        </BoxContainer>
    );
}