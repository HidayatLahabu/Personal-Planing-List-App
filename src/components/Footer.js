import React from "react";

var Year = () => {
  var today = new Date();
  var todayDate = today.getFullYear();

  return (
    <div className="row mt-3">
      <div className="col-12 text-white text-center">
        © {todayDate} Created by Hidayat
      </div>
    </div>
  );
};

export default Year;
