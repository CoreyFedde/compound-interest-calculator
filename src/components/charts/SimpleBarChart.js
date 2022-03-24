import React, { useState } from 'react'
import {VerticalBarSeries, XYPlot, HorizontalGridLines, VerticalGridLines, XAxis, YAxis} from 'react-vis'

const SimpleBarChart = (props) => {
  return (
    <div>
      <XYPlot width={400} height={300}>
      <HorizontalGridLines />
    <VerticalGridLines />
        <VerticalBarSeries data={[
      {
        x: 0,
        y: 10
      },
      {
        x: 1,
        y: 11.002663072354514
      },
      {
        x: 2,
        y: 11.003967340289233
      },
      {
        x: 3,
        y: 10.921638811540106
      },
      {
        x: 4,
        y: 12.38992200354998
      },
      {
        x: 5,
        y: 10.975702158133721
      },
      {
        x: 6,
        y: 12.189543398267551
      },
      {
        x: 7,
        y: 11.399636069685425
      },
      {
        x: 8,
        y: 12.571034868610859
      }
    ]}/>
    <XAxis/>
    <YAxis />
    </XYPlot>
    </div>
  );
}

export default SimpleBarChart;
