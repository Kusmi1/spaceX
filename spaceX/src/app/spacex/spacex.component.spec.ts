import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from '@angular/material/dialog';
import {SpacexComponent} from './spacex.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {CommonModule} from "@angular/common";
import {MatTableModule} from "@angular/material/table";
import {SpacexService} from "../services/spacex/spacex.service";

describe('SpacexComponent', () => {
  let component: SpacexComponent;
  let fixture: ComponentFixture<SpacexComponent>;
  let matDialogService: jasmine.SpyObj<MatDialog>;
  matDialogService = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);
  let matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
  let spacexServiceSpy = jasmine.createSpyObj('SpacexService', ['getLaunchesById']);


  beforeEach(async () => {
    component = fixture.componentInstance;
    component.launches = [];
    await TestBed.configureTestingModule({
      declarations: [SpacexComponent],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialog, useValue: matDialogSpy},
        {provide: SpacexService, useValue: spacexServiceSpy}
      ],
      imports: [MatDialogModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        CommonModule,
        MatPaginatorModule,
        CommonModule,
        MatTableModule,]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpacexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
