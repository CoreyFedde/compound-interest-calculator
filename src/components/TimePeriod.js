import React from "react";
import Input from "./forms/Input";
import styled from "styled-components";

const PeriodWrapper = styled.div`
  margin: 15px 25px 25px;
  display: flex;
  border: 1px solid black;
  border-radius: 4px;
`;
const PeriodNameWrapper = styled.div`
  width: 60px;
  position: relative;
  background: green;
`;
const PeriodName = styled.h3`
  white-space: nowrap;
  color: white;
  left: 50%;
  letter-spacing: 2px;
  text-transform: uppercase;
  /* Abs positioning makes it not take up vert space */
  position: absolute;
  top: 20px;
  left: 45px;

  /* Border is the new background */
  background: none;

  /* Rotate from top left corner (not default) */
  transform-origin: 0 0;
  transform: rotate(90deg);
`;
const PeriodInnerWrapper = styled.div`
  display: flex;
`;
const PeriodFinancialsWrapper = styled.div``;

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
  return (
    <PeriodWrapper>
      <PeriodNameWrapper>
        <PeriodName>Period {period}</PeriodName>
      </PeriodNameWrapper>

      <PeriodInnerWrapper>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Input
            label="Starting Age"
            unit="years"
            data-index={period}
            id={`start-${period}`}
            type="text"
            value={start}
            name="start"
            onChange={handleChange}
            onBlur={validateChange}
            onKeyDown={onEnter}
            disabled={disableStart}
          />
          <div style={{ lineHeight: "80px", fontSize: "18px" }}>to</div>
          <Input
            label="Ending Age"
            unit="years"
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
      </PeriodInnerWrapper>
      <PeriodFinancialsWrapper>
        <Input
          label="Monthly Contribution"
          unit="$"
          type="text"
          value={monthlyContribution}
          name="monthlyContribution"
          onChange={handleChange}
          onBlur={validateChange}
          onKeyDown={onEnter}
          data-index={period}
        />
        <Input
          label="Estimated Rate of Return"
          unit="%"
          type="text"
          value={rate}
          name="rate"
          onChange={handleChange}
          onBlur={validateChange}
          onKeyDown={onEnter}
          data-index={period}
        />
      </PeriodFinancialsWrapper>
    </PeriodWrapper>
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
