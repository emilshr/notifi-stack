export type TableColumnHeader<T = undefined> = {
  key: keyof T | string;
  label: string;
};
