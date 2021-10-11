import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { BehaviorSubject, combineLatest, EMPTY, Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, take, tap } from 'rxjs/operators';

import { IDocument, IPaging, ISorting } from '@app/interfaces';
import { StorageService } from '@app/services/storage.service';


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
    'id',
    'account',
    'fio',
    'position',
    'code',
    'date',
    'name',
    'type',
    'address',
    'status',
    'private'
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
    this.storageData$.next(this.storageService.getDocuments());

    if (this.storageService.getSorting()) {
      this.sortOptions$.next(this.storageService.getSorting());
    }

    if (this.storageService.getPaging()) {
      this.paginatorOptions$.next(this.storageService.getPaging());
    }

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
                : (a as any)['author'][field] > (b as any)['author'][field] ? -1 : 1;
            }
          }),
          page,
          pageSize
        })),
        tap(({ documents }) => this.storageService.setDocuments(documents)),
        map(({ documents, page, pageSize }) => documents.slice(page * pageSize, pageSize * (page + 1)))
      );
  }

  ngAfterViewInit(): void {
    this.sortOptions$
      .pipe(
        take(1),
        tap(({ field, direction }) => {
          if (!field || !direction) { return; }

          this.sort.active = field;
          this.sort.direction = direction as SortDirection;

          // tslint-disable-next-line:no-underscore-dangle
          this.sort._stateChanges.next();

          const sortHeader: any = this.sort.sortables.get(this.sort.active);

          if (sortHeader) {
            sortHeader['_setAnimationTransitionState']({ toState: 'active' });
          }
        }))
      .subscribe();

    this.sortChanged = this.sort.sortChange
      .pipe(
        debounceTime(500),
        tap(({ active, direction }) => this.sortOptions$.next({ field: active, direction })),
        tap(({ active, direction }) => this.storageService.setSorting({ field: active, direction })))
      .subscribe();

    this.pageChanged = this.paginator.page
      .pipe(
        distinctUntilChanged((prev, next) => JSON.stringify(prev) === JSON.stringify(next)),
        tap(({ pageIndex, pageSize }) => {
          this.paginatorOptions$.next({ page: pageIndex, pageSize });
          this.storageService.setPaging({ page: pageIndex, pageSize });
        })
      ).subscribe();
  }

  ngOnDestroy(): void {
    if (this.sortChanged) { this.sortChanged.unsubscribe(); }
    if (this.pageChanged) { this.pageChanged.unsubscribe(); }
  }

}
