import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.createForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('^[^\\s]+(\\s.*)?$')]),
      code: new FormControl('', [Validators.required, Validators.pattern('^[^\\s]+(\\s.*)?$')]),
      type: new FormControl('', [Validators.required, Validators.pattern('^[^\\s]+(\\s.*)?$')]),
      fio: new FormControl('', [Validators.required, Validators.pattern('^[^\\s]+(\\s.*)?$')]),
      account: new FormControl('', [Validators.required, Validators.pattern('^[^\\s]+(\\s.*)?$')]),
      post: new FormControl('', [Validators.required, Validators.pattern('^[^\\s]+(\\s.*)?$')]),
      address: new FormControl('', [Validators.required, Validators.pattern('^[^\\s]+(\\s.*)?$')]),
      date: new FormControl('', [Validators.required, Validators.pattern('^[^\\s]+(\\s.*)?$')]),
      status: new FormControl('', [Validators.required, Validators.pattern('^[^\\s]+(\\s.*)?$')]),
      special: new FormControl('', [Validators.required, Validators.pattern('^[^\\s]+(\\s.*)?$')])
    });
  }

  createDoc() {
    function makeId() {
      let text = '';
      let possible = 'abcdefghijklmnopqrstuvwxyz0123456789';

      for (let i = 0; i < 16; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    }

    let document = {
      id: makeId(),
      author: {
        account: this.createForm.value.account,
        fio: this.createForm.value.fio,
        post: this.createForm.value.post
      },
      docCode: this.createForm.value.code,
      docDate: new Date(this.createForm.value.date).getTime(),
      docName: this.createForm.value.name,
      docType: this.createForm.value.type,
      address: this.createForm.value.address,
      status: this.createForm.value.status,
      isSpecial: this.createForm.value.special
    };

    let result = JSON.parse(localStorage.getItem('info'));
    result.push(document);
    localStorage.setItem('info', JSON.stringify(result));
    this.createForm.reset();
    this.router.navigate(['/']);
  }
}
