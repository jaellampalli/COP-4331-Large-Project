import React, { useContext } from "react";
import { BoxContainer,
    FormContainer,
    Input,
    AltPrompt,
    ColorLink,
    SubmitButton } from "./common";
import { AccountContext } from "./accountContext";

export function LoginForm(props) {

    const { switchToSignup } = useContext(AccountContext);

    return (<BoxContainer>
        <FormContainer>
            <Input type="text" placeholder="Username" />
            <Input type="password" placeholder="Password" />
        </FormContainer>
        <AltPrompt href = "#">Forgot password?</AltPrompt>
        <SubmitButton type = "submit">Login</SubmitButton>
        <AltPrompt href = "#">Don't have an account?<ColorLink onClick={switchToSignup}>Sign up!</ColorLink></AltPrompt>
    </BoxContainer>);
}