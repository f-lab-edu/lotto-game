// lotto.test.js
import { describe, it, expect } from "vitest";
import {
  generateLotto,
  calculateLottoResult,
  rateOfReturn,
} from "../services/lotto";
import { MAX_LOTTO_NUMBER, MIN_LOTTO_NUMBER } from "../constants";

describe("generateLotto", () => {
  it("should return an array of 6 sorted numbers", () => {
    const lotto = generateLotto();

    expect(lotto).toHaveLength(6);
    expect(lotto).toEqual([...lotto].sort((a, b) => a - b)); // 정렬 확인
    lotto.forEach((num) => {
      expect(num).toBeGreaterThanOrEqual(MIN_LOTTO_NUMBER);
      expect(num).toBeLessThanOrEqual(MAX_LOTTO_NUMBER);
    });
  });
});

describe("calculateLottoResult", () => {
  it("should calculate correct prize and counts", () => {
    const lottos = [
      [1, 2, 3, 4, 5, 6], // 6개 일치
      [1, 2, 3, 4, 5, 7], // 5개 + 보너스 일치
      [1, 2, 3, 4, 5, 8], // 5개 일치
      [1, 2, 3, 4, 9, 10], // 4개 일치
      [1, 2, 3, 11, 12, 13], // 3개 일치
      [20, 21, 22, 23, 24, 25], // 일치 없음
    ];

    const myLotto = [1, 2, 3, 4, 5, 6, 7]; // 6개 번호 + 보너스

    const result = calculateLottoResult(lottos, myLotto);

    expect(result.totalPrice).toBe(
      2_000_000_000 + 30_000_000 + 1_500_000 + 50_000 + 5_000
    );
    expect(result.winInfo[6].count).toBe(1); // 6개 일치
    expect(result.winInfo["5+"].count).toBe(1); // 5개 + 보너스 일치
    expect(result.winInfo[5].count).toBe(1); // 5개 일치
    expect(result.winInfo[4].count).toBe(1); // 4개 일치
    expect(result.winInfo[3].count).toBe(1); // 3개 일치
  });
});

describe("rateOfReturn", () => {
  it("should calculate the correct rate of return", () => {
    const totalPrice = 100000;
    const coin = 50000;

    const result = rateOfReturn(coin, totalPrice);
    expect(result).toBe(100); // 수익률 100%
  });

  it("should return a negative rate of return if total price is less than coin", () => {
    const totalPrice = 30000;
    const coin = 50000;

    const result = rateOfReturn(coin, totalPrice);
    expect(result).toBe(-40); // 수익률 -40%
  });
});
