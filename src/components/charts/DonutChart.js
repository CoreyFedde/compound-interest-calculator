import React, {useState} from 'react';
import {RadialChart, Hint} from 'react-vis'

const DonutChart = ({data}) =>  {
    const [value, setValue] = useState(false)
    const finalDataValues = data[data.length - 1]
    const finalData = [{theta: finalDataValues.interest, label: 'interest'}, {theta: finalDataValues.principal, label: 'principal'}]
    console.log('value', value)
    return (
      <RadialChart
        className={'donut-chart-example'}
        innerRadius={185}
        radius={225}
        getAngle={d => d.theta}
        data={finalData}
        onValueMouseOver={v => setValue(v)}
        onSeriesMouseOut={v => setValue(false)}
        width={500}
        height={500}
        padAngle={0.04}
        showLabels
        labelsAboveChildren={true}
      >
        {value !== false && <Hint value={value} />}
      </RadialChart>
    );
}

// const DonutChart = () =>  {
//     const [value, setValue] = useState(false)

//     return (
//       <RadialChart
//         className={'donut-chart-example'}
//         innerRadius={100}
//         radius={140}
//         getAngle={d => d.theta}
//         data={[
//           {theta: 2, className: 'custom-class'},
//           {theta: 6},
//           {theta: 2},
//           {theta: 3},
//           {theta: 1}
//         ]}
//         onValueMouseOver={v => setValue(v)}
//         onSeriesMouseOut={v => setValue(false)}
//         width={300}
//         height={300}
//         padAngle={0.04}
//       >
//         {value !== false && <Hint value={value} />}
//       </RadialChart>
//     );
// }

export default DonutChart;