import React, { useState } from "react";
import {
  VerticalBarSeries,
  FlexibleXYPlot,
  HorizontalGridLines,
  VerticalGridLines,
  XAxis,
  YAxis,
} from "react-vis";

const StackedBarChart = ({ data, time }) => {
  const principalData = data.map((f, i) => ({ x: time[i], y: f.principal }));
  const interestData = data.map((f, i) => ({ x: time[i], y: f.interest }));
  return (
    <div>
      <FlexibleXYPlot height={500} stackBy="y">
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <VerticalBarSeries data={principalData} />
        <VerticalBarSeries data={interestData} />
      </FlexibleXYPlot>
    </div>
  );
};

export default StackedBarChart;
