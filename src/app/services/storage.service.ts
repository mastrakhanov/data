import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE } from '@ng-web-apis/common';

import { IDocument, IPaging, ISorting } from '@app/interfaces';


@Injectable({ providedIn: 'root' })
export class StorageService {

  constructor(@Inject(LOCAL_STORAGE) private readonly localStorage: Storage) { }

  public setDocuments = (value: IDocument[]): void => this.localStorage.setItem('documents', JSON.stringify(value));

  public getDocuments = (): IDocument[] => JSON.parse(this.localStorage.getItem('documents') as string);

  public setSorting = (value: ISorting): void => this.localStorage.setItem('sortingState', JSON.stringify(value));

  public getSorting = (): ISorting => JSON.parse(this.localStorage.getItem('sortingState') as string);

  public setPaging = (value: IPaging): void => this.localStorage.setItem('pagingState', JSON.stringify(value));

  public getPaging = (): IPaging => JSON.parse(this.localStorage.getItem('pagingState') as string);

}
