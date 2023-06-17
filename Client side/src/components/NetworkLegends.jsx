import React from "react";

const PentagonLegend = ({ color }) => {
  return (
    <div
      style={{
        margin: 4,
        marginRight: 10,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <svg
        width="54"
        height="54"
        viewBox="0 -7 24 24"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: "scale(2)" }}
      >
        <polygon
          points="12 2.68629 16.9644 6.05114 15.3379 11.1278 9.66214 11.1278 8.03562 6.05114"
          fill={color}
        />
      </svg>
      <span style={{ color: "white", marginLeft: 15, marginTop: 6 }}>
        Africa
      </span>
    </div>
  );
};

const SquareLegend = ({ color }) => {
  return (
    <div
      style={{
        margin: 4,
        marginLeft: 10,
        marginTop: 23,
        marginRight: 10,
      }}
    >
      <svg
        style={{ marginTop: 2 }}
        width="34"
        height="34"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="24" height="24" fill={color} />
      </svg>
      <span
        style={{
          color: "white",
          marginTop: 6,
          position: "absolute",
          marginTop: 41,
          marginLeft: -40,
        }}
      >
        Oceania
      </span>
    </div>
  );
};

const CircleLegend = ({ color }) => {
  return (
    <div
      style={{
        margin: 4,
        marginTop: 27,
        marginRight: 10,
        marginLeft: 10,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <svg
        width="34"
        height="34"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12"
          cy="12"
          r="11.5"
          stroke={color}
          strokeWidth="1.5"
          fill={color}
        />
      </svg>
      <span
        style={{
          color: "white",
          marginTop: 3,
        }}
      >
        Europe
      </span>
    </div>
  );
};

const RectangleLegend = ({ color }) => {
  return (
    <div
      style={{
        margin: 4,
        marginTop: 18,
        marginRight: 10,
        marginLeft: 10,
      }}
    >
      <svg
        width="34"
        height="34"
        viewBox="0 -5 24 24"
        style={{ transform: "scale(1.5)" }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon points="2 4 22 4 22 24 2 24" fill={color} />
      </svg>
      <span
        style={{
          color: "white",
          marginTop: 46,
          marginLeft: -40,
          position: "absolute",
        }}
      >
        Americas
      </span>
    </div>
  );
};

const TriangleLegend = ({ color }) => {
  return (
    <div
      style={{
        margin: 4,
        display: "flex",
        flexDirection: "column",
        marginRight: 10,
        marginLeft: 10,
      }}
    >
      <svg
        style={{ marginTop: 2 }}
        width="54"
        height="54"
        viewBox="0 -5 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M5.5 19H18.5L12 5.5L5.5 19Z" fill={color} />
      </svg>
      <span style={{ color: "white", marginLeft: 15, marginTop: 4 }}>Asia</span>
    </div>
  );
};

export default function Legends(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        border: "1px solid",
        borderColor: props.color,
        width: "fit-content",
      }}
    >
      <PentagonLegend color={props.color} />
      <SquareLegend color={props.color} />
      <CircleLegend color={props.color} />
      <RectangleLegend color={props.color} />
      <TriangleLegend color={props.color} />
    </div>
  );
}
