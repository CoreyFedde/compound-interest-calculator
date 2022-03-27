import React, { useState, useEffect } from "react";
import "./App.css";
import InfoForm from "./components/InfoForm";
import StackedBarChart from "./components/charts/StackedBarChart";
import TimeRangeForm from "./components/TimeRangeForm";
import { calculateTotalRetirementWithMonthlyContribution } from "./calculations/calcHelper";

// DONT GET CONFUSED WE ARE COMPOUNDING ANNUALLY LIKE WE WOULD IN A SAVINGS ACCOUNT SO RAMSEY CALCULATOR MIGHT BE DIFF. NERDWALLET IS OFF BY A COUPLE HUNDRED ONLY
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
      rate: 8,
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

  useEffect(() => {
    let initialInvestment = userValues.deposit;
    let updatedFinancialData = [];
    timeRangeValues.forEach((r) => {
      const periodInvestmentYears = Number(r.end) - Number(r.start);
      const investmentData = calculateTotalRetirementWithMonthlyContribution(
        Number(periodInvestmentYears),
        Number(r.monthlyContribution),
        Number(initialInvestment),
        Number(r.rate),
        updatedFinancialData[updatedFinancialData.length - 1]
      );
      initialInvestment = investmentData[investmentData.length - 1].total;
      updatedFinancialData = [...updatedFinancialData, ...investmentData];
    });
    setFinancialData(updatedFinancialData);
  }, [timeRangeValues]);

  const timeScale = Array.from(
    { length: investmentYears },
    (v, i) => new Date().getFullYear() + i
  );

  const handleSubmitUserValueForm = (formValues) => setUserValues(formValues);
  const handleSubmitTimeRangeValuesForm = (formValues) =>
    setTimeRangeValues(formValues);

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
