import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { BehaviorSubject, combineLatest, EMPTY, Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';

import { IDocument, IPaging, ISorting } from '@app/interfaces';
import { StorageService } from '@app/services/storage.service';


enum Column {
  id = 'id',
  account = 'account',
  fio = 'fio',
  position = 'position',
  code = 'code',
  date = 'date',
  name = 'name',
  type = 'type',
  address = 'address',
  status = 'status',
  private = 'private'
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatSort) sort: MatSort = new MatSort();
  // tslint:disable-next-line:max-line-length
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);

  displayedColumns: string[] = [
    Column.id,
    Column.account,
    Column.fio,
    Column.position,
    Column.code,
    Column.date,
    Column.name,
    Column.type,
    Column.address,
    Column.status,
    Column.private
  ];

  dataSource$: Observable<IDocument[]> = EMPTY;

  storageData$ = new BehaviorSubject<IDocument[]>([]);
  sortOptions$ = new BehaviorSubject<ISorting>({ field: '', direction: '' });
  paginatorOptions$ = new BehaviorSubject<IPaging>({ page: 0, pageSize: 5 });

  private sortChanged?: Subscription;
  private pageChanged?: Subscription;

  constructor(
    private readonly router: Router,
    private readonly storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.storageData$.next(this.storageService.get('documents'));

    this.dataSource$ = combineLatest([
      this.storageData$,
      this.sortOptions$,
      this.paginatorOptions$
    ])
      .pipe(
        map(([data, { field, direction }, { page, pageSize }]) => ({
          documents: data.sort((a, b) => {
            if (field !== 'fio' && field !== 'position' && field !== 'account') {
              return direction === 'asc'
                ? (a as any)[field] > (b as any)[field] ? 1 : -1
                : (a as any)[field] > (b as any)[field] ? -1 : 1;
            } else {
              return direction === 'asc'
                // tslint:disable:no-string-literal
                ? (a as any)['author'][field] > (b as any)['author'][field] ? 1 : -1
                // tslint:disable:no-string-literal
                : (a as any)['author'][field] > (b as any)['author'][field] ? -1 : 1;
            }
          }),
          page,
          pageSize
        })),
        tap(({ documents }) => this.storageService.set('documents', documents)),
        map(({ documents, page, pageSize }) => documents.slice(page * pageSize, pageSize * (page + 1)))
      );
  }

  ngAfterViewInit(): void {
    this.sortChanged = this.sort.sortChange
      .pipe(
        debounceTime(500),
        tap(({ active, direction }) => this.sortOptions$.next({ field: active, direction })))
      .subscribe();

    this.pageChanged = this.paginator.page
      .pipe(
        distinctUntilChanged((prev, next) => JSON.stringify(prev) === JSON.stringify(next)),
        tap(({ pageIndex, pageSize }) => {
          this.paginatorOptions$.next({ page: pageIndex, pageSize });
        })
      ).subscribe();

  }

  ngOnDestroy(): void {
    if (this.sortChanged) { this.sortChanged.unsubscribe(); }
    if (this.pageChanged) { this.pageChanged.unsubscribe(); }
  }

}
