import React from "react";
import SVGSelector from "../../svg/SvgSelector";

interface ISpinner {
  width?: string;
  height?: string;
}

export const Spinner = ({ width = "auto", height = "auto" }: ISpinner) => {
  const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height,
    width
  };
  return (
    <div
      style={styles}
    >
      <SVGSelector id="loader" />
    </div>
  );
};
