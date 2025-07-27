  
  export type Tlenget = string[];
  export type TData = number[];
  export interface ICategory {
    name: string
  };
  // console.log(legend);
  export interface IDeviceDataRes<T, U, K> {
    legend: T,
    record: U,
    category: K
  }