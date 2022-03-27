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
  const decimalRate = Number(rate) / 100;
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
        ? calculateInterestOverYear(previousData.total, decimalRate) +
          previousData.interest
        : deposit * decimalRate;
      total = principal + interest;
    } else {
      principal = previousIncrement.principal + annualContribution;
      interest =
        calculateInterestOverYear(previousIncrement.total, decimalRate) +
        previousIncrement.interest;
      total = principal + interest;
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
