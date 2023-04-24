import React, { useState } from "react";
import styled from "styled-components";
import { LoginForm } from "./login";
import { SignupForm } from "./signup";
import { motion } from "framer-motion";
import { AccountContext } from "./accountContext";
import { ErrorMessage } from "./common";

/* container for the whole section */
const BoxContainer = styled.div`
    width: 280px;
    min-height: 550px;
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    background-color: #fff;
    box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
    position: relative;
    overflow: hidden;
    background-color: #f5f5f5;
`;

/* container for the top area of the app */
const TopContainer = styled.div`
    width: 100%;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0 1.8em;
    padding-bottom: 5em;
`;

/* circle for backdrop */
const BackDrop = styled(motion.div)`
    width: 160%;
    height: 550px;
    position: absolute;
    display: flex;
    flex-direction: column;
    border-radius: 100%;
    transform: rotate(30deg); 
    top: -290px;
    left: -60px;
    background: rgb(0,0,0);
    background: linear-gradient(25deg, rgba(0,0,0,1) 35%, rgba(60,57,57,1) 100%);
`;

const HeaderContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-bottom: 40px;
`;

const HeaderText = styled.h2`
    font-size: 30px;
    font-weight: 600;
    line-height: 1.24;
    color: white;
    z-index: 10;
    margin: 0;
`;

const SmallText = styled.h5`
  color: white;
  font-weight: 500;
  font-size: 11px;
  z-index: 10;
  margin: 0;
  margin-top: 10px;
`;

/* container for form */
const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px 1.8em;
  text-align: center;
  margin-bottom: 10px;
`;

const backdropVariants = {
    expanded: {
        width: "233%",
        height: "1090px",
        borderRadius: "100%",
        transform: "rotate(800deg)"
    },
    collapsed: {
        width: "160%",
        height: "550px",
        borderRadius: "100%",
        transform: "rotate(800deg)",
    },
};

const expandTransition = {
    type: "spring",
    duration: 2.3,
    stiffness: 30,
};

export function AccountBox(props){
    const [isExpanded, setExpanded] = useState(false);
    const [active, setActive] = useState("login");

    const playExpand = () => {
        setExpanded(true);
        setTimeout(() => {
            setExpanded(false);
        }, expandTransition.duration * 1000 - 1500);
    }

    const switchToSignup = () => {
        playExpand();
        setTimeout(() => {
            setActive("signup");
        }, 400);
    }

    const switchToLogin = () => {
        playExpand();
        setTimeout(() => {
            setActive("login");
        }, 400);
    };

    const contextValue = { switchToSignup, switchToLogin };

    return (
        <AccountContext.Provider value={contextValue}>
            <BoxContainer>
                <TopContainer>
                    <BackDrop 
                        initial={false} 
                        animate={isExpanded ? "expanded" : "collapsed"} 
                        variants={backdropVariants}
                        transition={expandTransition}
                    />
                    {active === "login" && (
                        <HeaderContainer>
                            <HeaderText>Welcome</HeaderText>
                            <SmallText>Please login to continue</SmallText>
                        </HeaderContainer>
                    )}
                    {active === "signup" && (
                        <HeaderContainer>
                            <HeaderText>Create Account</HeaderText>
                            <SmallText>Please sign up to continue</SmallText>
                        </HeaderContainer>
                    )}
                </TopContainer>
                <FormContainer>
                    {active === "login" && <LoginForm />}
                    {active === "signup" && <SignupForm />}
                </FormContainer>
            </BoxContainer>
        </AccountContext.Provider>
    );
}