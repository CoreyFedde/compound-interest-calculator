import React, { useState } from "react";
import "../App.css";
import TimePeriod from "./TimePeriod";


const TimeRangeForm = ({ timeRangeValues, userValues, handleSubmit }) => {
    const { age, retirementTarget, deposit, monthlyContribution, rate } =
    userValues;
    const [newTimeRangeValues, setNewTimeRangeValues] = useState(JSON.parse(JSON.stringify(timeRangeValues)));
  

    const handleTimeRangeChange = (e) => {
      const { name, value, attributes } = e.target;
      const dataIndex = attributes['data-index'].value;
      const cloneArr = JSON.parse(JSON.stringify(newTimeRangeValues));
      const targetRange = cloneArr[dataIndex - 1];
      if (name === "start") {
        targetRange[name] = Number(value);
      }
      if (name === "end") {
        targetRange[name] = Number(value);
      }
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
        })
        return formErrors;
    }

    const validateChange = (e) => {
          const { name, value, attributes } = e.target;
          const dataIndex = attributes['data-index'].value;
          let formErrors = [];
          const targetRangeIndex = dataIndex - 1;
          const targetRange = newTimeRangeValues[targetRangeIndex];
          switch (name) {
            case "start":
              if (value < age || value <= 0 || value >= targetRange.end || (targetRangeIndex !== 0 && Number(value) === age)) {
                formErrors.push(name);
              }
              break;
            case "end":
              if (value > retirementTarget || value > 150 || value <= targetRange.start || (targetRangeIndex !== newTimeRangeValues.length - 1 && Number(value) === retirementTarget)) {
                formErrors.push(name);
              }
              break;
          }
          if (formErrors.length) {
            e.target.style.borderColor = "red";
          } else {
            e.target.style.borderColor = "black";
            const cloneArr = JSON.parse(JSON.stringify(newTimeRangeValues));
            // @TODO - AUTOFIX THESE FORM VALUES ACROSS THE FORM INSTEAD OF ERRORS
            if (name === "start") {
                const previousRange = cloneArr[Number(targetRangeIndex) - 1]
                if (cloneArr.length > 1 && previousRange) {
                    previousRange.end = Number(value) - 1;
                }
            } else {
                if (cloneArr.length > 1) {
                    cloneArr[targetRangeIndex + 1].start = Number(value) + 1;
                  }
            }
            setNewTimeRangeValues(cloneArr);
              if (!hasFormErrors(cloneArr)) {
                e.preventDefault();
                handleSubmit(cloneArr);
                e.target.blur();
              } else {
                  console.log("THERE BE ERRORS IN HERE")
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
    const newStart = Math.floor(previousLastRange.start + newRange + 1);
    const updatedTimeRangeValues = [
      ...(newTimeRangeValues.length === 1
        ? []
        : newTimeRangeValues.slice(0, newTimeRangeValues.length - 1)),
      {
        start: previousLastRange.start,
        end: newEnd,
        period: previousLastRange.period,
      },
      {
        start: newStart,
        end: previousLastRange.end,
        period: previousLastRange.period + 1,
      },
    ];
    return setNewTimeRangeValues(updatedTimeRangeValues);
  };
  
  const removeTimeRange = (e) => {
      e.preventDefault();
    if (newTimeRangeValues.length === 2) {
      return setNewTimeRangeValues([
        { start: age, end: retirementTarget, period: 1 },
      ]);
    }
    const previousLastRange = newTimeRangeValues[newTimeRangeValues.length - 2];
    const updatedTimeRangeValues = [
      ...newTimeRangeValues.slice(0, newTimeRangeValues.length - 2),
      {
        start: previousLastRange.start,
        end: retirementTarget,
        period: previousLastRange.period,
      },
    ];
    return setNewTimeRangeValues(updatedTimeRangeValues);
  };

  const lastTimeRangeValue = timeRangeValues[timeRangeValues.length - 1];
  const lastTimeRange = lastTimeRangeValue.end - lastTimeRangeValue.start;
  const shouldShowAddTimeRangeButton = Boolean(lastTimeRange > 1);
  const shouldShowRemoveTimeRangeButton = Boolean(newTimeRangeValues.length > 1);
  return (
      <div>
          {shouldShowAddTimeRangeButton && (
            <button onClick={addTimeRange}>Add Time Period </button>
            )}
            {shouldShowRemoveTimeRangeButton && (
            <button onClick={removeTimeRange}> Remove Time Period</button>
            )}
            ____
        <form>
        
            {newTimeRangeValues.map((r, i) => (
            <TimePeriod
                start={r.start}
                disableStart={i === 0}
                end={r.end}
                disableEnd={i === newTimeRangeValues.length - 1}
                period={r.period}
                userValues={userValues}
                handleChange={handleTimeRangeChange}
                validateChange={validateChange}
                onEnter={onEnter}
            />
            ))}
        </form>
    </div>
  );
};

export default TimeRangeForm;
