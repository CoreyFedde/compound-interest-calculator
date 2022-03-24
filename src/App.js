import React, { useState } from 'react'
import './App.css';
import Calculator from './components/Calculator'
import InfoForm from './components/InfoForm';
import RangeInput from './components/RangeInput';
import DonutChart from './components/charts/DonutChart';
import SimpleBarChart from './components/charts/SimpleBarChart';
import StackedBarChart from './components/charts/StackedBarChart';
import SimpleLineChart from './components/charts/SimpleLineChart';
import TimeSlider from './components/TimeSlider';

const calculateInterestOverYear = (principal, rate) => {
  return principal * rate;
}

const calculateTotalRetirementWithMonthlyContribution = (investmentYears, monthlyContribution, deposit, rate) => {
  const annualContribution = monthlyContribution * 12;
  const initialInvestment = Number(deposit) + Number(annualContribution);
  let incrementalAssets = [];
  for (let i = 0; i < investmentYears; i++) {
      const previousIncrement = incrementalAssets[i - 1];
      let principal, interest, total;
      if (i===0) {
              principal = deposit + annualContribution;
              interest = deposit * rate;
              total = principal + interest;
      } else {
          principal = previousIncrement.principal + annualContribution;
          interest = calculateInterestOverYear(previousIncrement.total, rate);
          total = previousIncrement.total + annualContribution + interest
      }
      const newIncrement = {
          principal: Math.round(principal),
          interest: Math.round(interest),
          total: Math.round(total)
      }
      incrementalAssets = [...incrementalAssets, newIncrement];
  }
  return incrementalAssets;
}

function App() {
  const [userValues, setUserValues] = useState({
      age: 30,
      retirementTarget: 67,
      deposit: 100,
      monthlyContribution: 200,
      rate: .08,
  })
  const investmentYears = userValues.retirementTarget - userValues.age;

  const financialData = calculateTotalRetirementWithMonthlyContribution(investmentYears, userValues.monthlyContribution, userValues.deposit, userValues.rate);

  const timeScale = Array.from({length: investmentYears}, (v, i) => new Date().getFullYear() + i)

const handleChange = (event) => {
  setUserValues((values) => ({
    ...values,
    [event.target.name]: Number(event.target.value),
  }));
}

  return (
    <div style={{display: 'flex'}}>
      <div style={{flex: 1}}>
        <InfoForm userValues={userValues} handleChange={handleChange}/>
      </div>
      <div style={{flex: 1}}>
        <div>Final: {financialData[financialData.length - 1]?.total}</div>
        <DonutChart data={financialData} />
        <StackedBarChart data={financialData} time={timeScale}/>
        <SimpleLineChart data={financialData} time={timeScale} />
      </div>
    </div>
  );
}

export default App;
