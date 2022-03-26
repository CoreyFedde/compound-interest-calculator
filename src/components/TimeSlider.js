import React, { Component } from "react";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import PropTypes from "prop-types";

const sliderStyle = {
  position: "relative",
  width: "100%",
};

const domain = [100, 500];
const defaultValues = [400, 150];

// *******************************************************
// RAIL
// *******************************************************
const railOuterStyle = {
  position: "absolute",
  width: "100%",
  height: 42,
  transform: "translate(0%, -50%)",
  borderRadius: 7,
  cursor: "pointer",
  // border: '1px solid white',
};

const railInnerStyle = {
  position: "absolute",
  width: "100%",
  height: 14,
  transform: "translate(0%, -50%)",
  borderRadius: 7,
  pointerEvents: "none",
  backgroundColor: "rgb(155,155,155)",
};

export function SliderRail({ getRailProps }) {
  return (
    <>
      <div style={railOuterStyle} {...getRailProps()} />
      <div style={railInnerStyle} />
    </>
  );
}

SliderRail.propTypes = {
  getRailProps: PropTypes.func.isRequired,
};

// *******************************************************
// HANDLE COMPONENT
// *******************************************************
export function Handle({
  domain: [min, max],
  handle: { id, value, percent },
  disabled,
  getHandleProps,
}) {
  return (
    <>
      <div
        style={{
          left: `${percent}%`,
          position: "absolute",
          transform: "translate(-50%, -50%)",
          WebkitTapHighlightColor: "rgba(0,0,0,0)",
          zIndex: 5,
          width: 28,
          height: 42,
          cursor: "pointer",
          // border: '1px solid white',
          backgroundColor: "none",
        }}
        {...getHandleProps(id)}
      />
      <div
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        style={{
          left: `${percent}%`,
          position: "absolute",
          transform: "translate(-50%, -50%)",
          zIndex: 2,
          width: 24,
          height: 24,
          borderRadius: "50%",
          boxShadow: "1px 1px 1px 1px rgba(0, 0, 0, 0.3)",
          backgroundColor: disabled ? "#666" : "#ffc400",
        }}
      />
    </>
  );
}

Handle.propTypes = {
  domain: PropTypes.array.isRequired,
  handle: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  getHandleProps: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

Handle.defaultProps = {
  disabled: false,
};

// *******************************************************
// KEYBOARD HANDLE COMPONENT
// Uses a button to allow keyboard events
// *******************************************************
// export function KeyboardHandle({
//   domain: [min, max],
//   handle: { id, value, percent },
//   disabled,
//   getHandleProps
// }) {
//   return (
//     <button
//       role="slider"
//       aria-valuemin={min}
//       aria-valuemax={max}
//       aria-valuenow={value}
//       style={{
//         left: `${percent}%`,
//         position: "absolute",
//         transform: "translate(-50%, -50%)",
//         zIndex: 2,
//         width: 24,
//         height: 24,
//         borderRadius: "50%",
//         boxShadow: "1px 1px 1px 1px rgba(0, 0, 0, 0.3)",
//         backgroundColor: disabled ? "#666" : "#ffc400"
//       }}
//       {...getHandleProps(id)}
//     />
//   );
// }

// KeyboardHandle.propTypes = {
//   domain: PropTypes.array.isRequired,
//   handle: PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     value: PropTypes.number.isRequired,
//     percent: PropTypes.number.isRequired
//   }).isRequired,
//   getHandleProps: PropTypes.func.isRequired,
//   disabled: PropTypes.bool
// };

// KeyboardHandle.defaultProps = {
//   disabled: false
// };

// *******************************************************
// TRACK COMPONENT
// *******************************************************
export function Track({ source, target, getTrackProps, disabled }) {
  return (
    <div
      style={{
        position: "absolute",
        transform: "translate(0%, -50%)",
        height: 14,
        zIndex: 1,
        backgroundColor: disabled ? "#999" : "#b28900",
        borderRadius: 7,
        cursor: "pointer",
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      {...getTrackProps()}
    />
  );
}

Track.propTypes = {
  source: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  target: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  getTrackProps: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

Track.defaultProps = {
  disabled: false,
};

// *******************************************************
// TICK COMPONENT
// *******************************************************
export function Tick({ tick, count, format }) {
  return (
    <div>
      <div
        style={{
          position: "absolute",
          marginTop: 14,
          width: 1,
          height: 5,
          backgroundColor: "rgb(200,200,200)",
          left: `${tick.percent}%`,
        }}
      />
      <div
        style={{
          position: "absolute",
          marginTop: 22,
          fontSize: 10,
          textAlign: "center",
          marginLeft: `${-(100 / count) / 2}%`,
          width: `${100 / count}%`,
          left: `${tick.percent}%`,
        }}
      >
        {format(tick.value)}
      </div>
    </div>
  );
}

Tick.propTypes = {
  tick: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  count: PropTypes.number.isRequired,
  format: PropTypes.func.isRequired,
};

Tick.defaultProps = {
  format: (d) => d,
};

const TimeSlider = () => {
  return (
    <div id="test">
      <Slider
        mode={1}
        step={1}
        domain={domain}
        onUpdate={() => {}}
        onChange={() => {}}
        values={defaultValues}
      >
        <Rail>
          {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
        </Rail>
        <Handles>
          {({ handles, getHandleProps }) => (
            <div className="slider-handles">
              {handles.map((handle) => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  domain={domain}
                  getHandleProps={getHandleProps}
                />
              ))}
            </div>
          )}
        </Handles>
        <Tracks left={false} right={false}>
          {({ tracks, getTrackProps }) => (
            <div className="slider-tracks" id="track">
              {tracks.map(({ id, source, target }) => (
                <Track
                  key={id}
                  source={source}
                  target={target}
                  getTrackProps={getTrackProps}
                />
              ))}
            </div>
          )}
        </Tracks>
        <Ticks count={5}>
          {({ ticks }) => (
            <div className="slider-ticks">
              {ticks.map((tick) => (
                <Tick key={tick.id} tick={tick} count={ticks.length} />
              ))}
            </div>
          )}
        </Ticks>
      </Slider>
    </div>
  );
};

export default TimeSlider;
