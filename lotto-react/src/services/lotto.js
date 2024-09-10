import { MAX_LOTTO_NUMBER, MIN_LOTTO_NUMBER } from "../constants";

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

const calculateLottoResult = (lottos, myLotto) => {
  const genLotto = myLotto.slice(0, 6);
  const bonus = myLotto[6];

  return lottos.reduce(
    (acc, cur) => {
      const matchLength = cur.filter((num) => genLotto.includes(num)).length;
      const isBonus = cur.includes(bonus);

      if (matchLength === 5) {
        if (isBonus) {
          acc.totalPrice += acc.winInfo["5+"].price;
          acc.winInfo["5+"].count += 1;
        } else {
          acc.totalPrice += acc.winInfo[matchLength].price;
          acc.winInfo[matchLength].count += 1;
        }
      }

      if ([3, 4, 6].includes(matchLength)) {
        acc.totalPrice += acc.winInfo[matchLength].price;

        acc.winInfo[matchLength].count += 1;
      }

      return acc;
    },
    {
      totalPrice: 0,
      winInfo: {
        3: {
          price: 5_000,
          count: 0,
        },
        4: {
          price: 50_000,
          count: 0,
        },
        5: {
          price: 1_500_000,
          count: 0,
        },
        "5+": {
          price: 30_000_000,
          count: 0,
        },
        6: {
          price: 2_000_000_000,
          count: 0,
        },
      },
    }
  );
};

const rateOfReturn = (coin, totalPrice) => {
  return ((totalPrice - coin) / coin) * 100;
};

export { generateLotto, calculateLottoResult, rateOfReturn };
