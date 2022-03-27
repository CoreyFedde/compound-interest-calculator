import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./App.css";
import InfoForm from "./components/InfoForm";
import StackedBarChart from "./components/charts/StackedBarChart";
import TimeRangeForm from "./components/TimeRangeForm";
import { calculateTotalRetirementWithMonthlyContribution } from "./calculations/calcHelper";

const TitleWrapper = styled.div`
  width: 100%;
  background: #3d405b;
`;
const Title = styled.h1`
  font-size: 50px;
  color: white;
  text-align: center;
  margin: 0;
`;
const FormWrapper = styled.div`
  flex: 1;
`;
const DataWrapper = styled.div`
  flex: 1;
`;
const AppWrapper = styled.div`
  display: flex;
  background: #f4f1de;
`;

const Balance = styled.h2`
  font-size: 35px;
  text-align: center;
`;

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
  }, [timeRangeValues, userValues]);

  const timeScale = Array.from(
    { length: investmentYears },
    (v, i) => new Date().getFullYear() + i
  );

  const handleSubmitUserValueForm = (formValues) => setUserValues(formValues);
  const handleSubmitTimeRangeValuesForm = (formValues) =>
    setTimeRangeValues(formValues);

  return (
    <div>
      {" "}
      <TitleWrapper>
        <Title>Compound Interest Calculator</Title>
      </TitleWrapper>
      <AppWrapper>
        <FormWrapper>
          <InfoForm
            userValues={userValues}
            handleSubmit={handleSubmitUserValueForm}
          />
          <TimeRangeForm
            userValues={userValues}
            timeRangeValues={timeRangeValues}
            handleSubmit={handleSubmitTimeRangeValuesForm}
          />
        </FormWrapper>
        <DataWrapper>
          <Balance>
            Final Balance: $
            {financialData[financialData.length - 1]?.total.toLocaleString()}
          </Balance>
          {!!financialData.length && (
            <div>
              <StackedBarChart data={financialData} time={timeScale} />
            </div>
          )}
        </DataWrapper>
      </AppWrapper>
    </div>
  );
}

export default App;
