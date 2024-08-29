const createTicketBuyCount = (count) => {
  return `총 ${count}개를 구매했습니다.`
}

const createTicketItems = (arr) => {
  return `
    <div class="ticket-items">
      <span class="ticket-items__icon">🎟️</span>
      <span class="ticket-items__number">${arr.join(", ")}</span>
    </div>
  `;
};

const createResultModal = (winCounts, rateOfReturn) => {
  return `
    <table>
      <thead>
        <th>일치 개수</th>
        <th>당첨금</th>
        <th>당첨 개수</th>
      </thead>
      <tbody>
        <td>3개</td>
        <td>5,000원</td>
        <td>${winCounts[3]}개</td>
      </tbody>
      <tbody>
        <td>4개</td>
        <td>50,000원</td>
        <td>${winCounts[4]}개</td>
      </tbody>
      <tbody>
        <td>5개</td>
        <td>1,500,000원</td>
        <td>${winCounts[5].noBonus}개</td>
      </tbody>
      <tbody>
        <td>5개 + 보너스볼	</td>
        <td>30,000,000원</td>
        <td>${winCounts[5].bonus}개</td>
      </tbody>
      <tbody>
        <td>6개</td>
        <td>2,000,000,000	원</td>
        <td>${winCounts[6]}개</td>
      </tbody>
    </table>
    <span class="rate-of-return">당신의 총 수익률은 ${rateOfReturn}% 입니다.</span>
  `
}

export {
  createResultModal,
  createTicketBuyCount,
  createTicketItems,
}