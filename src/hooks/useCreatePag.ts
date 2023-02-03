interface paginationParams {
  numberOfArticles: number;
  articlesPerPage: number;
  currentPage: number;
  numberOfButtons: number;
}

const createPagination = ({
  numberOfArticles,
  articlesPerPage,
  currentPage,
  numberOfButtons,
}: paginationParams) => {
  const numberOfPages = Math.ceil(numberOfArticles / articlesPerPage);
  if (currentPage > numberOfPages || currentPage < 1)
    return {
      pagination: [],
      currentPage,
    };

  const buttons = Array(numberOfPages)
    .fill(1)
    .map((e, i) => e + i);
  const sideButtons =
    numberOfButtons % 2 === 0 ? numberOfButtons / 2 : (numberOfButtons - 1) / 2;

  const calculLeft = (rest = 0) => {
    return {
      array: buttons
        .slice(0, currentPage - 1)
        .reverse()
        .slice(0, sideButtons + rest)
        .reverse(),
      rest: function () {
        return sideButtons - this.array.length;
      },
    };
  };

  const calculRight = (rest = 0) => {
    return {
      array: buttons.slice(currentPage).slice(0, sideButtons + rest),
      rest: function () {
        return sideButtons - this.array.length;
      },
    };
  };

  const leftButtons = calculLeft(calculRight().rest()).array;
  const rightButtons = calculRight(calculLeft().rest()).array;
  const firstIndex = 1;
  const lastIndex = buttons[buttons.length - 1];
  // добавка в массивы
  if (leftButtons[0] == 2) {
    leftButtons.unshift(1);
  } else if (leftButtons[0] == 3) {
    leftButtons.unshift(1, 2);
  }
  if (
    rightButtons[rightButtons.length - 1] == lastIndex - 1 &&
    !rightButtons.includes(lastIndex)
  ) {
    rightButtons.push(lastIndex);
  } else if (
    rightButtons[rightButtons.length - 1] == lastIndex - 2 &&
    !rightButtons.includes(lastIndex - 1)
  ) {
    rightButtons.push(lastIndex - 1, lastIndex);
  }

  // 3 точки
  if (
    leftButtons[0] >= 4 &&
    rightButtons[0] <= lastIndex - rightButtons.length
  ) {
    return {
      pagination: [
        firstIndex,
        "...",
        ...leftButtons,
        currentPage,
        ...rightButtons,
        "...",
        lastIndex,
      ],
      currentPage,
    };
  } else if (rightButtons[0] < lastIndex - rightButtons.length + 1) {
    return {
      pagination: [
        ...leftButtons,
        currentPage,
        ...rightButtons,
        "...",
        lastIndex,
      ],
      currentPage,
    };
  } else if (leftButtons[0] >= 4) {
    return {
      pagination: [
        firstIndex,
        "...",
        ...leftButtons,
        currentPage,
        ...rightButtons,
      ],
      currentPage,
    };
  } else {
    return {
      pagination: [...buttons],
    };
  }
};
export default createPagination;
