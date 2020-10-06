import { Component, OnInit } from '@angular/core';
import {IResult} from '../data.interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  cardResult: IResult | any = {};
  isCardVisible = true;
  isFormVisible = false;
  cardForm: FormGroup;
  date: any;
  day: any;
  month: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.cardResult = JSON.parse(localStorage.getItem('card'));
    this.date = new Date(+this.cardResult.docDate);
    Number(this.date.getMonth()+1 < 10) ? this.month = '0' + Number(this.date.getMonth() + 1) : this.month = this.date.getMonth() + 1;
    Number(this.date.getDate() < 10) ? this.day = '0' + Number(this.date.getDate()) : this.day = this.date.getDate();
    this.date = this.date.getFullYear() + '-' + this.month + '-' + this.day;

    this.cardForm = new FormGroup({
      name: new FormControl(this.cardResult.docName, [Validators.required, Validators.pattern('^[^\\s]+(\\s.*)?$')]),
      code: new FormControl(this.cardResult.docCode, [Validators.required, Validators.pattern('^[^\\s]+(\\s.*)?$')]),
      type: new FormControl(this.cardResult.docType, [Validators.required, Validators.pattern('^[^\\s]+(\\s.*)?$')]),
      fio: new FormControl(this.cardResult.author.fio, [Validators.required, Validators.pattern('^[^\\s]+(\\s.*)?$')]),
      account: new FormControl(this.cardResult.author.account, [Validators.required, Validators.pattern('^[^\\s]+(\\s.*)?$')]),
      post: new FormControl(this.cardResult.author.post, [Validators.required, Validators.pattern('^[^\\s]+(\\s.*)?$')]),
      address: new FormControl(this.cardResult.address, [Validators.required, Validators.pattern('^[^\\s]+(\\s.*)?$')]),
      date: new FormControl(this.date, [Validators.required, Validators.pattern('^[^\\s]+(\\s.*)?$')]),
      status: new FormControl(this.cardResult.status, [Validators.required, Validators.pattern('^[^\\s]+(\\s.*)?$')]),
      special: new FormControl(this.cardResult.isSpecial, [Validators.required, Validators.pattern('^[^\\s]+(\\s.*)?$')])
    })
  }

  saveInfo() {
    let document = {
      id: this.cardResult.id,
      author: {
        account: this.cardForm.value.account,
        fio: this.cardForm.value.fio,
        post: this.cardForm.value.post
      },
      docCode: this.cardForm.value.code,
      docDate: new Date(this.cardForm.value.date).getTime(),
      docName: this.cardForm.value.name,
      docType: this.cardForm.value.type,
      address: this.cardForm.value.address,
      status: this.cardForm.value.status,
      isSpecial: this.cardForm.value.special
    };

    let mainResult = JSON.parse(localStorage.getItem('info'));
    let i = mainResult.findIndex(item => item.id === document.id);
    mainResult.splice(i, 1, document);
    localStorage.setItem('info', JSON.stringify(mainResult));
    let data = JSON.parse(localStorage.getItem('info'));
    this.cardResult = data.filter(item => item.id === document.id)[0];
    localStorage.setItem('card', JSON.stringify(this.cardResult));
    this.isFormVisible = false;
    this.isCardVisible = true;
  }

  deleteCard() {
    let mainResult = JSON.parse(localStorage.getItem('info'));
    let i = mainResult.findIndex(item => item.id === this.cardResult.id);
    mainResult.splice(i, 1);
    localStorage.setItem('info', JSON.stringify(mainResult));
    this.router.navigate(['/']);
  }
}
