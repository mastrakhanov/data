import { TestBed } from '@angular/core/testing';

import { documentStub1 } from 'src/testing/document-stubs';
import { pagingStub } from 'src/testing/paging-stub';
import { sortingStub } from 'src/testing/sorting-stub';
import { mockLocalStorage } from 'src/testing/mock-local-storage';

import { StorageService } from './storage.service';


describe('StorageService', () => {
  let storageService: StorageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: StorageService, useFactory: () => new StorageService(mockLocalStorage) }],
    });
    storageService = TestBed.inject(StorageService);
  });

  it('should create', () => {
    expect(storageService).toBeTruthy();
  });

  it('getDocuments() should return values from localStorage', () => {
    mockLocalStorage.setItem('documents', JSON.stringify([documentStub1]));
    const result = storageService.getDocuments();
    expect(result).toEqual([documentStub1]);
  });

  it('setDocuments() should add values into localStorage', () => {
    storageService.setDocuments([documentStub1]);
    const result = JSON.parse(mockLocalStorage.getItem('documents'));
    expect(result).toEqual([documentStub1]);
  });

  it('getSorting() should return values from localStorage', () => {
    mockLocalStorage.setItem('sortingState', JSON.stringify(sortingStub));
    const result = storageService.getSorting();
    expect(result).toEqual(sortingStub);
  });

  it('setSorting() should add values into localStorage', () => {
    storageService.setSorting(sortingStub);
    const result = JSON.parse(mockLocalStorage.getItem('sortingState'));
    expect(result).toEqual(sortingStub);
  });

  it('getPaging() should return values from localStorage', () => {
    mockLocalStorage.setItem('pagingState', JSON.stringify(pagingStub));
    const result = storageService.getPaging();
    expect(result).toEqual(pagingStub);
  });

  it('setPaging() should add values into localStorage', () => {
    storageService.setPaging(pagingStub);
    const result = JSON.parse(mockLocalStorage.getItem('pagingState'));
    expect(result).toEqual(pagingStub);
  });
});
