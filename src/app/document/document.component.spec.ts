import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { documentStub1 } from 'src/testing/document-stubs';
import { documentStub2 } from 'src/testing/document-stubs';
import { MockStorageService } from 'src/testing/mock-storage.service';

import { StorageService } from '@app/services/storage.service';

import { EditComponent } from './edit/edit.component';
import { CardComponent } from './card/card.component';

import { DocumentComponent } from './document.component';


describe('DocumentComponent', () => {
  let component: DocumentComponent;
  let fixture: ComponentFixture<DocumentComponent>;
  let storageService: StorageService;
  let route: ActivatedRoute;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentComponent, EditComponent, CardComponent],
      imports: [RouterTestingModule, ReactiveFormsModule],
      providers: [
        { provide: StorageService, useClass: MockStorageService },
        { provide: ActivatedRoute, useValue: { params: of({ id: '1' }) } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentComponent);
    storageService = TestBed.inject(StorageService);
    route = TestBed.inject(ActivatedRoute);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain app-edit and app-card', () => {
    component.document$.next(documentStub1);
    component.visibleState.cardVisible$.next(true);
    component.visibleState.editVisible$.next(true);

    fixture.detectChanges();
    element = fixture.nativeElement;

    expect(element.innerHTML).toContain('app-edit');
    expect(element.innerHTML).toContain('app-card');
  });

  it('document$ should get documentStub1', () => {
    component.ngOnInit();
    expect(component.document$.value).toEqual(documentStub1);
  });

  it('changeDocument() should write document', () => {
    component.changeDocument(documentStub2);
    expect(component.document$.value).toEqual(documentStub2);
  });
});
