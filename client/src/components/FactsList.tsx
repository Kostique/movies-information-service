import React from 'react';
import { IFacts } from '../models/IMovieItem';
interface IFact {
  facts: IFacts[];
}

export default function FactsList({ facts }: IFact) {
  return (
    <div className="movie-item__facts">
      <h4>Интересные факты</h4>
      <div className="facts-list">
        {facts?.map((item, index) => {
          const url = /(<a \w*=".\w*.\d*." \w*="\w*">|<.a>)/gm;
          const cleaner = /&(\w+|#\d+);/gm;
          const fact = item.value.replace(url, '');

          if (!item.spoiler) {
            return (
              <div className="item-fact" key={index}>
                <span className="fact-number">{index + 1}.</span> {fact.replace(cleaner, ' ')}
              </div>
            );
          } else if (item.spoiler) {
            return (
              <div className="item-fact" key={index}>
                <span className="fact-number">{index + 1}.</span>
                <span
                  onClick={(e) => e.currentTarget.classList.remove('spoiler')}
                  className="blur-text spoiler">
                  {fact.replace(cleaner, ' ')}
                </span>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
