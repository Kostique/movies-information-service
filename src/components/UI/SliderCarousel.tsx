import React, { Children, cloneElement, useEffect, useState } from "react";
import "../../styles/UIStyles/Carousel.scss";
import SVGSelector from "../../svg/SvgSelector";

interface CarouselProps {
  children: any;
}

export const SliderCarousel = ({ children }: CarouselProps) => {
  const [pages, setPages] = useState([]);
  const [pageWidth, setPageWidth] = useState(430);
  const [offset, setOffset] = useState(0);
  const [dot, setDot] = useState(0);

  const handleRightClick = () => {
    setOffset((currentOffset) => {
      const newOffset = currentOffset - pageWidth;
      const maxOffset = -(pageWidth * (pages.length - 1));
      if (newOffset === -(pageWidth * pages.length)) {
        return 0;
      } else {
        return Math.max(newOffset, maxOffset);
      }
    });

    setDot(() => {
      if (dot == pages.length - 1) {
        return 0;
      } else {
        return dot + 1;
      }
    });
  };

  useEffect(() => {
    return setPages(
      Children.map(children, (child) => {
        return cloneElement(child, {
          style: {
            height: "100%",
            maxWidth: `${pageWidth}px`,
            minWidth: `${pageWidth}px`,
          },
        });
      })
    );
  }, []);

  const dots = pages.map((el, index) => {
    return (
      <span
        className={dot === index ? "circle active" : "circle"}
        key={index}
      ></span>
    );
  });

  return (
    <div className="slider-container">
      <div className="window">
        <div
          className="images-container"
          style={{
            transform: `translateX(${offset}px)`,
            transition: "transform 0.3s ease-in",
          }}
        >
          {pages}
        </div>
      </div>
      <button onClick={handleRightClick} className="slider-btn">
        <SVGSelector id="btnIcon" />
      </button>
      <div className="dots">{dots}</div>
    </div>
  );
};
