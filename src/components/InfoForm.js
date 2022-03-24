import React, { useState } from 'react'
import '../App.css';

const InfoForm = (props) => {
  const {handleChange, userValues} = props;
  const {age, retirementTarget, deposit, monthlyContribution, rate} = userValues;
  return (
    <div>
      <div>
        <label>Current Age: </label><input type="text" value={age} name="age" onChange={handleChange}/>
      </div>
      <div>
        <label>Retirement Age: </label><input type="text" value={retirementTarget} name="retirementTarget" onChange={handleChange}/>
      </div>
      <div>
        <label>Current Investments</label><input type="text" value={deposit} name="deposit" onChange={handleChange}/>
      </div>
      <div>
        <label>Monthly Contribution</label><input type="text" value={monthlyContribution} name="monthlyContribution" onChange={handleChange}/>
      </div>
      <div>
      <label>Expected Rate of Return</label><input type="text" value={rate} name="rate" onChange={handleChange}/>
      </div>
    </div>
  );
}

export default InfoForm;
