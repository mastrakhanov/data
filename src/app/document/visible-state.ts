import { BehaviorSubject } from 'rxjs';


export class VisibleState {

  cardVisible$ = new BehaviorSubject<boolean>(true);
  editVisible$ = new BehaviorSubject<boolean>(false);

}
