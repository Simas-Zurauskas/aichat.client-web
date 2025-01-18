import moment from 'moment';

export const formatBits = (size: number): string => {
  const KB = 1000;
  const MB = 1000 * 1000;

  if (size < KB) {
    return `${size.toFixed(2)} B`;
  } else if (size < MB) {
    return `${(size / KB).toFixed(2)} KB`;
  } else {
    return `${(size / MB).toFixed(2)} MB`;
  }
};

export const isTenMB = (size: number): boolean => {
  const MB = 1000 * 1000;
  return size < 20 * MB;
};

export const formatDate = (date?: string): string => {
  if (!date) {
    return '';
  }
  return moment(date).format('YYYY-MM-DD HH:mm');
};

export const numeralFormat = (N?: number | null): string => {
  const _roundToSignificantFigures = (num: number, n: number): number => {
    if (num === 0) return 0;

    const d = Math.ceil(Math.log10(Math.abs(num)));
    const power = n - d;
    const magnitude = Math.pow(10, power);
    const shifted = Math.round(num * magnitude);
    return shifted / magnitude;
  };

  if (!N) return '0';

  const absN = Math.abs(N);
  const SI_SYMBOL = [
    { value: 1e12, symbol: 't' },
    { value: 1e9, symbol: 'b' },
    { value: 1e6, symbol: 'm' },
    { value: 1e3, symbol: 'k' },
  ];

  let formattedNumber = '';
  let symbol = '';

  for (const { value, symbol: sym } of SI_SYMBOL) {
    if (absN >= value) {
      const scaled = N / value;
      const rounded = _roundToSignificantFigures(scaled, 3);
      formattedNumber = rounded.toString();
      symbol = sym;
      return `${formattedNumber}${symbol}`;
    }
  }

  const rounded = _roundToSignificantFigures(N, 3);
  formattedNumber = rounded.toString();
  return `${formattedNumber}`;
};
