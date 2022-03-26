const calculateInterestOverYear = (principal, rate) => {
  return principal * rate;
};

export const calculateTotalRetirementWithMonthlyContribution = (
  investmentYears,
  monthlyContribution,
  deposit,
  rate,
  previousData
) => {
  const annualContribution = monthlyContribution * 12;
  let incrementalAssets = [];
  for (let i = 0; i < investmentYears; i++) {
    const previousIncrement = incrementalAssets[i - 1];
    let principal, interest, total;
    if (i === 0) {
      principal = previousData
        ? previousData.principal + annualContribution
        : deposit + annualContribution;
      interest = previousData
        ? calculateInterestOverYear(previousData.total, rate)
        : deposit * rate;
      total = previousData
        ? previousData.total + annualContribution + interest
        : principal + interest;
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
