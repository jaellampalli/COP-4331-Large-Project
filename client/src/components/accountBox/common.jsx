/* This file is related common components between both forms */
import styled from "styled-components";

export const BoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 11px;
  color: black;
  text-align: left;
`;

export const ResultMessage = styled.span`
  font-size: 11px;
  color: #2cb2ff;
  text-align: center;
  margin-bottom: 5px;
`;

export const ErrorMessage = styled.span`
  font-size: 11px;
  color: red;
  text-align: left;
  margin-bottom: 6px;
  display: none;
`;

export const AltPrompt = styled.div`
  font-size: 11px;
  color: rgba(200, 200, 200, 1);
  font-weight: 500;
  margin-bottom: 10px;
`;

export const ColorLink = styled.a`
  font-size: 11px;
  color: #2cb2ff;
  font-weight: bold;
  text-decoration: none;
  margin: 0 10px;
  cursor: pointer;
`;

export const Input = styled.input`
  width: 100%;
  height: 42px;
  outline: none;
  border: 1px solid rgba(200, 200, 200, 0.3);
  padding: 0px 10px;
  margin-bottom: 15px;
  border-bottom: 1.4px solid transparent;
  box-shadow: 0px 0px 2.5px rgba(15, 15, 15, 0.19);
  transition: all 200ms ease-in-out;
  font-size: 12px;
  &::placeholder {
    color: rgba(200, 200, 200, 1);
  }
  &:not(:last-of-type) {
    border-bottom: 1.5px solid rgba(200, 200, 200, 0.4);
  }
  &:focus {
    outline: none;
    border-bottom: 2px solid black;
  }
  &:invalid ~ span {
    display: block;
  }
  &:invalid {
    border-bottom: 2px solid red;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 12px 25px;
  margin-top: 15px;
  margin-bottom: 8px;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border-radius: 100px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
  background: rgb(241, 196, 15);
  background: linear-gradient(180deg, rgba(0,0,0,1) 70%, rgba(60,57,57,1) 100%);
  
  &:hover {
    filter: brightness(1.03);
    transform: scale(1.01);
  }
`;