  
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
  export  interface ICharge {
    charges: TData;
    chargeTime:TData;
    chargeRate: TData
  }
  export type  IMixResponse = IDeviceDataRes<string[], ICharge, string[]>