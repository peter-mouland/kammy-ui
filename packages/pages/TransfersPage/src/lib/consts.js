
export const changeTypes = {
  TRADE: 'Trade',
  LOAN: 'Loan',
  SWAP: 'Swap',
  TRANSFER: 'Transfer',
  WAIVER: 'Waiver',
};

export const verbs = {
  out: {
    [changeTypes.LOAN]: ' ...being loaned',
    [changeTypes.SWAP]: ' ...being swapped',
    [changeTypes.TRADE]: ' ...being traded',
    [changeTypes.TRANSFER]: ' ...being transferred',
    [changeTypes.WAIVER]: ' ...being taken',
  },
  in: {
    [changeTypes.LOAN]: ' ...being brought',
    [changeTypes.SWAP]: ' ...being swapped',
    [changeTypes.TRADE]: ' ...being traded',
    [changeTypes.TRANSFER]: ' ...being transferred',
    [changeTypes.WAIVER]: ' ...being brought',
  },
};
