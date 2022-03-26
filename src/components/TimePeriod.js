import React, { useState } from "react";
import "../App.css";

const RangeInput = ({ start, end, period, handleChange, userValues }) => {
  const { age, retirementTarget, deposit, monthlyContribution, rate } =
    userValues;
  return (
    <div style={{ margin: "15px auto 25px" }}>
      <div style={{ display: "flex" }}>
        <div>Period {period}</div>{" "}
        <input type="text" value={start} name="start" onChange={handleChange} />{" "}
        - <input type="text" value={end} name="end" onChange={handleChange} />
      </div>
    </div>
  );
};

{
  /* <div>
<div style={{display: 'flex'}}>
    {start} - {end}
</div>
<div>
<label>Monthly Contribution</label><input type="text" value={monthlyContribution} name="monthlyContribution" onChange={handleChange}/>
</div>
<div>
<label>Expected Rate of Return</label><input type="text" value={rate} name="rate" onChange={handleChange}/>
</div>
</div> */
}

export default RangeInput;
