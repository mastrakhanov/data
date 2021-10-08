import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { IDocument } from '@app/interfaces';
import { StorageService } from '@app/services/storage.service';
import { VisibleState } from '@app/document/visible-state';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditComponent implements OnChanges {

  @Input() document?: IDocument;
  @Input() visibleState!: VisibleState;

  editForm!: FormGroup;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly storageService: StorageService
  ) { }

  ngOnChanges({ document }: SimpleChanges): void {
    if (document?.currentValue) {
      const date = new Date(Number(document.currentValue.date));
      const month = Number(date.getMonth() + 1 < 10) ? '0' + Number(date.getMonth() + 1) : date.getMonth() + 1;
      const day = Number(date.getDate() < 10) ? '0' + Number(date.getDate()) : date.getDate();
      const formDate = date.getFullYear() + '-' + month + '-' + day;

      this.editForm = new FormGroup({
        name: new FormControl(document.currentValue.name, [Validators.required, Validators.pattern('^[^\\s]+(\\s.*)?$')]),
        code: new FormControl(document.currentValue.code, [Validators.required, Validators.pattern('^[^\\s]+(\\s.*)?$')]),
        type: new FormControl(document.currentValue.type, [Validators.required, Validators.pattern('^[^\\s]+(\\s.*)?$')]),
        fio: new FormControl(document.currentValue.author.fio, [Validators.required, Validators.pattern('^[^\\s]+(\\s.*)?$')]),
        account: new FormControl(document.currentValue.author.account, [Validators.required, Validators.pattern('^[^\\s]+(\\s.*)?$')]),
        position: new FormControl(document.currentValue.author.position, [Validators.required, Validators.pattern('^[^\\s]+(\\s.*)?$')]),
        address: new FormControl(document.currentValue.address, [Validators.required, Validators.pattern('^[^\\s]+(\\s.*)?$')]),
        date: new FormControl(formDate, Validators.required),
        status: new FormControl(document.currentValue.status, [Validators.required, Validators.pattern('^[^\\s]+(\\s.*)?$')]),
        private: new FormControl(document.currentValue.private, Validators.required)
      });
    }
  }

  save(): void {
    const document: IDocument = {
      id: this.document?.id as string,
      author: {
        account: this.editForm.value.account,
        fio: this.editForm.value.fio,
        position: this.editForm.value.post
      },
      code: this.editForm.value.code,
      date: new Date(this.editForm.value.date).getTime(),
      name: this.editForm.value.name,
      type: this.editForm.value.type,
      address: this.editForm.value.address,
      status: this.editForm.value.status,
      private: this.editForm.value.private
    };

    const storageDocuments = this.storageService.get('documents');
    const index = storageDocuments.findIndex(item => item.id === document.id);
    storageDocuments.splice(index, 1, document);

    this.storageService.set('documents', storageDocuments);

    this.visibleState.editVisible$.next(false);
    this.visibleState.cardVisible$.next(true);
  }

  changeVisibleParams(cardVisible: boolean, editVisible: boolean): void {
    this.visibleState.cardVisible$.next(cardVisible);
    this.visibleState.editVisible$.next(editVisible);
  }

}
