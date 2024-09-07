import { MAX_COIN, MIN_COIN, UNIT_COIN } from "../constants";

export default class ExchangeOffice {
  #coin;
  #ticket;

  constructor(coin) {
    if (typeof coin !== "number" || !coin || coin < 1) {
      throw Error("금액(숫자)을 입력해 주세요.");
    }
    if (coin > MAX_COIN) {
      throw Error("100,000원 이하로 넣어주세요");
    }
    if (coin % MIN_COIN !== 0) {
      throw Error("1,000원 단위로 넣어주세요");
    }

    this.#coin = coin;
    this.#ticket = Number(coin / UNIT_COIN);
  }

  get coin() {
    return this.#coin;
  }

  get ticket() {
    return this.#ticket;
  }
}
