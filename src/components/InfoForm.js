import React, { useState } from "react";
import styled from "styled-components";
import Input from "./forms/Input";

const FormWrapper = styled.div`
  background: #d9e8e0;
  margin: 25px 25px;
`;
const Form = styled.form``;
const InputWrapper = styled.div``;
const Label = styled.label``;

const InfoForm = ({ userValues, handleSubmit }) => {
  const [newUserValues, setNewUserValues] = useState(userValues);
  const handleChange = (event) => {
    setNewUserValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const validateChange = (e) => {
    const { name, value } = e.target;
    let formErrors = [];
    switch (name) {
      case "age":
        if (value >= retirementTarget || value <= 0) {
          formErrors.push(name);
        }
        break;
      case "retirementTarget":
        if (value <= age || value > 150) {
          formErrors.push(name);
        }
        break;
      case "deposit":
        if (value > 1000000 || value < 0) {
          formErrors.push(name);
        }
        break;
    }
    e.target.blur();
    if (formErrors.length) {
      e.target.style.borderColor = "red";
      e.target.nextSibling.style.borderColor = "red";
    } else {
      e.target.style.borderColor = "black";
      e.target.nextSibling.style.borderColor = "black";
      e.preventDefault();
      handleSubmit(newUserValues);
    }
  };

  const onEnter = (e) => {
    if (e.keyCode === 13) {
      handleChange(e);
      validateChange(e);
    }
  };
  const { age, retirementTarget, deposit, monthlyContribution, rate } =
    newUserValues;
  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <Input
          label={"Current Age"}
          type="text"
          value={age}
          name="age"
          unit="years"
          onChange={handleChange}
          onBlur={validateChange}
          onKeyDown={onEnter}
        />
        <Input
          label={"Retirement Age"}
          type="text"
          value={retirementTarget}
          name="retirementTarget"
          unit="years"
          onChange={handleChange}
          onBlur={validateChange}
          onKeyDown={onEnter}
        />
        <Input
          label={"Current Investments"}
          unit={"$"}
          type="text"
          value={deposit}
          name="deposit"
          onChange={handleChange}
          onBlur={validateChange}
          onKeyDown={onEnter}
        />
      </form>
    </FormWrapper>
  );
};

export default InfoForm;
