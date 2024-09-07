export default function CoinInput({ app, onClick }) {
  this.element = document.createElement("div");
  this.element.id = "coin-input-component";
  app.appendChild(this.element);

  this.template = () => {
    const template = `
    <label for="coin-input">구입할 금액을 입력해 주세요.</label>
      <div class="coin-input-box">
        <input id="coin-input" type="number" placeholder="구입 금액" />
        <button id="coin-input-btn" type="button">확인</button>
      </div>
    `;

    return template;
  };

  this.render = () => {
    this.element.innerHTML = this.template();

    const coinInputBtn = document.getElementById("coin-input-btn");
    const coinInput = document.getElementById("coin-input");
    coinInputBtn.addEventListener("click", () => {
      onClick(coinInput.value, coinInput);
    });

    coinInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        onClick(coinInput.value, coinInput);
      }
    });
  };

  this.render();
}
