import { MAX_LOTTO_NUMBER, MIN_LOTTO_NUMBER } from "../constants";

export default class Lotto {
  #lotto;
  constructor(lotto, type = 'admin') {
    if((
      type === 'admin' ? lotto.length !== 6 : lotto.length !== 7 ||
      lotto.some((num) => num < MIN_LOTTO_NUMBER || num > MAX_LOTTO_NUMBER)) || 
      lotto.some((num) => typeof num !== "number")
    ) {
      throw Error(`${MIN_LOTTO_NUMBER} ~ ${MAX_LOTTO_NUMBER}의 숫자를 입력해 주세요.`)
    }
    if (new Set([...lotto]).size !== lotto.length) {
      throw Error("중복된 숫자는 안됩니다.");
    }

    this.#lotto = lotto;
  }

  get lotto() {
    return [...this.#lotto];
  }
}
