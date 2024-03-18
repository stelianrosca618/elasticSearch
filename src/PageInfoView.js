import React, { useEffect, useState } from "react"; 

export const PageInfoView = (props) => {
  console.log('pageInfor Pages', props);
  return (
    <>
      <div>
        <span className="fw-bold">Total Items:</span>
        <span className="px-2">{props.totalResults}</span>
      </div>
    </>
  )
}
