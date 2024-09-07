import CoinInput from "./src/components/CoinInput";
import Header from "./src/components/Header";
import LottoInput from "./src/components/LottoInput";
import LottoList from "./src/components/LottoList";
import LottoResult from "./src/components/LottoResult";
import LottoShop from "./src/services/LottoShop";
import { shallowEqual } from "./src/utils";

const initialState = {
  coin: null,
  ticket: 0,
  lottoList: [],
  myLotto: [],
};

export default function App(app) {
  this.app = app;
  this.state = initialState;

  new Header({ app });

  new CoinInput({
    app,
    onClick: (coin, input) => {
      try {
        const lottoShop = LottoShop.getInstance()

        lottoShop.coin = coin
        
        const lottoShopCoin = lottoShop.coin
        const lottoShopTicket = lottoShop.ticket
        const lottoShopLottoList = lottoShop.lottoList

        console.log(lottoShop)

        this.setState({
          coin: lottoShopCoin,
          ticket: lottoShopTicket,
          lottoList: lottoShopLottoList,
        });
      } catch (error) {
        alert(error.message);
        input.value = null;
        input.focus();
        this.setState({
          coin: initialState.coin,
          ticket: initialState.ticket,
          lottoList: initialState.lottoList,
        });
      }
    },
  });

  const lottoList = new LottoList({
    app,
    initialState: {
      ticket: this.state.ticket,
      lottoList: this.state.lottoList,
    },
  });

  const lottoInput = new LottoInput({
    app,
    initialState: {
      ticket: this.state.ticket,
    },
    onClick: (myLotto) => {
      try {
        const lottoShop = LottoShop.getInstance()
        lottoShop.myLotto = myLotto

        this.setState({
          myLotto: lottoShop.myLotto,
        });
      } catch (error) {
        alert(error.message)
      }
    },
  });

  const lottoResult = new LottoResult({
    app,
    initialState: {
      myLotto: this.state.myLotto,
    },
    onClickClose: () => {
      this.setState({
        myLotto: [],
      });
    },
    onClickReset: () => {
      this.setState(initialState);
      const lottoShop = LottoShop.getInstance()
      lottoShop.reset()

      const numberInputs = document.querySelectorAll('input[type="number"]');

      numberInputs.forEach((el) => {
        el.value = null;
      })
    },
  });

  this.setState = (newState) => {
    if (shallowEqual(this.state, newState)) {
      return;
    }

    this.state = {
      ...this.state,
      ...newState,
    };

    lottoList.setState({
      ticket: this.state.ticket,
      lottoList: this.state.lottoList,
    });

    lottoInput.setState({
      ticket: this.state.ticket,
    });

    lottoResult.setState({
      myLotto: this.state.myLotto,
    });

    console.log(this.state)
  };

  const init = () => {
    this.setState(this.state);
  };

  init();
}
