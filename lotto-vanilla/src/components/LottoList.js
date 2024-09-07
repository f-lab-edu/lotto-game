import { shallowEqual } from "../utils";

export default function LottoList({ app, initialState }) {
  this.state = initialState;

  this.component = document.createElement("div");
  this.component.id = "lotto-list-component";
  app.appendChild(this.component);

  this.template = () => {
    let template =
      !this.state.ticket || this.state.lottoList.length === 0
        ? ""
        : `
      <div class="info">
        <span>총 ${this.state.ticket}개를 구매했습니다.</span>
        <div>
          <label for="lotto-list__checkbox">번호 보기</label>
          <input id="lotto-list__checkbox" type="checkbox" />
        </div>
      </div>
      <div class="detail">
        ${this.state.lottoList
          .map((list) => {
            return `
              <div class="items">
                <span class="item__icon">🎟️</span>
                <span class="item__number">${list.join(", ")}</span>
              </div>
            `;
          })
          .join("")}
      </div>
    `;

    return template;
  };

  this.render = () => {
    this.component.innerHTML = this.template();

    if(this.component.innerHTML === '') {
      return
    }

    const checkbox = document.getElementById("lotto-list__checkbox");
    const detail = document.querySelector(".detail");
    const itemNumber = document.querySelectorAll(".item__number");
    checkbox.addEventListener("click", (e) => {
      detail.classList.toggle("show");
      itemNumber.forEach((el) => {
        el.classList.toggle("show");
      });
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
