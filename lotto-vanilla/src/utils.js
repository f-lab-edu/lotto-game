const _randomNum = (min = 1, max = 45) => {
  return Math.floor(Math.random() * max) + min;
};

const createLottoNumber = (count) => {
  const arr = [];

  for (let i = 0; i < count; i++) {
    const set = new Set();

    for (let j = 0; j < 10000; j++) {
      const lottoNum = _randomNum();
      set.add(lottoNum);
      if (set.size === 6) {
        break;
      }
    }
    arr.push([...set]);
  }

  return arr;
};

const rateOfReturn = (totalPrize, totalSpent) => {
  return ((totalPrize - totalSpent) / totalSpent) * 100;
}

const _prizeMoney = {
  6: 2_000_000_000,
  5: {
    bonus: 30_000_000,
    noBonus: 1_500_000,
  },
  4: 50_000,
  3: 5_000,
};

const calculateLottoResults = (lottoNumbers, myNumbers) => {
  const userMainNumbers = myNumbers.slice(0, 6);
  const bonusNumber = myNumbers[6];

  let totalPrize = 0;
  const winCounts = {
    6: 0,
    5: { bonus: 0, noBonus: 0 },
    4: 0,
    3: 0,
    2: 0,
    1: 0,
    0: 0,
  };

  lottoNumbers.forEach((lotto) => {
    const matchCount = lotto.filter((num) =>
      userMainNumbers.includes(num)
    ).length;

    const hasBonus = lotto.includes(bonusNumber);

    if (matchCount === 6) {
      winCounts[6]++;
      totalPrize += _prizeMoney[6];
    } else if (matchCount === 5 && hasBonus) {
      winCounts[5].bonus++;
      totalPrize += _prizeMoney[5].bonus;
    } else if (matchCount === 5) {
      winCounts[5].noBonus++;
      totalPrize += _prizeMoney[5].noBonus;
    } else if (matchCount === 4) {
      winCounts[4]++;
      totalPrize += _prizeMoney[4];
    } else if (matchCount === 3) {
      winCounts[3]++;
      totalPrize += _prizeMoney[3];
    } else {
      winCounts[matchCount]++;
    }
  });

  return { totalPrize, winCounts };
}

export {
  createLottoNumber,
  rateOfReturn,
  calculateLottoResults
}