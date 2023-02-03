import React from "react";
import { useNavigate } from "react-router-dom";
interface selectProps {
  options: options[];
  defaultValue: string;
  value?: string;
  onChange: (value: any) => void;
}
interface options {
  value: string;
  body: string;
}

export const DropDown = ({
  options,
  defaultValue,
  value,
  onChange,
}: selectProps) => {
  return (
    <nav className="dws-menu">
      <ul>
        <li className="arrow-hover">
          <a href="#">
            <i></i>
            {defaultValue}
            <i className="arrow"></i>
          </a>
          <ul>
            {options.map((option: any) => (
              <li
                className=""
                key={option.value}
                onClick={() => onChange(option.body)}
              >
                <a href="#">{option.body}</a>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </nav>
  );
};
