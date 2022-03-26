import React, { useState, useEffect } from "react";
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
import TimeRangeForm from "./components/TimeRangeForm";
import { calculateTotalRetirementWithMonthlyContribution } from "./calculations/calcHelper";

function App() {
  const [userValues, setUserValues] = useState({
    age: 30,
    retirementTarget: 67,
    deposit: 100,
  });
  const [timeRangeValues, setTimeRangeValues] = useState([
    {
      start: userValues.age,
      end: userValues.retirementTarget,
      period: 1,
      monthlyContribution: 200,
      rate: 0.08,
      investmentData: calculateTotalRetirementWithMonthlyContribution(
        Number(userValues.retirementTarget) - Number(userValues.age),
        200,
        userValues.deposit,
        0.08
      ),
    },
  ]);
  const [financialData, setFinancialData] = useState([]);
  const investmentYears = userValues.retirementTarget - userValues.age;

  // const financialData = calculateTotalRetirementWithMonthlyContribution(
  //   investmentYears,
  //   userValues.monthlyContribution,
  //   userValues.deposit,
  //   userValues.rate
  // );

  useEffect(() => {
    let initialInvestment = userValues.deposit;
    let updatedFinancialData = [];
    timeRangeValues.forEach((r) => {
      const periodInvestmentYears = Number(r.end) - Number(r.start);
      const investmentData = calculateTotalRetirementWithMonthlyContribution(
        periodInvestmentYears,
        r.monthlyContribution,
        initialInvestment,
        r.rate,
        updatedFinancialData[updatedFinancialData.length - 1]
      );
      initialInvestment = investmentData[investmentData.length - 1].total;
      console.log("investmentData", investmentData);
      updatedFinancialData = [...updatedFinancialData, ...investmentData];
    });
    setFinancialData(updatedFinancialData);
  }, [timeRangeValues]);

  // console.log('financialData', financialData)

  const timeScale = Array.from(
    { length: investmentYears },
    (v, i) => new Date().getFullYear() + i
  );

  const handleSubmitUserValueForm = (formValues) => setUserValues(formValues);
  const handleSubmitTimeRangeValuesForm = (formValues) =>
    setTimeRangeValues(formValues);

  // console.log(timeRangeValues);
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <InfoForm
          userValues={userValues}
          handleSubmit={handleSubmitUserValueForm}
        />
        <TimeRangeForm
          userValues={userValues}
          timeRangeValues={timeRangeValues}
          handleSubmit={handleSubmitTimeRangeValuesForm}
        />
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
