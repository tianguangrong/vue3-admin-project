export type User = {
  loginName: string,
  loginPsw: string,
}

export interface IMenu {
  name: string,
  url: string,
  icon: string,
  children?: IMenu[]
}
export interface IUsercofig {
  menulist: IMenu[],
  token: string,
  user: {
    username: string,
    role: string[]
  },

}