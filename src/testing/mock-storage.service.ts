import { IDocument, IPaging, ISorting } from '../app/interfaces';
import { documentStub1 } from './document-stubs';
import { pagingStub } from './paging-stub';
import { sortingStub } from './sorting-stub';


export class MockStorageService {

  setDocuments = (value: IDocument[]): void => null;

  getDocuments = (): IDocument[] => [documentStub1];

  setPaging = (value: IPaging): void => null;

  getPaging = (): IPaging => pagingStub;

  setSorting = (value: ISorting): void => null;

  getSorting = (): ISorting => sortingStub;

}
