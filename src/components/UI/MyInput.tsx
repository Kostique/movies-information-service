import React from "react";

interface inputProps {
  placeholder: string;
  value: string;
  onChange: (event: string) => void;
}

const MyInput = ({ placeholder, value, onChange }: inputProps) => {
  return (
    <form action="#" className="form">
      <div className="form__custom-input">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </form>
  );
};

export default MyInput;
