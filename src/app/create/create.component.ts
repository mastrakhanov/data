import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { IDocument } from '@app/interfaces';
import { StorageService } from '@app/services/storage.service';


const makeId = (): string => {
  let text = '';
  const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 16; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateComponent {

  createForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('^[^\\s]+(\\s.*)?$')]),
    code: new FormControl('', [Validators.required, Validators.pattern('^[^\\s]+(\\s.*)?$')]),
    type: new FormControl('', [Validators.required, Validators.pattern('^[^\\s]+(\\s.*)?$')]),
    fio: new FormControl('', [Validators.required, Validators.pattern('^[^\\s]+(\\s.*)?$')]),
    account: new FormControl('', [Validators.required, Validators.pattern('^[^\\s]+(\\s.*)?$')]),
    position: new FormControl('', [Validators.required, Validators.pattern('^[^\\s]+(\\s.*)?$')]),
    address: new FormControl('', [Validators.required, Validators.pattern('^[^\\s]+(\\s.*)?$')]),
    date: new FormControl('', Validators.required),
    status: new FormControl('', [Validators.required, Validators.pattern('^[^\\s]+(\\s.*)?$')]),
    private: new FormControl('', Validators.required)
  });

  constructor(
    private readonly router: Router,
    private readonly storageService: StorageService
  ) { }

  create(): void {
    const document: IDocument = {
      id: makeId(),
      author: {
        account: this.createForm.value.account,
        fio: this.createForm.value.fio,
        position: this.createForm.value.position
      },
      code: this.createForm.value.code,
      date: new Date(this.createForm.value.date).getTime(),
      name: this.createForm.value.name,
      type: this.createForm.value.type,
      address: this.createForm.value.address,
      status: this.createForm.value.status,
      private: this.createForm.value.private
    };

    const storageDocuments = this.storageService.get('documents');
    storageDocuments.push(document);

    this.storageService.set('documents', storageDocuments);

    this.createForm.reset();
    this.router.navigateByUrl('/');
  }
}
