export interface IResult {
  id: string,
  address: string,
  author: IAuthor,
  docCode: string,
  docDate: any,
  docName: string,
  docType: string,
  isSpecial: boolean,
  status: string
}

export interface IAuthor {
  account: string,
  fio: string,
  post: string
}
