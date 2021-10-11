import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IDocument } from '@app/interfaces';
import { StorageService } from '@app/services/storage.service';
import { VisibleState } from '@app/document/visible-state';


@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentComponent implements OnInit {

  visibleState = new VisibleState();

  document$ = new BehaviorSubject<IDocument>({} as IDocument);
  private storageData$ = new BehaviorSubject<IDocument[]>([]);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.storageData$.next(this.storageService.getDocuments());

    this.route.params
      .pipe(
        tap(({ id }) => this.document$.next(this.storageData$.value.find(data => data.id === id) as IDocument)))
      .subscribe();
  }

  changeDocument(document: IDocument): void {
    this.document$.next(document);
  }

}
