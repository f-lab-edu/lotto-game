import Lotto from "./Lotto";
import ExchangeOffice from "./ExchangeOffice";
import { calculateLottoResult, generateLotto, rateOfReturn } from "../utils";

class LottoShop {
  #coin;
  #ticket;
  #lottoList;
  #myLotto;
  #lottoResult;
  #rateOfReturn;

  static getInstance(coin) {
    if (!LottoShop.instance) {
      LottoShop.instance = new LottoShop(coin);
    }
    return LottoShop.instance;
  }

  setLottoList() {
    return Array.from({ length: this.#ticket }, () => {
      const lotto = generateLotto();

      const adminLotto = new Lotto(lotto);

      return adminLotto.lotto;
    });
  }

  get coin() {
    return this.#coin;
  }

  set coin(coin) {
    const exchangeOffice = new ExchangeOffice(Number(coin));

    this.#coin = exchangeOffice.coin;
    this.#ticket = exchangeOffice.ticket;
    this.#lottoList = this.setLottoList();
  }

  get ticket() {
    return this.#ticket;
  }

  get lottoList() {
    return [...this.#lottoList];
  }

  get myLotto() {
    return [...this.#myLotto];
  }

  set myLotto(numbers) {
    if(this.#lottoList.length ===0) {
      throw Error('먼저 로또를 생성해 주세요.')
    }
    const lotto = new Lotto(numbers, "user");

    this.#myLotto = lotto.lotto;

    this.#lottoResult = calculateLottoResult(this.#lottoList, this.#myLotto)
    this.#rateOfReturn = rateOfReturn(this.#coin, this.#lottoResult.totalPrice)
  }

  get lottoResult() {
    return this.#lottoResult
  }

  get rateOfReturn() {
    return this.#rateOfReturn
  }


  reset() {
    this.#coin = null;
    this.#ticket = 0;
    this.#lottoList = [];
    this.#myLotto = [];
  }

  result() {
    return "false";
  }
}

export default LottoShop;
