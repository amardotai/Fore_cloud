import React from "react";

const Details = (props) => {
  return (
    <div className="details">
      <h1>{props.visibility}</h1>
      <h1>{props.humidity}</h1>
      <h1>{props.temperature}</h1>
      <h1>{props.windSpeed}</h1>
    </div>
  );
};

export default Details;
