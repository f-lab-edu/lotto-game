import { MAX_LOTTO_NUMBER, MIN_LOTTO_NUMBER } from "./constants";

const generateLotto = () => {
  const lottoNumbers = Array.from({ length: MAX_LOTTO_NUMBER }).map(
    (_, i) => i + MIN_LOTTO_NUMBER
  );

  const lotto = lottoNumbers
    .sort(() => Math.random() - 0.5)
    .slice(0, 6)
    .sort((a, b) => a - b);

  return lotto;
};

const shallowEqual = (objA, objB) => {
  if (Object.is(objA, objB)) {
    return true;
  }

  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (let i = 0; i < keysA.length; i++) {
    const currentKey = keysA[i];
    if (
      !hasOwnProperty.call(objB, currentKey) ||
      !Object.is(objA[currentKey], objB[currentKey])
    ) {
      return false;
    }
  }

  return true;
};

const rateOfReturn = (coin, totalPrice) => {
  return ((totalPrice - coin) / coin) * 100;
};

const _prizeMoney = {
  6: 2_000_000_000,
  "5bonus": 30_000_000,
  5: 1_500_000,
  4: 50_000,
  3: 5_000,
};

const calculateLottoResult = (lottos, myLotto) => {
  const genLotto = myLotto.slice(0, 6);
  const bonus = myLotto[6];

  return lottos.reduce(
    (acc, cur) => {
      const matchLength = cur.filter((num) => genLotto.includes(num)).length;
      const isBonus = cur.includes(bonus);

      if (matchLength === 5) {
        if (isBonus) {
          acc.totalPrice += _prizeMoney["5bonus"];
          acc.count["5bonus"] += 1;
        } else {
          acc.totalPrice += _prizeMoney[matchLength];
          acc.count[matchLength] += 1;
        }
      }

      if ([3, 4, 6].includes(matchLength)) {
        acc.totalPrice += _prizeMoney[matchLength];

        acc.count[matchLength] += 1;
      }

      return acc;
    },
    {
      totalPrice: 0,
      count: {
        3: 0,
        4: 0,
        5: 0,
        "5bonus": 0,
        6: 0,
      },
    }
  );
};

export { generateLotto, shallowEqual, rateOfReturn, calculateLottoResult };
