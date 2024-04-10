import React from "react";

const CustomInput = (props) => {
  const { className,type, label, i_id, i_class } = props;
  return (
    <div class="form-floating mb-3">
      <input
  
        type={type}
        class={`form-control ${className} ${i_class}`}
        id={i_id}
        placeholder={label}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};

export default CustomInput;
