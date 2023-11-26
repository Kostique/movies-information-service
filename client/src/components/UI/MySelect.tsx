import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import "../../styles/UIStyles/MySelect.scss";
import SVGSelector from "../../svg/SvgSelector";
interface MySelect {
  caption?: string;
  id?: string;
  options: options[];
  defaultVal: string;
  style?: Object;
  onChange: (e: string) => any;
}

interface options {
  body: string;
  value: string;
}

export const MySelect = ({
  style,
  options,
  defaultVal,
  onChange,
}: MySelect) => {
  const { year, country, genre, sort } = useAppSelector(
    (store) => store.FilterReducer
  );
  const { id } = useParams() as { id: string };
  const [isActive, setIsActive] = useState(false);
  const [selectedBody, setSelectedBody] = useState(defaultVal);
  const contentEl = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const clicked = (e: any) => {
    contentEl?.current?.contains(e.target) || setIsActive(false);
  };
  useEffect(() => {
    if (defaultVal) {
      options.filter((el) =>
        el.value == defaultVal ? setSelectedBody(el.body) : null
      );
    } else {
      setSelectedBody(options[0].body);
    }
  }, [defaultVal, id]);

  useEffect(() => {
    if (!isActive) {
      return;
    }
    if (isActive) {
      document.addEventListener("click", clicked);
    }
    return () => {
      document.removeEventListener("click", clicked);
    };
  }, [isActive]);

  return (
    <div ref={contentEl} className={isActive ? "select is-active" : "select"}>
      <div className="select__header" onClick={() => setIsActive(!isActive)}>
        <span className="select__current">
          {selectedBody.length > 20
            ? `${selectedBody.slice(0, 20)}...`
            : selectedBody}
        </span>
        <div className="select__icon">
          <SVGSelector id="btnIcon" />
        </div>
      </div>
      <div className="select__body" style={style}>
        {options.map((el) => (
          <div
            className="select__item"
            key={el.body}
            onClick={() => {
              setSelectedBody(el.body);
              setIsActive(false);
              dispatch(onChange(el.value));
            }}
          >
            {el.body}
          </div>
        ))}
      </div>
    </div>
  );
};
