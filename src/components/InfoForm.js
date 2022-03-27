import React, { useState } from "react";
import "../App.css";

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
        if (value > 1000000) {
          formErrors.push(name);
        }
        break;
    }
    if (formErrors.length) {
      e.target.style.borderColor = "red";
      e.target.previousSibling.style.color = "red";
    } else {
      e.target.style.borderColor = "black";
      e.target.previousSibling.style.color = "black";
      e.preventDefault();
      handleSubmit(newUserValues);
      e.target.blur();
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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Current Age: </label>
        <input
          type="text"
          value={age}
          name="age"
          onChange={handleChange}
          onBlur={validateChange}
          onKeyDown={onEnter}
        />
      </div>
      <div>
        <label>Retirement Age: </label>
        <input
          type="text"
          value={retirementTarget}
          name="retirementTarget"
          onChange={handleChange}
          onBlur={validateChange}
          onKeyDown={onEnter}
        />
      </div>
      <div>
        <label>Current Investments</label>
        <input
          type="text"
          value={deposit}
          name="deposit"
          onChange={handleChange}
          onBlur={validateChange}
          onKeyDown={onEnter}
        />
      </div>
    </form>
  );
};

export default InfoForm;
