import { TestBed, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { skip } from 'rxjs/operators';

import { documentStub1, documentStub2 } from 'src/testing/document-stubs';
import { pagingStub } from 'src/testing/paging-stub';
import { sortingStub } from 'src/testing/sorting-stub';
import { MockStorageService } from 'src/testing/mock-storage.service';

import { StorageService } from '@app/services/storage.service';

import { MainComponent } from './main.component';


describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let storageService: StorageService;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainComponent],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule
      ],
      providers: [{ provide: StorageService, useClass: MockStorageService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    storageService = TestBed.inject(StorageService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain table and mat-paginator', () => {
    element = fixture.nativeElement;
    expect(element.innerHTML).toContain('table');
    expect(element.innerHTML).toContain('mat-paginator');
  });

  it('should recognize a sort', () => {
    expect(component.sort).toBeDefined();
  });

  it('should recognize a paginator', () => {
    expect(component.paginator).toBeDefined();
  });

  it('storageData$ should get documentStub', () => {
    component.ngOnInit();
    expect(component.storageData$.value).toEqual([documentStub1]);
  });

  it('sortOptions$ should get sortingStub', () => {
    component.ngOnInit();
    expect(component.sortOptions$.value).toEqual(sortingStub);
  });

  it('paginatorOptions$ should get pagingStub', () => {
    component.ngOnInit();
    expect(component.paginatorOptions$.value).toEqual(pagingStub);
  });

  it('dataSource$ should get items', () => {
    component.ngOnInit();
    component.dataSource$.subscribe(dataSource => expect(dataSource).toEqual([documentStub1]));
  });

  it('dataSource$ should get sorted items with descending direction', () => {
    spyOn(storageService, 'getDocuments').and.returnValue([documentStub1, documentStub2]);
    component.sortOptions$.next({ field: 'id', direction: 'desc' });
    component.ngOnInit();
    component.dataSource$.subscribe(dataSource => expect(dataSource).toEqual([documentStub2, documentStub1]));
  });

  it('dataSource$ should get sorted items with ascending direction', () => {
    spyOn(storageService, 'getDocuments').and.returnValue([documentStub2, documentStub1]);
    component.sortOptions$.next({ field: 'id', direction: 'asc' });
    component.ngOnInit();
    component.dataSource$.subscribe(dataSource => expect(dataSource).toEqual([documentStub1, documentStub2]));
  });

  it('sortOptions$ should get values from sort', (done) => {
    component.sort.sortChange.emit({ active: 'id', direction: 'asc' });

    component.ngAfterViewInit();
    component.sortOptions$.pipe(skip(1)).subscribe(sortOptions => {
      expect(sortOptions).toEqual({ field: 'id', direction: 'asc' });
      done();
    });
  });

  it('should call storageService setSorting()', fakeAsync(() => {
    spyOn(storageService, 'setSorting');
    component.sort.sortChange.emit({ active: 'id', direction: 'asc' });

    component.ngAfterViewInit();
    tick(500);
    expect(storageService.setSorting).toHaveBeenCalledWith({ field: 'id', direction: 'asc' });
  }));

  it('paginatorOptions$ should get values from paginator', (done) => {
    component.paginator.page.emit({ pageIndex: 1, pageSize: 10, length: 0 });

    component.ngAfterViewInit();
    component.paginatorOptions$.subscribe(paginatorOptions => {
      expect(paginatorOptions).toEqual({ page: 1, pageSize: 10 });
      done();
    });
  });

  it('should call storageService setPaging()', () => {
    spyOn(storageService, 'setPaging');
    component.paginator.page.emit({ pageIndex: 1, pageSize: 10, length: 0 });

    component.ngAfterViewInit();
    expect(storageService.setPaging).toHaveBeenCalledWith({ page: 1, pageSize: 10 });
  });
});
