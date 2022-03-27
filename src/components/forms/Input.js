import React, { useState } from "react";
import styled from "styled-components";

const InputWrapper = styled.div`
  margin: 15px 25px;
`;
const InnerInputWrapper = styled.div`
  max-width: 200px;
  display: flex;
`;
const Label = styled.label`
  display: block;
  font-size: 16px;
  margin-bottom: 5px;
`;
const StyledInput = styled.input`
  text-align: center;
  font-size: 24px;
  max-width: 140px;
  border: 1px solid black;
  border-right: ${(props) => (props.unit ? "none" : "1px solid black")};
  border-radius: ${(props) => (props.unit ? "4px 0 0 4px" : "4px")};
  ${(props) => (props.unit ? "" : "height: 40px")}
`;
const ValidationMessage = styled.p`
  font-size: 10px;
  color: orangered;
`;
const InputUnit = styled.div`
  border: 1px solid black;
  border-radius: 0 4px 4px 0;
  position: relative;
  width: 50px;
  background: lightgrey;
  height: 42px;
  &:before {
    content: "${(props) => props.text || ""}";
    font-family: SSGizmo;
    font-size: 18px;
    position: absolute;
    left: 0;
    top: 0;
    line-height: 42px;
    height: 42px;
    width: 50px;
    text-align: center;
  }
`;

const Input = ({ label, validationMessage, unit, ...rest }) => {
  return (
    <InputWrapper>
      <Label>{label}</Label>
      <InnerInputWrapper>
        <StyledInput {...rest} unit={unit} />
        {unit && <InputUnit text={unit} />}
      </InnerInputWrapper>
      <ValidationMessage>{validationMessage}</ValidationMessage>
    </InputWrapper>
  );
};

export default Input;
