import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import ReactJsAlert from "reactjs-alert";
// import { selectAllalert } from "../../features/alertSlice";

import './alert.css'

const Alert = () => {
    
  // const alert = useSelector(selectAllalert)

  return (
  <div className="alert">
    <div className="alet-symbol"></div>
    <div className="alert-exit">{alert.header}</div>
    <div className="alert-header"></div>
    <div className="alert-subheader"></div>






    {/* <button
        onClick={() => {
          setStatus(true);
          setType("warning");
          setTitle("This is a success alert");
        }}
      >
        Success Alert
      </button>
    <ReactJsAlert
        status={status} // true or false
        type={type} // success, warning, error, info
        title={title}
        // quotes={true}
        // quote="This is a dummy design that shows an example of reactjs-alert"
        Close={() => setStatus(false)}
      /> */}
  </div>
  )
};

export default Alert;
