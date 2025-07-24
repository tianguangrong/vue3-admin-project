import service from "./axios";


interface ResponseDataType {
  code: number,
  message: string,
  data: object | null
}

function get(url:string, params?: any):Promise<ResponseDataType> {
  return service.get(url, {params})
};
function post(url:string, data?: any):Promise<ResponseDataType> {
  return service.post(url, data)
}
export default {
  get,
  post
}