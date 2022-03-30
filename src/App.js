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
  flex: 4;
`;
const DataWrapper = styled.div`
  flex: 6;
  width: 100%;
`;
const AppWrapper = styled.div`
  display: flex;
  background: #f4f1de;
  flex-wrap: wrap;
`;

const Balance = styled.h2`
  font-size: 35px;
  text-align: center;
`;

const FinancialDetail = styled.h3`
  font-size: 25px;
  text-align: center;
  color: grey;
`;

const FinancialDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const FinancialNumber = styled.span`
  font-weight: bold;
  color: black;
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
    let newTimeRangeValues = JSON.parse(JSON.stringify(timeRangeValues));
    const lastCurrentTimeRangeValue =
      newTimeRangeValues[newTimeRangeValues.length - 1];
    const retirementValue = Number(userValues.retirementTarget);
    if (retirementValue - Number(lastCurrentTimeRangeValue.start) >= 1) {
      lastCurrentTimeRangeValue.end = userValues.retirementTarget;
    } else {
      // if (secondLastCurrentTimeRangeValue && retirementValue - secondLastCurrentTimeRangeValue.start >= 2) {
      //   lastCurrentTimeRangeValue.end = retirementValue;
      //   lastCurrentTimeRangeValue.start = retirementValue - 1;
      //   secondLastCurrentTimeRangeValue.end = retirementValue - 1;
      // } else if (secondLastCurrentTimeRangeValue) {
      //   newTimeRangeValues.pop();
      //   secondLastCurrentTimeRangeValue.end = retirementValue;
      //   if (secondLastCurrentTimeRangeValue.start = retirementValue) {
      //     secondLastCurrentTimeRangeValue.start = retirementValue - 1;
      //   }
      // } else {
      //   lastCurrentTimeRangeValue.end = retirementValue;
      //   lastCurrentTimeRangeValue.start = retirementValue - 1;
      // }
      newTimeRangeValues[0].end = retirementValue;
      newTimeRangeValues = [newTimeRangeValues[0]];
    }
    setTimeRangeValues(newTimeRangeValues);
  }, [userValues.retirementTarget]);

  useEffect(() => {
    let newTimeRangeValues = JSON.parse(JSON.stringify(timeRangeValues));
    const firstTimeRangeValue = newTimeRangeValues[0];
    const newAge = Number(userValues.age);
    if (Number(firstTimeRangeValue.end) - Number(newAge) >= 1) {
      firstTimeRangeValue.start = Number(userValues.age);
    } else {
      firstTimeRangeValue.start = Number(userValues.age);
      firstTimeRangeValue.end = Number(userValues.retirementTarget);
      newTimeRangeValues = [firstTimeRangeValue];
    }
    setTimeRangeValues(newTimeRangeValues);
  }, [userValues.age]);

  useEffect(() => {
    let newTimeRangeValues = JSON.parse(JSON.stringify(timeRangeValues));
    const firstTimeRangeValue = newTimeRangeValues[0];
    firstTimeRangeValue.deposit = userValues.deposit;
    setTimeRangeValues(newTimeRangeValues);
  }, [userValues.deposit]);

  useEffect(() => {
    let initialInvestment = userValues.deposit;
    let updatedFinancialData = [];
    timeRangeValues.forEach((r) => {
      const periodInvestmentYears = Number(r.end) - Number(r.start);
      const investmentData =
        periodInvestmentYears < 1
          ? []
          : calculateTotalRetirementWithMonthlyContribution(
              Number(periodInvestmentYears),
              Number(r.monthlyContribution),
              Number(initialInvestment),
              Number(r.rate),
              updatedFinancialData[updatedFinancialData.length - 1]
            );
      initialInvestment = investmentData.length
        ? investmentData[investmentData.length - 1].total
        : 0;
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
    <div>
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
            Final Balance:
            <FinancialNumber>
              {" "}
              ${financialData[financialData.length - 1]?.total.toLocaleString()}
            </FinancialNumber>
          </Balance>
          <FinancialDetail>
            Total Principal + Contributions:
            <FinancialNumber>
              {" "}
              $
              {financialData[
                financialData.length - 1
              ]?.principal.toLocaleString()}
            </FinancialNumber>
          </FinancialDetail>
          <FinancialDetail>
            Total Interest Gained:
            <FinancialNumber>
              {" "}
              $
              {financialData[
                financialData.length - 1
              ]?.interest.toLocaleString()}
            </FinancialNumber>
          </FinancialDetail>
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
