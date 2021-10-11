import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { IDocument } from '@app/interfaces';
import { StorageService } from '@app/services/storage.service';
import { VisibleState } from '@app/document/visible-state';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnChanges {

  @Input() document?: IDocument;
  @Input() visibleState!: VisibleState;

  document$ = new BehaviorSubject<IDocument>({} as IDocument);

  constructor(
    private readonly router: Router,
    private readonly storageService: StorageService
  ) { }

  ngOnChanges({ document }: SimpleChanges): void {
    if (document?.currentValue) {
      this.document$.next(document.currentValue);
    }
  }

  delete(): void {
    const storageDocuments = this.storageService.getDocuments();
    const index = storageDocuments.findIndex(item => item.id === this.document$.value.id);
    storageDocuments.splice(index, 1);

    this.storageService.setDocuments(storageDocuments);

    this.router.navigateByUrl('/');
  }

  changeVisibleParams(cardVisible: boolean, editVisible: boolean): void {
    this.visibleState.cardVisible$.next(cardVisible);
    this.visibleState.editVisible$.next(editVisible);
  }

}
