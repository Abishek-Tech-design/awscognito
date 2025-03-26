import React from "react";
import { Radio } from "antd";

const Options = ({ options, selectedOption, onOptionChange }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}><Radio.Group onChange={onOptionChange} value={selectedOption}>
      {options.map((option, index) => (
        <Radio key={index} value={option}>
          {option}
        </Radio>
      ))}
    </Radio.Group></div>

  );
};

export default Options;
