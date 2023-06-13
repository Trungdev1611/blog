import bcrypt from "bcrypt";

const saltRounds = 10;
export function hashPassWord(passwordPlain:string) {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(passwordPlain, salt);
  return hash;
}

//custom error để trả ra được status code tùy biến. Nếu không custom chỉ trả được 1 status khi lỗi (ví dụ như 500 bên kia )
export class customError extends Error {
    statusCode: number;
    data: null
    constructor(statusCode:number,message: string,  data:any) {
        super(message);
        this.statusCode = statusCode;
        this.data = data;
    }
}

export const listtRouteExclude = ['/auth/register', '/auth/login', '/auth/refreshtoken']

