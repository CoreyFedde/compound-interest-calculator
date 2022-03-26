import React, { useState } from "react";
import "../App.css";

const RangeInput = (props) => {
  const { handleChange, userValues } = props;
  const { age, retirementTarget, deposit, monthlyContribution, rate } =
    userValues;
  return (
    <div>
      <div style={{ display: "flex" }}>
        <div
          style={{ width: "100px", height: "100px", border: "1px solid black" }}
        >
          {age}
        </div>
        ------
        <div
          style={{ width: "100px", height: "100px", border: "1px solid black" }}
        >
          {retirementTarget}
        </div>
      </div>

      <label>Monthly Contribution</label>
      <input
        type="text"
        value={monthlyContribution}
        name="monthlyContribution"
        onChange={handleChange}
      />
      <label>Expected Rate of Return</label>
      <input type="text" value={rate} name="rate" onChange={handleChange} />
    </div>
  );
};

export default RangeInput;
