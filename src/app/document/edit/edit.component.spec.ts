import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { StorageService } from '@app/services/storage.service';
import { VisibleState } from '@app/document/visible-state';

import { documentStub1 } from 'src/testing/document-stubs';
import { changesStub } from 'src/testing/changes-stub';

import { EditComponent } from './edit.component';


describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let storageService: StorageService;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [StorageService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    storageService = TestBed.inject(StorageService);
    component = fixture.componentInstance;
    component.ngOnChanges(changesStub);
    component.visibleState = new VisibleState();
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

  it('should contain "Сохранить"', () => {
    element = fixture.nativeElement.querySelector('button');
    expect(element.textContent).toContain('Сохранить');
  });

  it('should contain "Отмена"', () => {
    element = fixture.nativeElement.querySelectorAll('button')[1];
    expect(element.textContent).toContain('Отмена');
  });

  it('should call save()', () => {
    spyOn(component, 'save');
    element = fixture.nativeElement.querySelector('button');
    element.click();

    expect(component.save).toHaveBeenCalledTimes(1);
  });

  it('should call changeVisibleParams(true, false)', () => {
    spyOn(component, 'changeVisibleParams');
    element = fixture.nativeElement.querySelectorAll('button')[1];
    element.click();

    expect(component.changeVisibleParams).toHaveBeenCalledWith(true, false);
  });

  it('editForm should contain name, code, type, fio, account, position, address, date, status, private controls', () => {
    expect(component.editForm.contains('name')).toBeTrue();
    expect(component.editForm.contains('code')).toBeTrue();
    expect(component.editForm.contains('type')).toBeTrue();
    expect(component.editForm.contains('fio')).toBeTrue();
    expect(component.editForm.contains('account')).toBeTrue();
    expect(component.editForm.contains('position')).toBeTrue();
    expect(component.editForm.contains('address')).toBeTrue();
    expect(component.editForm.contains('date')).toBeTrue();
    expect(component.editForm.contains('status')).toBeTrue();
    expect(component.editForm.contains('private')).toBeTrue();
  });

  it('save() should call getDocuments(), setDocuments(), emit() and change visibleState', () => {
    spyOn(storageService, 'getDocuments').and.returnValue([documentStub1]);
    spyOn(storageService, 'setDocuments');
    spyOn(component.visibleState.editVisible$, 'next');
    spyOn(component.visibleState.cardVisible$, 'next');
    spyOn(component.documentChange, 'emit');

    component.document = documentStub1;
    component.save();

    expect(storageService.getDocuments).toHaveBeenCalledTimes(1);
    expect(storageService.setDocuments).toHaveBeenCalledTimes(1);
    expect(component.visibleState.editVisible$.next).toHaveBeenCalledWith(false);
    expect(component.visibleState.cardVisible$.next).toHaveBeenCalledWith(true);
    expect(component.documentChange.emit).toHaveBeenCalledTimes(1);
  });

  it('changeVisibleParams() should change visibleState', () => {
    spyOn(component.visibleState.editVisible$, 'next');
    spyOn(component.visibleState.cardVisible$, 'next');

    component.changeVisibleParams(true, false);

    expect(component.visibleState.editVisible$.next).toHaveBeenCalledWith(false);
    expect(component.visibleState.cardVisible$.next).toHaveBeenCalledWith(true);
  });
});
