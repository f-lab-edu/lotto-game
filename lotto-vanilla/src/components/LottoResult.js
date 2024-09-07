import LottoShop from "../services/LottoShop";
import { shallowEqual } from "../utils";

export default function LottoResult({
  app,
  initialState,
  onClickClose,
  onClickReset,
}) {
  this.state = initialState;
  this.component = document.createElement("div");
  this.component.id = "lotto-result-component";
  app.appendChild(this.component);

  this.template = () => {
    const lottoShop = LottoShop.getInstance()

    return this.state.myLotto.length === 0 ? '' : `
      <div class="result-body">
        <div class="close-modal">
          <button id="close-btn" type="button">x</button>
        </div>
        <h2>🏆 당첨 통계 🏆</h2>
        <div class="detail">
          <table>
            <thead>
              <th>일치 개수</th>
              <th>당첨금</th>
              <th>당첨 개수</th>
            </thead>
            <tbody>
              <td>3개</td>
              <td>5,000원</td>
              <td>${lottoShop.lottoResult.count[3]}개</td>
            </tbody>
            <tbody>
              <td>4개</td>
              <td>50,000원</td>
              <td>${lottoShop.lottoResult.count[4]}개</td>
            </tbody>
            <tbody>
              <td>5개</td>
              <td>1,500,000원</td>
              <td>${lottoShop.lottoResult.count[5]}개</td>
            </tbody>
            <tbody>
              <td>5개 + 보너스볼	</td>
              <td>30,000,000원</td>
              <td>${lottoShop.lottoResult.count['5bonus']}개</td>
            </tbody>
            <tbody>
              <td>6개</td>
              <td>2,000,000,000	원</td>
              <td>${lottoShop.lottoResult.count[6]}개</td>
            </tbody>
          </table>
          <span class="rate-of-return">당신의 총 수익률은 ${lottoShop.rateOfReturn}% 입니다.</span>
        </div>
        <div class="reset">
          <button id="reset-btn" type="button">다시 시작하기</button>
        </div>
      </div>
    `;
  };

  this.render = () => {
    this.component.innerHTML = this.template();

    if(this.component.innerHTML === '') {
      return
    }

    this.component.classList.toggle('open')

    const closeBtn = document.getElementById("close-btn");
    const resetBtn = document.getElementById("reset-btn");

    closeBtn.addEventListener("click", () => {
      onClickClose();
      this.component.classList.toggle('open')
    });

    resetBtn.addEventListener("click", () => {
      onClickReset();
      this.component.classList.toggle('open')
    });
  };

  this.setState = (newState) => {
    if (shallowEqual(this.state, newState)) {
      return;
    }

    this.state = {
      ...this.state,
      ...newState,
    };

    this.render();
  };

  this.render();
}
