import React, { useState } from "react";
import {
  VerticalBarSeries,
  XYPlot,
  HorizontalGridLines,
  VerticalGridLines,
  XAxis,
  YAxis,
} from "react-vis";
import "../App.css";

const Calculator = (props) => {
  const { handleChange, userValues } = props;
  const { age, retirementTarget, deposit, monthlyContribution, rate } =
    userValues;

  const compoundingFrequency = {
    annually: 1,
    monthly: 12,
    weekly: 52,
  };

  const calculateCompoundInterestOverYears = (
    principal,
    rate = 0.08,
    timeInvested = 1,
    numOfCompound = 1
  ) => {
    const amount = Math.round(
      principal *
        Math.pow(1 + rate / numOfCompound, numOfCompound * timeInvested)
    );
    const interest = Math.round(amount - principal);
    return interest;
  };

  const calculateInterestOverYear = (principal, rate) => {
    return principal * rate;
  };
  const investmentYears = retirementTarget - age;
  const calculateTotalRetirementWithMonthlyContribution = () => {
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
    console.log(JSON.stringify(incrementalAssets));
    return incrementalAssets;
  };
  return (
    <div>
      <div>Total amount at time of retirement:</div>
      <div>
        {
          calculateTotalRetirementWithMonthlyContribution()[investmentYears - 1]
            .total
        }
      </div>
    </div>
  );
};

export default Calculator;
