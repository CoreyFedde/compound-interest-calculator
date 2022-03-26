import React, { useState } from "react";
import "../App.css";

const RangeInput = ({
  start,
  end,
  period,
  handleChange,
  validateChange,
  onEnter,
  disableStart,
  disableEnd,
  rate,
  monthlyContribution,
}) => {
  // const { age, retirementTarget, deposit, monthlyContribution, rate } =
  //   userValues;
  // console.log('userValues', userValues)
  return (
    <div style={{ margin: "15px auto 25px" }}>
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          <div>Period {period}</div>{" "}
          <input
            data-index={period}
            id={`start-${period}`}
            type="text"
            value={start}
            name="start"
            onChange={handleChange}
            onBlur={validateChange}
            onKeyDown={onEnter}
            disabled={disableStart}
          />{" "}
          -{" "}
          <input
            data-index={period}
            id={`end-${period}`}
            type="text"
            value={end}
            name="end"
            onChange={handleChange}
            onBlur={validateChange}
            onKeyDown={onEnter}
            disabled={disableEnd}
          />
        </div>
      </div>
      <div>
        <label>Monthly Contribution</label>
        <input
          type="text"
          value={monthlyContribution}
          name="monthlyContribution"
          onChange={handleChange}
          onBlur={validateChange}
          onKeyDown={onEnter}
          data-index={period}
        />
      </div>
      <div>
        <label>Expected Rate of Return</label>
        <input
          type="text"
          value={rate}
          name="rate"
          onChange={handleChange}
          onBlur={validateChange}
          onKeyDown={onEnter}
          data-index={period}
        />
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
