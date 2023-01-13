import React from "react";

const Button = (props) => {
  // if (props.load) {
  //   return <button>click me</button>;
  // } else {
  //   return <button>loading</button>;
  // }
  return <button>{props.load ? "click me" : "loading"}</button>;
};

Button.defaultprops = {
  warna: "red",
  load: true,
};

export default Button;
