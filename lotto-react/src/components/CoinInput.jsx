import React, { useCallback, useEffect, useRef } from "react";
import PropTypes from "prop-types";

function CoinInput({ coin, buyLotto }) {
  const inputValue = useRef(null);

  const inputValueClear = () => {
    inputValue.current.value = "";
  };

  const insertCoin = useCallback(() => {
    const coin = Number(inputValue.current.value);

    buyLotto(coin, inputValueClear);
  }, [buyLotto]);

  useEffect(() => {
    if (coin === 0) {
      inputValueClear();
    }
  }, [coin]);

  return (
    <div>
      <span>구입할 금액을 입력해주세요.</span> <br />
      <input
        type="number"
        ref={inputValue}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            insertCoin();
          }
        }}
      />
      <button onClick={insertCoin}>확인</button>
    </div>
  );
}

CoinInput.propTypes = {
  coin: PropTypes.number.isRequired,
  buyLotto: PropTypes.func.isRequired,
};

export default React.memo(CoinInput);
