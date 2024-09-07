import { shallowEqual } from "../utils";

export default function LottoInput({ app, initialState, onClick }) {
  this.state = initialState;
  this.onClick = onClick;
  this.component = document.createElement("div");
  this.component.id = "lotto-input-component";

  app.appendChild(this.component);

  this.template = () => {
    return !this.state.ticket ? '' : `
      <span class="lotto_input_desc">지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</span>
      <div class="lotto-input-box">
        <div class="input-set">
          <span>당첨 번호</span>
          <div>
            <input class="lotto-input" type="number" min="1" max="45" />
            <input class="lotto-input" type="number" min="1" max="45" />
            <input class="lotto-input" type="number" min="1" max="45" />
            <input class="lotto-input" type="number" min="1" max="45" />
            <input class="lotto-input" type="number" min="1" max="45" />
            <input class="lotto-input" type="number" min="1" max="45" />
          </div>
        </div>
        <div class="input-set">
          <span>보너스 번호</span>
          <div>
            <input class="lotto-input" type="number" min="1" max="45" />
          </div>
        </div>
      </div>
      <button id="lotto-input-btn">결과 확인하기</button>
    `
  };

  this.render = () => {
    this.component.innerHTML = this.template();

    if(this.component.innerHTML === '') {
      return
    }

    const lottoInputBtn = document.getElementById("lotto-input-btn");

    lottoInputBtn.addEventListener("click", () => {
      const inputs = document.querySelectorAll(".lotto-input");

      const myLotto = [];

      inputs.forEach((el) => {
        myLotto.push(Number(el.value));
      });

      onClick(myLotto);
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
