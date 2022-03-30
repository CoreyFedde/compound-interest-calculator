import React, { useState, useEffect } from "react";
import "../App.css";
import styled from "styled-components";
import TimePeriod from "./TimePeriod";

const FormWrapper = styled.div`
  background: #e6f0ea;
  margin: 25px 25px;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 28px;
`;

const Button = styled.button`
    height: 40px;
    margin: auto 15px;
    background-color: ${props => props.type === 'remove' ? '#E07A5F' : '#F2CC8F'};
    color: white;
    font-size: 18px;
    font-weight: bold;
`;

const TimeRangeForm = ({ timeRangeValues, userValues, handleSubmit }) => {
  const { age, retirementTarget, deposit, monthlyContribution, rate } =
    userValues;
  const [newTimeRangeValues, setNewTimeRangeValues] = useState(
    JSON.parse(JSON.stringify(timeRangeValues))
  );

  useEffect(() => {
    const cloneArr = JSON.parse(JSON.stringify(newTimeRangeValues));
    cloneArr[0].start = age;
    cloneArr[cloneArr.length - 1].end = retirementTarget;
    setNewTimeRangeValues(cloneArr);
  }, [age, retirementTarget]);

  useEffect(() => {
    setNewTimeRangeValues(JSON.parse(JSON.stringify(timeRangeValues)));
  }, [timeRangeValues]);

  const handleTimeRangeChange = (e) => {
    const { name, value, attributes } = e.target;
    const dataIndex = attributes["data-index"].value;
    const cloneArr = JSON.parse(JSON.stringify(newTimeRangeValues));
    const targetRange = cloneArr[dataIndex - 1];
    targetRange[name] = value;
    setNewTimeRangeValues(cloneArr);
  };

  const hasFormErrors = (arr) => {
    let formErrors = false;
    arr.forEach((r, i) => {
      const elStart = document.getElementById(`start-${i + 1}`);
      const elEnd = document.getElementById(`end-${i + 1}`);
      if (i === 0) {
        if (r.start !== age) {
          formErrors = true;
          elStart.style.borderColor = "red";
        }
        if (r.end > retirementTarget || r.end > 150 || r.end <= r.start) {
          formErrors = true;
          elEnd.style.borderColor = "red";
        }
      } else if (i === newTimeRangeValues.length - 1) {
        if (r.start < age || r.start <= 0 || r.start >= r.end) {
          formErrors = true;
          elStart.style.borderColor = "red";
        }
        if (r.end !== retirementTarget) {
          formErrors = true;
          elEnd.style.borderColor = "red";
        }
      } else {
        if (r.start < age || r.start <= 0 || r.start >= r.end) {
          formErrors = true;
          elStart.style.borderColor = "red";
        }
        if (r.end > retirementTarget || r.end > 150 || r.end <= r.start) {
          formErrors = true;
          elEnd.style.borderColor = "red";
        }
      }
    });
    return formErrors;
  };

  const validateChange = (e) => {
    const { name, value, attributes } = e.target;
    const dataIndex = attributes["data-index"].value;
    let formErrors = [];
    const targetRangeIndex = dataIndex - 1;
    const targetRange = newTimeRangeValues[targetRangeIndex];
    switch (name) {
      case "start":
        if (
          value < age ||
          value <= 0 ||
          value >= targetRange.end ||
          (targetRangeIndex !== 0 && Number(value) === age)
        ) {
          formErrors.push(name);
        }
        break;
      case "end":
        if (
          value > retirementTarget ||
          value > 150 ||
          value <= targetRange.start ||
          (targetRangeIndex !== newTimeRangeValues.length - 1 &&
            Number(value) === retirementTarget)
        ) {
          formErrors.push(name);
        }
        break;
      case "monthlyContribution":
        if (value > 1000000 || value < 0) {
          formErrors.push(name);
        }
        break;
      case "rate":
        if (value > 100 || value < 0) {
          formErrors.push(name);
        }
        break;
    }
    e.target.blur();
    if (formErrors.length) {
      e.target.style.borderColor = "red";
      if (name === "rate" || name === "monthlyContribution") {
        e.target.nextSibling.style.borderColor = "red";
      }
    } else {
      e.target.style.borderColor = "black";
      e.target.nextSibling.style.borderColor = "black";
      const cloneArr = JSON.parse(JSON.stringify(newTimeRangeValues));
      // @TODO - AUTOFIX THESE FORM VALUES ACROSS THE FORM INSTEAD OF ERRORS
      if (name === "start") {
        const previousRange = cloneArr[Number(targetRangeIndex) - 1];
        if (cloneArr.length > 1 && previousRange) {
          previousRange.end = Number(value);
        }
      } else if (name === "end") {
        if (cloneArr.length > 1) {
          cloneArr[targetRangeIndex + 1].start = Number(value);
        }
      }
      setNewTimeRangeValues(cloneArr);
      if (!hasFormErrors(cloneArr)) {
        e.preventDefault();
        handleSubmit(cloneArr);
      } else {
        console.log(
          "There are errors in the form that need to be handled before submitting"
        );
      }
    }
  };
  const onEnter = (e) => {
    if (e.keyCode === 13) {
      handleTimeRangeChange(e);
      validateChange(e);
    }
  };

  const addTimeRange = (e) => {
    e.preventDefault();
    const previousLastRange = newTimeRangeValues[newTimeRangeValues.length - 1];
    const currentRange = previousLastRange.end - previousLastRange.start;
    const newRange = currentRange / 2;
    const newEnd = Math.floor(previousLastRange.start + newRange);
    const updatedTimeRangeValues = [
      ...(newTimeRangeValues.length === 1
        ? []
        : newTimeRangeValues.slice(0, newTimeRangeValues.length - 1)),
      {
        start: previousLastRange.start,
        end: newEnd,
        period: previousLastRange.period,
        monthlyContribution: previousLastRange.monthlyContribution,
        rate: previousLastRange.rate,
      },
      {
        start: newEnd,
        end: previousLastRange.end,
        period: previousLastRange.period + 1,
        monthlyContribution: previousLastRange.monthlyContribution,
        rate: previousLastRange.rate,
      },
    ];
    handleSubmit(updatedTimeRangeValues);
  };

  const removeTimeRange = (e) => {
    e.preventDefault();
    if (newTimeRangeValues.length === 2) {
      const previousLastRange = newTimeRangeValues[0];
      const newArr = [{ ...previousLastRange, end: retirementTarget }];
      setNewTimeRangeValues(newArr);
      return handleSubmit(newArr);
    }
    const previousLastRange = newTimeRangeValues[newTimeRangeValues.length - 2];
    const updatedTimeRangeValues = [
      ...newTimeRangeValues.slice(0, newTimeRangeValues.length - 2),
      {
        start: previousLastRange.start,
        end: retirementTarget,
        period: previousLastRange.period,
        monthlyContribution: previousLastRange.monthlyContribution,
        rate: previousLastRange.rate,
      },
    ];
    handleSubmit(updatedTimeRangeValues);
  };

  const lastTimeRangeValue = timeRangeValues[timeRangeValues.length - 1];
  const lastTimeRange = lastTimeRangeValue.end - lastTimeRangeValue.start;
  const shouldShowAddTimeRangeButton = Boolean(lastTimeRange > 1);
  const shouldShowRemoveTimeRangeButton = Boolean(
    newTimeRangeValues.length > 1
  );
  //   For key, don't use r.start or r.end in key otherwise forces rerender after change
  return (
    <FormWrapper>
      <SectionTitle>Investment Periods</SectionTitle>
      <div style={{display: 'flex', justifyContent: 'end'}}>
      {shouldShowRemoveTimeRangeButton && (
            <Button onClick={removeTimeRange} type="remove"> Remove Time Period</Button>
        )}
        {shouldShowAddTimeRangeButton && (
            <Button onClick={addTimeRange} type="add">Add Time Period </Button>
        )}
      </div>
      <form>
        {newTimeRangeValues.map((r, i) => (
          <TimePeriod
            start={r.start}
            disableStart={i === 0}
            end={r.end}
            disableEnd={i === newTimeRangeValues.length - 1}
            period={r.period}
            handleChange={handleTimeRangeChange}
            validateChange={validateChange}
            onEnter={onEnter}
            {...r}
          />
        ))}
      </form>
    </FormWrapper>
  );
};

export default TimeRangeForm;
