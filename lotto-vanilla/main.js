import {
  createLottoNumber,
  rateOfReturn,
  calculateLottoResults,
} from "./src/utils";
import {
  createResultModal,
  createTicketBuyCount,
  createTicketItems,
} from "./src/template";

const state = {
  count: null,
  lottoNumbers: [],
  myLottoNumbers: [],
};

// common
const amountInputEl = document.querySelector("#amount_input");
const ticketSectionEl = document.querySelector("#ticket-section");
const ticketCheckboxEl = document.querySelector("#look_number");
const lottoInputSectionEl = document.querySelector("#lotto_input_section");
const modalEl = document.querySelector("#modal");

const amountInputAfterLogic = () => {
  const ticketBuyNumberEl = document.querySelector(".ticket-buy__number");
  ticketBuyNumberEl.innerHTML = createTicketBuyCount(state.count);

  const ticketListEl = document.querySelector(".ticket-list");

  state.lottoNumbers = createLottoNumber(state.count);

  ticketListEl.innerHTML = "";
  ticketCheckboxEl.checked = false;
  state.lottoNumbers.forEach((arr) => {
    ticketListEl.innerHTML += createTicketItems(arr);
  });

  ticketSectionEl.style.display = "block";
  lottoInputSectionEl.style.display = "block";
};

// 금액 입력 후 엔터 시
amountInputEl.addEventListener("keyup", (e) => {
  if (e.key !== "Enter") {
    return;
  }
  const inputValue = Number(amountInputEl.value);

  if (inputValue === 0) {
    alert("금액을 입력해 주세요.");
    amountInputEl.focus();
    return;
  }

  if (inputValue > 100_000) {
    alert("100,000이하의 금액을 입력해 주세요.");
    amountInputEl.value = null;
    amountInputEl.focus();
    return;
  }

  if (inputValue % 1_000 > 0) {
    alert("로또 구입 금액을 1,000원 단위로 입력해 주세요.");
    amountInputEl.value = null;
    amountInputEl.focus();
    return;
  }

  state.count = inputValue / 1_000;

  if (state.count <= 0) {
    return;
  }

  amountInputAfterLogic();
});

const amountConfirmBtnEl = document.querySelector("#amount_btn");
// 금액 확인 버튼 클릭 시
amountConfirmBtnEl.addEventListener("click", () => {
  const inputValue = Number(amountInputEl.value);

  if (inputValue === 0) {
    alert("금액을 입력해 주세요.");
    amountInputEl.focus();
    return;
  }

  if (inputValue > 100_000) {
    alert("100,000이하의 금액을 입력해 주세요.");
    amountInputEl.value = null;
    amountInputEl.focus();
    return;
  }

  if (inputValue % 1_000 > 0) {
    alert("로또 구입 금액을 1,000원 단위로 입력해 주세요.");
    amountInputEl.value = null;
    amountInputEl.focus();
    return;
  }

  state.count = inputValue / 1_000;

  if (state.count <= 0) {
    return;
  }

  amountInputAfterLogic();
});

// 번호 보기 클릭 시
ticketCheckboxEl.addEventListener("click", (e) => {
  const isChecked = e.target.checked;

  const ticketListEl = document.querySelector(".ticket-list");
  const ticketNumberEls = document.querySelectorAll(".ticket-items__number");

  if (isChecked) {
    ticketListEl.style.display = "flex";
    ticketNumberEls.forEach((el) => {
      el.style.display = "inline";
    });
  } else {
    ticketListEl.style.display = "flex";
    ticketNumberEls.forEach((el) => {
      el.style.display = "none";
    });
  }
});

const lottoResultBtnEl = document.querySelector(".lotto_result_btn");

// 결과 확인하기 클릭 시
lottoResultBtnEl.addEventListener("click", () => {
  state.myLottoNumbers = [];
  const myLottoNumbers = document.querySelectorAll(".my-lotto");

  myLottoNumbers.forEach((el) => {
    state.myLottoNumbers.push(Number(el.value));
  });

  const range1to45Check = state.myLottoNumbers.every(
    (num) => num > 0 && num < 46
  );
  const isDupCheck = new Set(state.myLottoNumbers).size;

  if (!range1to45Check) {
    alert("1에서 45사이의 숫자를 입력해 주세요.");
    return;
  }

  if (isDupCheck !== 7) {
    alert("중복된 숫자는 안됩니다.");
    return;
  }

  const { totalPrize, winCounts } = calculateLottoResults(
    state.lottoNumbers,
    state.myLottoNumbers
  );

  const resultInfoEl = document.querySelector(".result-info");

  resultInfoEl.innerHTML = createResultModal(
    winCounts,
    rateOfReturn(totalPrize, state.count)
  );

  modalEl.style.display = "block";
});

const closeModalBtnEl = document.querySelector(".close-modal-btn");

// 모달 닫기 버튼 클릭 시
closeModalBtnEl.addEventListener("click", () => {
  modalEl.style.display = "none";
});

const resetBtnEl = document.querySelector(".reset-btn");

// 다시 시작하기 버튼 클릭 시
resetBtnEl.addEventListener("click", () => {
  amountInputEl.value = null;
  ticketSectionEl.style.display = "none";
  lottoInputSectionEl.style.display = "none";
  modalEl.style.display = "none";

  const myLottoNumbers = document.querySelectorAll(".my-lotto");

  myLottoNumbers.forEach((el) => {
    el.value = null
  });
});
