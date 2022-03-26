import React, { useState } from "react";
import "./App.css";
import Calculator from "./components/Calculator";
import InfoForm from "./components/InfoForm";
import RangeInput from "./components/RangeInput";
import DonutChart from "./components/charts/DonutChart";
import SimpleBarChart from "./components/charts/SimpleBarChart";
import StackedBarChart from "./components/charts/StackedBarChart";
import SimpleLineChart from "./components/charts/SimpleLineChart";
import TimeSlider from "./components/TimeSlider";
import TimePeriod from "./components/TimePeriod";

const calculateInterestOverYear = (principal, rate) => {
  return principal * rate;
};

const calculateTotalRetirementWithMonthlyContribution = (
  investmentYears,
  monthlyContribution,
  deposit,
  rate
) => {
  const annualContribution = monthlyContribution * 12;
  const initialInvestment = Number(deposit) + Number(annualContribution);
  let incrementalAssets = [];
  for (let i = 0; i < investmentYears; i++) {
    const previousIncrement = incrementalAssets[i - 1];
    let principal, interest, total;
    if (i === 0) {
      principal = deposit + annualContribution;
      interest = deposit * rate;
      total = principal + interest;
    } else {
      principal = previousIncrement.principal + annualContribution;
      interest = calculateInterestOverYear(previousIncrement.total, rate);
      total = previousIncrement.total + annualContribution + interest;
    }
    const newIncrement = {
      principal: Math.round(principal),
      interest: Math.round(interest),
      total: Math.round(total),
    };
    incrementalAssets = [...incrementalAssets, newIncrement];
  }
  return incrementalAssets;
};

function App() {
  const [userValues, setUserValues] = useState({
    age: 30,
    retirementTarget: 67,
    deposit: 100,
    monthlyContribution: 200,
    rate: 0.08,
  });
  const [timeRangeValues, setTimeRangeValues] = useState([
    { start: userValues.age, end: userValues.retirementTarget, period: 1 },
  ]);
  const investmentYears = userValues.retirementTarget - userValues.age;

  const financialData = calculateTotalRetirementWithMonthlyContribution(
    investmentYears,
    userValues.monthlyContribution,
    userValues.deposit,
    userValues.rate
  );

  const timeScale = Array.from(
    { length: investmentYears },
    (v, i) => new Date().getFullYear() + i
  );

  const handleSubmitUserValueForm = (formValues) => setUserValues(formValues);

  // MOVE THIS TO CHANGE STATE WITHIN COMPONENT AND THEN SUBMIT AFTER CLICKING OFF AN INPUT TO THIS STATE
  const handleTimeRangeChange = (e) => {
    // COULD USE DEFAULTVALUE INSTEAD OF PLACEHOLDERS
    // Set the targeted value
    // Then set the subsequent values that need to be adjusted
    const { name, value, placeholder } = e.target;
    console.log("name", name);
    console.log("value", value);
    console.log("defaultValue", placeholder);
    const targetRange = timeRangeValues.findIndex(
      (r) => r[name] === Number(placeholder)
    );
    const cloneArr = timeRangeValues.slice();
    if (name === "start") {
      if (value < userValues.age) {
        return;
      }
      cloneArr[targetRange][name] = Number(value);
    }
    if (name === "end") {
      if (value > userValues.retirementTarget) {
        return;
      }
      if (cloneArr.length > 1) {
        cloneArr[targetRange + 1].start = Number(value) + 1;
      }
      cloneArr[targetRange][name] = Number(value);
    }
    setTimeRangeValues(cloneArr);
  };

  const addTimeRange = (e) => {
    const previousLastRange = timeRangeValues[timeRangeValues.length - 1];
    const currentRange = previousLastRange.end - previousLastRange.start;
    const newRange = currentRange / 2;
    const newEnd = Math.floor(previousLastRange.start + newRange);
    const newStart = Math.floor(previousLastRange.start + newRange + 1);
    const newTimeRangeValues = [
      ...(timeRangeValues.length === 1
        ? []
        : timeRangeValues.slice(0, timeRangeValues.length - 1)),
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
    return setTimeRangeValues(newTimeRangeValues);
  };
  const removeTimeRange = (e) => {
    if (timeRangeValues.length === 2) {
      return setTimeRangeValues([
        { start: userValues.age, end: userValues.retirementTarget, period: 1 },
      ]);
    }
    const previousLastRange = timeRangeValues[timeRangeValues.length - 2];
    const currentRange = previousLastRange.end - previousLastRange.start;
    const newTimeRangeValues = [
      ...timeRangeValues.slice(0, timeRangeValues.length - 2),
      {
        start: previousLastRange.start,
        end: userValues.retirementTarget,
        period: previousLastRange.period,
      },
    ];
    return setTimeRangeValues(newTimeRangeValues);
  };

  const lastTimeRangeValue = timeRangeValues[timeRangeValues.length - 1];
  const lastTimeRange = lastTimeRangeValue.end - lastTimeRangeValue.start;
  const shouldShowAddTimeRangeButton = Boolean(lastTimeRange > 1);
  const shouldShowRemoveTimeRangeButton = Boolean(timeRangeValues.length > 1);

  console.log("timeranges", timeRangeValues);
  console.log("LATEST USER VALUES", userValues);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <InfoForm
          userValues={userValues}
          handleSubmit={handleSubmitUserValueForm}
        />
        {shouldShowAddTimeRangeButton && (
          <button onClick={addTimeRange}>Add Time Period </button>
        )}
        {shouldShowRemoveTimeRangeButton && (
          <button onClick={removeTimeRange}> Remove Time Period</button>
        )}
        ____
        {timeRangeValues.map((r) => (
          <TimePeriod
            start={r.start}
            end={r.end}
            period={r.period}
            userValues={userValues}
            handleChange={handleTimeRangeChange}
          />
        ))}
      </div>
      <div style={{ flex: 1 }}>
        <div>Final: {financialData[financialData.length - 1]?.total}</div>
        {!!financialData.length && (
          <div>
            <StackedBarChart data={financialData} time={timeScale} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
