import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { documents } from './documents';
import { StorageService } from './services/storage.service';

import { AppComponent } from './app.component';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let storageService: StorageService;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule],
      providers: [StorageService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    storageService = TestBed.inject(StorageService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should contain router-outlet', () => {
    element = fixture.nativeElement;
    expect(element.innerHTML).toContain('router-outlet');
  });

  it('should call storageService set()', () => {
    spyOn(storageService, 'setDocuments');
    spyOn(storageService, 'getDocuments').and.returnValue(null);
    component.ngOnInit();

    expect(storageService.setDocuments).toHaveBeenCalledWith(documents);
  });

  it('should does not call storageService set()', () => {
    spyOn(storageService, 'setDocuments');
    component.ngOnInit();

    expect(storageService.setDocuments).not.toHaveBeenCalledWith(documents);
  });
});
