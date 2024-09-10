import React, { useCallback, useRef } from "react";
import propTypes from "prop-types";
import {
  INPUT_RANGE_LOTTO_NUMMBER,
  INPUT_SAME_NUMBER,
  MAX_LOTTO_NUMBER,
  MIN_LOTTO_NUMBER,
} from "../constants";

function LottoInput({ inputMyLotto }) {
  const genInputsRef = useRef([]);
  const bonusInputRef = useRef(0);

  const showResult = useCallback(() => {
    const genNumbers = genInputsRef.current.map((input) => Number(input.value));
    const bonusNumber = Number(bonusInputRef.current.value);

    const totalNumber = [...genNumbers, bonusNumber];

    if (
      genNumbers.some(
        (num) => !num || num < MIN_LOTTO_NUMBER || num > MAX_LOTTO_NUMBER
      )
    ) {
      alert(INPUT_RANGE_LOTTO_NUMMBER);
      return;
    }

    if (new Set(totalNumber).size !== 7) {
      alert(INPUT_SAME_NUMBER);
      return;
    }

    inputMyLotto(totalNumber);
  }, [inputMyLotto]);

  return (
    <>
      <div className="lotto-input">
        <div className="gen-inputs">
          <span>당첨 번호</span>
          <div>
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                ref={(el) => (genInputsRef.current[index] = el)}
                type="number"
                id="genNumber"
              />
            ))}
          </div>
        </div>
        <div className="bonus-input">
          <span>보너스 번호</span>
          <div>
            <input
              ref={bonusInputRef}
              type="number"
              name="bonusNumber"
              id="bonusNumber"
            />
          </div>
        </div>
      </div>
      <button onClick={showResult}>확인하기</button>
    </>
  );
}

LottoInput.propTypes = {
  inputMyLotto: propTypes.func.isRequired,
};

export default React.memo(LottoInput);
