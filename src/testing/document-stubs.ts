import { IDocument } from '../app/interfaces';


export const documentStub1: IDocument = {
  id: '1',
  author: {
    account: 'account 1',
    fio: 'fio 1',
    position: 'position 1'
  },
  code: 'code 1',
  date: '2020-01-01',
  name: 'name 1',
  type: 'type 1',
  address: 'address 1',
  status: 'status 1',
  private: false
};

export const documentStub2: IDocument = {
  id: '2',
  author: {
    account: 'account 2',
    fio: 'fio 2',
    position: 'position 2'
  },
  code: 'code 2',
  date: '2020-01-02',
  name: 'name 2',
  type: 'type 2',
  address: 'address 2',
  status: 'status 2',
  private: false
};
