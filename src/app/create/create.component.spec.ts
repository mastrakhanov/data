import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { StorageService } from '@app/services/storage.service';
import { documentStub1 } from 'src/testing/document-stubs';

import { CreateComponent } from './create.component';


describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let storageService: StorageService;
  let router: Router;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [StorageService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    storageService = TestBed.inject(StorageService);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain form, input and select', () => {
    element = fixture.nativeElement;
    expect(element.innerHTML).toContain('form');
    expect(element.innerHTML).toContain('input');
    expect(element.innerHTML).toContain('select');
  });

  it('should contain "Название"', () => {
    element = fixture.nativeElement.querySelector('label');
    expect(element.textContent).toContain('Название');
  });

  it('should contain "Код документа"', () => {
    element = fixture.nativeElement.querySelectorAll('label')[1];
    expect(element.textContent).toContain('Код документа');
  });

  it('should contain "Тип документа"', () => {
    element = fixture.nativeElement.querySelectorAll('label')[2];
    expect(element.textContent).toContain('Тип документа');
  });

  it('should contain "ФИО"', () => {
    element = fixture.nativeElement.querySelectorAll('label')[3];
    expect(element.textContent).toContain('ФИО');
  });

  it('should contain "Аккаунт"', () => {
    element = fixture.nativeElement.querySelectorAll('label')[4];
    expect(element.textContent).toContain('Аккаунт');
  });

  it('should contain "Должность"', () => {
    element = fixture.nativeElement.querySelectorAll('label')[5];
    expect(element.textContent).toContain('Должность');
  });

  it('should contain "Адрес"', () => {
    element = fixture.nativeElement.querySelectorAll('label')[6];
    expect(element.textContent).toContain('Адрес');
  });

  it('should contain "Дата"', () => {
    element = fixture.nativeElement.querySelectorAll('label')[7];
    expect(element.textContent).toContain('Дата');
  });

  it('should contain "Статус"', () => {
    element = fixture.nativeElement.querySelectorAll('label')[8];
    expect(element.textContent).toContain('Статус');
  });

  it('should contain "Признак приватности"', () => {
    element = fixture.nativeElement.querySelectorAll('label')[9];
    expect(element.textContent).toContain('Признак приватности');
  });

  it('should contain "Создать"', () => {
    element = fixture.nativeElement.querySelector('button');
    expect(element.textContent).toContain('Создать');
  });

  it('should contain "На главную"', () => {
    element = fixture.nativeElement.querySelectorAll('button')[1];
    expect(element.textContent).toContain('На главную');
  });

  it('should link to /', (done) => {
    element = fixture.nativeElement.querySelectorAll('button')[1];

    element.click();

    fixture.ngZone.run(() => {
      component.create();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(router.url).toBe('/');
      });
    });

    done();
  });

  it('create() should call getDocuments(), setDocuments() and link to /', () => {
    spyOn(storageService, 'getDocuments').and.returnValue([documentStub1]);
    spyOn(storageService, 'setDocuments');

    fixture.ngZone.run(() => {
      component.create();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(router.url).toBe('/');
      });
    });

    expect(storageService.getDocuments).toHaveBeenCalledTimes(1);
    expect(storageService.setDocuments).toHaveBeenCalledTimes(1);
  });
});
