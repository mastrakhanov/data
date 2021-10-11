import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { documents } from './documents';
import { StorageService } from './services/storage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  constructor(private readonly storageService: StorageService) { }

  ngOnInit(): void {
    if (!this.storageService.getDocuments()) {
      for (const document of documents) {
        if (document.author === null) {
          document.author = {
            account: '-',
            fio: '-',
            position: '-'
          };
        }
        document.date = new Date(document.date).getTime().toString();
      }

      this.storageService.setDocuments(documents);
    }
  }

}
