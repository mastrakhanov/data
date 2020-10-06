import {Component, OnInit} from '@angular/core';
import {IResult} from '../data.interface';
import {Router} from '@angular/router';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  data = [
    {
      "id": "yok0cpn5g7j0n1ck",
      "author": {
        "account": "semenov_gn",
        "fio": "Семенов Геннадий Николаевич",
        "post": "Главный специалист"
      },
      "docCode": "bchqihg90v6viqq1ogak93dffrke19gm",
      "docDate": "2018-09-27",
      "docName": "Заявление о внесении в реестр №271",
      "docType": "request",
      "address": "г. Москва, ул. Академика Королева, 32",
      "status": "registred",
      "isSpecial": true
    },
    {
      "id": "xyxepbuv9s45ake7",
      "author": {
        "account": "antonov_ds",
        "fio": "Антонов Дмитрий Сергеевич",
        "post": "Специалист"
      },
      "docCode": "ag4r795cevrlmozxvtjfbjyw79ve1f7f",
      "docDate": "2018-09-30",
      "docName": "Свидетельство об утверждении проекта планировки №0028",
      "docType": "certificate",
      "address": "г. Москва, 2-й Южнопортовый проезд, 19к1",
      "status": "accepted",
      "isSpecial": false
    },
    {
      "id": "a1thght7p61v5mev",
      "author": {
        "account": "alekseev_mn",
        "fio": "Алексеев Михаил Николаевич",
        "post": "Системный администратор"
      },
      "docCode": "93rdd6y56gn5t1xdgxm1ow9m9z9rq7ip",
      "docDate": "2018-10-02",
      "docName": "Заявление о внесении в реестр №272",
      "docType": "certificate",
      "address": "г. Москва, Партийный пер., 7с2",
      "status": "registred",
      "isSpecial": false
    },
    {
      "id": "sdhfguhfgbp61v5m",
      "author": null,
      "docCode": "djgu46dbgn5t1xdgxm1ow9m9z9fjs8bf",
      "docDate": "2019-06-06",
      "docName": "Заявление о внесении в реестр №273",
      "docType": "certificate",
      "address": "г. Москва, Партийный пер., 7с3",
      "status": "registred",
      "isSpecial": false
    },
    {
      "id": "jdlvn74sj7fn7dhf",
      "author": {
        "account": "ivanov_sm",
        "fio": "Иванов Сергей Максимович",
        "post": "Главный специалист по работе с заказчиками"
      },
      "docCode": "lk87fjgb6gn5t1xdgxm1ow9mldjvnio4",
      "docDate": "2019-03-02",
      "docName": "Заявление о внесении в реестр №274",
      "docType": "certificate",
      "address": "г. Москва, Партийный пер., 7с4",
      "status": "registred",
      "isSpecial": false
    },{
      "id": "kdjgh9f0kmgjzbeg",
      "author": {
        "account": "teleshev_lp",
        "fio": "Телешев Леонид Петрович",
        "post": "Технический директор"
      },
      "docCode": "8jhdnrie6gn5t1xdgxm1ow9m9z9fkjn5h",
      "docDate": "2017-01-02",
      "docName": "Заявление о внесении в реестр №275",
      "docType": "certificate",
      "address": "г. Москва, Партийный пер., 7с5",
      "status": "registred",
      "isSpecial": false
    },
    {
      "id": "fk2fjdlgkmteincf",
      "author": null,
      "docCode": "knudpel46gn5t1xdgxm1ow9m9zknh7fg",
      "docDate": "2019-11-05",
      "docName": "Заявление о внесении в реестр №276",
      "docType": "certificate",
      "address": "г. Москва, Партийный пер., 8",
      "status": "registred",
      "isSpecial": false
    },
    {
      "id": "dfj8fnmcksdfbbjg",
      "author": {
        "account": "sidorov_av",
        "fio": "Сидоров Александр Владимирович",
        "post": "Руководитель службы технической поддержки"
      },
      "docCode": "kjf85ny56gn5t1xdgxm1ow9m9z9jfhy7",
      "docDate": "2017-08-05",
      "docName": "Заявление о внесении в реестр №277",
      "docType": "certificate",
      "address": "г. Москва, Партийный пер., 9",
      "status": "accepted",
      "isSpecial": false
    },
    {
      "id": "djk8gnmc8ehd6fm4",
      "author": null,
      "docCode": "djh7fg4c6gn5t1xdgxm1ow9mdjk78fny",
      "docDate": "2019-11-22",
      "docName": "Заявление о внесении в реестр №278",
      "docType": "certificate",
      "address": "г. Москва, Партийный пер., 10",
      "status": "registred",
      "isSpecial": true
    },
    {
      "id": "sklifnurdksnruib",
      "author": null,
      "docCode": "dkjy468f6gn5t1xdgxm1ow9mdjuf68dn",
      "docDate": "2017-01-20",
      "docName": "Заявление о внесении в реестр №279",
      "docType": "certificate",
      "address": "г. Москва, Партийный пер., 11",
      "status": "registred",
      "isSpecial": true
    },
    {
      "id": "dji48gnclsienjd8",
      "author": {
        "account": "pavlov_ki",
        "fio": "Павлов Кирилл Иванович",
        "post": "Сотрудник технической поддержки"
      },
      "docCode": "1f9dmska6gn5t1xdgxm1ow9m8ejfnd93",
      "docDate": "2018-10-02",
      "docName": "Заявление о внесении в реестр №280",
      "docType": "request",
      "address": "г. Москва, Партийный пер., 12",
      "status": "accepted",
      "isSpecial": false
    },
    {
      "id": "sldkfjghsldjf34b",
      "author": null,
      "docCode": "2f0dmjfirgn5t1xdgxm1ow9m9djr8vmg",
      "docDate": "2017-04-03",
      "docName": "Заявление о внесении в реестр №281",
      "docType": "request",
      "address": "г. Москва, Партийный пер., 13",
      "status": "registred",
      "isSpecial": true
    },
    {
      "id": "sdjfgkjlsdf346jd",
      "author": {
        "account": "sokolov_mi",
        "fio": "Соколов Матвей Игоревич",
        "post": "Технический писатель"
      },
      "docCode": "dkng9n3oemd5t1xdgxm1ow9m9kdj7rbx",
      "docDate": "2019-07-30",
      "docName": "Заявление о внесении в реестр №282",
      "docType": "certificate",
      "address": "г. Москва, Партийный пер., 14",
      "status": "accepted",
      "isSpecial": false
    }
  ];

  result: IResult[] = [];
  isDownId = true;
  isDownAccount = true;
  isDownFio = true;
  isDownPost = true;
  isDownCode = true;
  isDownDate = true;
  isDownName = true;
  isDownType = true;
  isDownAddress = true;
  isDownStatus = true;
  isDownSpecial = true;
  cardResult: IResult | any = {};

  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  pageEvent: PageEvent = {
    length: this.length,
    pageIndex: 0,
    pageSize: this.pageSize,
    previousPageIndex: 0
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!localStorage.getItem('info')) {
      for (let i of this.data) {
        if (i.author == null) {
          i.author = {
            account: '-',
            fio: '-',
            post: '-'
          };
        }
        i.docDate = new Date(i.docDate).getTime().toString();
      }
      localStorage.setItem('info', JSON.stringify(this.data));
    }

    this.result = JSON.parse(localStorage.getItem('info')).slice(0, this.pageSize);
  }

  sortById(): void {
    let dataForSort = JSON.parse(localStorage.getItem('info'));
    if (this.isDownId) {
      dataForSort.sort((a, b) => a.id > b.id ? 1 : -1);
    } else {
      dataForSort.sort((a, b) => a.id > b.id ? -1 : 1);
    }
    localStorage.setItem('info', JSON.stringify(dataForSort));
    this.result = JSON.parse(localStorage.getItem('info')).slice(this.pageEvent.pageSize * this.pageEvent.pageIndex, this.pageEvent.pageSize * (this.pageEvent.pageIndex + 1));
  }

  sortByAccount(): void {
    let dataForSort = JSON.parse(localStorage.getItem('info'));
    if (this.isDownAccount) {
      dataForSort.sort((a, b) => a.author.account > b.author.account ? 1 : -1);
    } else {
      dataForSort.sort((a, b) => a.author.account > b.author.account ? -1 : 1);
    }
    localStorage.setItem('info', JSON.stringify(dataForSort));
    this.result = JSON.parse(localStorage.getItem('info')).slice(this.pageEvent.pageSize * this.pageEvent.pageIndex, this.pageEvent.pageSize * (this.pageEvent.pageIndex + 1));
  }

  sortByFio(): void {
    let dataForSort = JSON.parse(localStorage.getItem('info'));
    if (this.isDownFio) {
      dataForSort.sort((a, b) => a.author.fio > b.author.fio ? 1 : -1);
    } else {
      dataForSort.sort((a, b) => a.author.fio > b.author.fio ? -1 : 1);
    }
    localStorage.setItem('info', JSON.stringify(dataForSort));
    this.result = JSON.parse(localStorage.getItem('info')).slice(this.pageEvent.pageSize * this.pageEvent.pageIndex, this.pageEvent.pageSize * (this.pageEvent.pageIndex + 1));
  }

  sortByPost(): void {
    let dataForSort = JSON.parse(localStorage.getItem('info'));
    if (this.isDownPost) {
      dataForSort.sort((a, b) => a.author.post > b.author.post ? 1 : -1);
    } else {
      dataForSort.sort((a, b) => a.author.post > b.author.post ? -1 : 1);
    }
    localStorage.setItem('info', JSON.stringify(dataForSort));
    this.result = JSON.parse(localStorage.getItem('info')).slice(this.pageEvent.pageSize * this.pageEvent.pageIndex, this.pageEvent.pageSize * (this.pageEvent.pageIndex + 1));
  }

  sortByCode(): void {
    let dataForSort = JSON.parse(localStorage.getItem('info'));
    if (this.isDownCode) {
      dataForSort.sort((a, b) => a.docCode > b.docCode ? 1 : -1);
    } else {
      dataForSort.sort((a, b) => a.docCode > b.docCode ? -1 : 1);
    }
    localStorage.setItem('info', JSON.stringify(dataForSort));
    this.result = JSON.parse(localStorage.getItem('info')).slice(this.pageEvent.pageSize * this.pageEvent.pageIndex, this.pageEvent.pageSize * (this.pageEvent.pageIndex + 1));
  }

  sortByDate(): void {
    let dataForSort = JSON.parse(localStorage.getItem('info'));
    if (this.isDownDate) {
      dataForSort.sort((a, b) => b.docDate - a.docDate);
    } else {
      dataForSort.sort((a, b) => a.docDate - b.docDate);
    }
    localStorage.setItem('info', JSON.stringify(dataForSort));
    this.result = JSON.parse(localStorage.getItem('info')).slice(this.pageEvent.pageSize * this.pageEvent.pageIndex, this.pageEvent.pageSize * (this.pageEvent.pageIndex + 1));
  }

  sortByName(): void {
    let dataForSort = JSON.parse(localStorage.getItem('info'));
    if (this.isDownName) {
      dataForSort.sort((a, b) => a.docName > b.docName ? 1 : -1);
    } else {
      dataForSort.sort((a, b) => a.docName > b.docName ? -1 : 1);
    }
    localStorage.setItem('info', JSON.stringify(dataForSort));
    this.result = JSON.parse(localStorage.getItem('info')).slice(this.pageEvent.pageSize * this.pageEvent.pageIndex, this.pageEvent.pageSize * (this.pageEvent.pageIndex + 1));
  }

  sortByType(): void {
    let dataForSort = JSON.parse(localStorage.getItem('info'));
    if (this.isDownType) {
      dataForSort.sort((a, b) => a.docType > b.docType ? 1 : -1);
    } else {
      dataForSort.sort((a, b) => a.docType > b.docType ? -1 : 1);
    }
    localStorage.setItem('info', JSON.stringify(dataForSort));
    this.result = JSON.parse(localStorage.getItem('info')).slice(this.pageEvent.pageSize * this.pageEvent.pageIndex, this.pageEvent.pageSize * (this.pageEvent.pageIndex + 1));
  }

  sortByAddress(): void {
    let dataForSort = JSON.parse(localStorage.getItem('info'));
    if (this.isDownAddress) {
      dataForSort.sort((a, b) => a.address > b.address ? 1 : -1);
    } else {
      dataForSort.sort((a, b) => a.address > b.address ? -1 : 1);
    }
    localStorage.setItem('info', JSON.stringify(dataForSort));
    this.result = JSON.parse(localStorage.getItem('info')).slice(this.pageEvent.pageSize * this.pageEvent.pageIndex, this.pageEvent.pageSize * (this.pageEvent.pageIndex + 1));
  }

  sortByStatus(): void {
    let dataForSort = JSON.parse(localStorage.getItem('info'));
    if (this.isDownStatus) {
      dataForSort.sort((a, b) => a.status > b.status ? 1 : -1);
    } else {
      dataForSort.sort((a, b) => a.status > b.status ? -1 : 1);
    }
    localStorage.setItem('info', JSON.stringify(dataForSort));
    this.result = JSON.parse(localStorage.getItem('info')).slice(this.pageEvent.pageSize * this.pageEvent.pageIndex, this.pageEvent.pageSize * (this.pageEvent.pageIndex + 1));
  }

  sortBySpecial(): void {
    let dataForSort = JSON.parse(localStorage.getItem('info'));
    if (this.isDownSpecial) {
      dataForSort.sort((a, b) => a.isSpecial > b.isSpecial ? 1 : -1);
    } else {
      dataForSort.sort((a, b) => a.isSpecial > b.isSpecial ? -1 : 1);
    }
    localStorage.setItem('info', JSON.stringify(dataForSort));
    this.result = JSON.parse(localStorage.getItem('info')).slice(this.pageEvent.pageSize * this.pageEvent.pageIndex, this.pageEvent.pageSize * (this.pageEvent.pageIndex + 1));
  }

  viewInfo($event) {
    let ev = $event.target.parentElement.innerText.slice(0,16);
    let dataForCard = JSON.parse(localStorage.getItem('info'));
    this.cardResult = dataForCard.filter(item => item.id === ev)[0];
    localStorage.setItem('card', JSON.stringify(this.cardResult));
    this.router.navigate(['/card', this.cardResult.id]);
  }

  paginatePage($event) {
    this.pageEvent = $event;
    this.result = JSON.parse(localStorage.getItem('info')).slice(this.pageEvent.pageSize * this.pageEvent.pageIndex, this.pageEvent.pageSize * (this.pageEvent.pageIndex + 1));
  }
}
