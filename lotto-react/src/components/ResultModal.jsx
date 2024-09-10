import React from "react";
import PropTypes from "prop-types";
import { calculateLottoResult, rateOfReturn } from "../services/lotto";

function ResultModal({ coin, lottoList, myLotto, onClose, reset }) {
  const { totalPrice, winInfo } = calculateLottoResult(lottoList, myLotto);

  return (
    <div className="modal">
      <div className="info">
        <div className="close-btn">
          <button onClick={onClose}>x</button>
        </div>
        <h2>🏆 당첨 통계 🏆</h2>
        <div className="detail">
          <table>
            <thead>
              <tr>
                <th>일치 개수</th>
                <th>당첨금</th>
                <th>당첨 개수</th>
              </tr>
            </thead>
            {/* {winInfo &&
              Object.values(winInfo).map(({ price, count }, i) => {
                return (
                  <tbody key={price}>
                    <tr>
                      <td>{transIndexToName(i)}</td>
                      <td>{price.toLocaleString("ko-KR")}</td>
                      <td>{count}개</td>
                    </tr>
                  </tbody>
                );
              })} */}
            <tbody>
              <tr>
                <td>3개</td>
                <td>{winInfo[3].price}</td>
                <td>{winInfo[3].count}개</td>
              </tr>
              <tr>
                <td>4개</td>
                <td>{winInfo[4].price}</td>
                <td>{winInfo[4].count}개</td>
              </tr>
              <tr>
                <td>5개</td>
                <td>{winInfo[5].price}</td>
                <td>{winInfo[5].count}개</td>
              </tr>
              <tr>
                <td>5개 + 보너스볼</td>
                <td>{winInfo["5+"].price}</td>
                <td>{winInfo["5+"].count}개</td>
              </tr>
              <tr>
                <td>6개</td>
                <td>{winInfo[6].price}</td>
                <td>{winInfo[6].count}개</td>
              </tr>
            </tbody>
          </table>
          <span className="rate-of-return">
            당신의 총 수익률은 {rateOfReturn(coin, totalPrice)}% 입니다.
          </span>
        </div>
        <div className="reset-btn">
          <button onClick={reset}>다시 하기</button>
        </div>
      </div>
    </div>
  );
}

ResultModal.propTypes = {
  coin: PropTypes.number.isRequired,
  lottoList: PropTypes.array.isRequired,
  myLotto: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

export default React.memo(ResultModal);
