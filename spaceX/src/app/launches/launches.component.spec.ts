import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchesComponent } from './launches.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {CommonModule} from "@angular/common";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {SpacexService} from "../services/spacex/spacex.service";

describe('LaunchesComponent', () => {
  let component: LaunchesComponent;
  let fixture: ComponentFixture<LaunchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaunchesComponent ],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {}},

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

    fixture = TestBed.createComponent(LaunchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should initialize with correct displayed columns', () => {
    expect(component.displayedColumns).toEqual(['name', 'wikipedia']);
  });
});
