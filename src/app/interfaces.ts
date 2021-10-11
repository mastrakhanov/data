export interface IDocument {
  id: string;
  address: string;
  author: IAuthor | null;
  code: string;
  date: number | string;
  name: string;
  type: string;
  private: boolean;
  status: string;
}

export interface IAuthor {
  account: string;
  fio: string;
  position: string;
}

export interface ISorting {
  field: string;
  direction: string;
}

export interface IPaging {
  page: number;
  pageSize: number;
}
