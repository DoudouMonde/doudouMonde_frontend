export const neverExpected = (value: never): never => {
  throw new Error(`처리되지 않은 타입이 있습니다: ${value}`);
};
