import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { StorageService } from '@app/services/storage.service';
import { VisibleState } from '@app/document/visible-state';

import { documentStub1 } from 'src/testing/document-stubs';
import { changesStub } from 'src/testing/changes-stub';

import { CardComponent } from './card.component';


describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let storageService: StorageService;
  let router: Router;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
      imports: [RouterTestingModule],
      providers: [StorageService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    storageService = TestBed.inject(StorageService);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    component.ngOnChanges(changesStub);
    component.visibleState = new VisibleState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain documentStub1 name', () => {
    element = fixture.nativeElement.querySelector('h5');
    expect(element.textContent).toContain(documentStub1.name);
  });

  it('should contain documentStub1 date', () => {
    element = fixture.nativeElement.querySelector('p');
    expect(element.textContent).toContain('Дата создания: 01.01.2020');
  });

  it('should contain documentStub1 type', () => {
    element = fixture.nativeElement.querySelectorAll('p')[1];
    expect(element.textContent).toContain(`Тип документа: ${documentStub1.type}`);
  });

  it('should contain documentStub1 fio', () => {
    element = fixture.nativeElement.querySelectorAll('p')[2];
    expect(element.textContent).toContain(`ФИО: ${documentStub1.author.fio}`);
  });

  it('should contain documentStub1 account', () => {
    element = fixture.nativeElement.querySelectorAll('p')[3];
    expect(element.textContent).toContain(`Аккаунт: ${documentStub1.author.account}`);
  });

  it('should contain documentStub1 position', () => {
    element = fixture.nativeElement.querySelectorAll('p')[4];
    expect(element.textContent).toContain(`Должность: ${documentStub1.author.position}`);
  });

  it('should contain documentStub1 code', () => {
    element = fixture.nativeElement.querySelectorAll('p')[5];
    expect(element.textContent).toContain(`Код документа: ${documentStub1.code}`);
  });

  it('should contain documentStub1 status', () => {
    element = fixture.nativeElement.querySelectorAll('p')[6];
    expect(element.textContent).toContain(`Статус: ${documentStub1.status}`);
  });

  it('should contain documentStub1 address', () => {
    element = fixture.nativeElement.querySelectorAll('p')[7];
    expect(element.textContent).toContain(`Адрес: ${documentStub1.address}`);
  });

  it('should contain documentStub1 private', () => {
    element = fixture.nativeElement.querySelectorAll('p')[8];
    expect(element.textContent).toContain(`Признак приватности: ${documentStub1.private}`);
  });

  it('should contain "Редактировать"', () => {
    element = fixture.nativeElement.querySelector('button');
    expect(element.textContent).toContain('Редактировать');
  });

  it('should contain "На главную"', () => {
    element = fixture.nativeElement.querySelectorAll('button')[1];
    expect(element.textContent).toContain('На главную');
  });

  it('should call changeVisibleParams(false, true)', () => {
    spyOn(component, 'changeVisibleParams');
    element = fixture.nativeElement.querySelector('button');
    element.click();

    expect(component.changeVisibleParams).toHaveBeenCalledWith(false, true);
  });

  it('should link to /', (done) => {
    element = fixture.nativeElement.querySelectorAll('button')[1];

    element.click();

    fixture.ngZone.run(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(router.url).toBe('/');
      });
    });

    done();
  });

  it('should call delete()', () => {
    spyOn(component, 'delete');
    element = fixture.nativeElement.querySelector('i');
    element.click();

    expect(component.delete).toHaveBeenCalledTimes(1);
  });

  it('changeVisibleParams() should change visibleState', () => {
    spyOn(component.visibleState.editVisible$, 'next');
    spyOn(component.visibleState.cardVisible$, 'next');

    component.changeVisibleParams(false, true);

    expect(component.visibleState.editVisible$.next).toHaveBeenCalledWith(true);
    expect(component.visibleState.cardVisible$.next).toHaveBeenCalledWith(false);
  });

  it('delete() should call getDocuments() and setDocuments()', () => {
    spyOn(storageService, 'getDocuments').and.returnValue([documentStub1]);
    spyOn(storageService, 'setDocuments');

    fixture.ngZone.run(() => {
      component.delete();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(router.url).toBe('/');
      });
    });

    expect(storageService.getDocuments).toHaveBeenCalledTimes(1);
    expect(storageService.setDocuments).toHaveBeenCalledWith([]);
  });
});
