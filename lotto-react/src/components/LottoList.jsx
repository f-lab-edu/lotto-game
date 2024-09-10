import React, { useState } from "react";
import propTypes from "prop-types";
import { UNIT_COIN } from "../constants";

function LottoList({ coin, lottoList }) {
  const [showLotto, setShowLotto] = useState(false);

  if (coin % UNIT_COIN !== 0) {
    return "";
  }

  return (
    <>
      <div className="lotto-info-control">
        <span>{coin / UNIT_COIN}개의 로또</span>
        <div>
          <label htmlFor="viewLotto">로또 보기</label>
          <input
            type="checkbox"
            name="viewLotto"
            id="viewLotto"
            value={showLotto}
            onChange={() => setShowLotto(!showLotto)}
          />
        </div>
      </div>
      {lottoList.length > 0 &&
        lottoList.map((lotto, i) => {
          return showLotto ? (
            <div key={i}>
              <span>🎟️ </span>
              <span>{lotto.join(", ")}</span>
            </div>
          ) : (
            <span key={i}>
              <span>🎟️ </span>
            </span>
          );
        })}
    </>
  );
}

LottoList.propTypes = {
  coin: propTypes.number.isRequired,
  lottoList: propTypes.array.isRequired,
};

export default React.memo(LottoList);
