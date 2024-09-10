import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import {
  INPUT_MAX_COIN,
  INPUT_UNIT_COIN,
  MAX_COIN,
  UNIT_COIN,
} from "./constants";
import { generateLotto } from "./services/lotto";

import CoinInput from "./components/CoinInput";
import LottoList from "./components/LottoList";
import Header from "./components/Header";
import LottoInput from "./components/LottoInput";
import ResultModal from "./components/ResultModal";

function App() {
  const [coin, setCoin] = useState(0);
  const [lottoList, setLottoList] = useState([]);
  const [myLotto, setMyLotto] = useState({ gen: [], bonus: 0 });
  const [showModal, setShowModal] = useState(false);

  const buyLotto = useCallback(
    (newCoin, clear) => {
      if (newCoin % UNIT_COIN !== 0) {
        alert(INPUT_UNIT_COIN);
        clear();
        return;
      }

      if (newCoin > MAX_COIN) {
        alert(INPUT_MAX_COIN);
        clear();
        return;
      }

      if (coin === newCoin) {
        return;
      }

      setCoin(newCoin);
    },
    [coin]
  );

  const inputMyLotto = (mylotto) => {
    setMyLotto(mylotto);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const reset = () => {
    setCoin(0);
    setLottoList([]);
    setMyLotto([]);
    setShowModal(false);
  };

  const isCoin = coin > 0;

  useEffect(() => {
    const lottos = [];
    for (let i = 0; i < coin / UNIT_COIN; i++) {
      lottos.push(generateLotto());
    }

    setLottoList(lottos);
  }, [coin]);

  return (
    <>
      <Header />
      <CoinInput coin={coin} buyLotto={buyLotto} />
      {isCoin && (
        <>
          <LottoList coin={coin} lottoList={lottoList} />
          <LottoInput inputMyLotto={inputMyLotto} />
        </>
      )}
      {showModal &&
        createPortal(
          <ResultModal
            coin={coin}
            lottoList={lottoList}
            myLotto={myLotto}
            onClose={closeModal}
            reset={reset}
          />,
          document.body
        )}
    </>
  );
}

export default App;
