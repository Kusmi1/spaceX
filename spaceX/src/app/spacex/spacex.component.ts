import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SpacexService} from "../services/spacex/spacex.service";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {LaunchesComponent} from "../launches/launches.component";
import {LaunchPad} from "../models/launchPad.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";


@Component({
  selector: 'app-spacex',
  templateUrl: './spacex.component.html',
  styleUrls: ['./spacex.component.scss']
})
export class SpacexComponent implements OnInit, AfterViewInit {
  launchpads: LaunchPad [] = [];
  launches: LaunchPad [] = [];
  filteredLaunchpads: LaunchPad[] = [];
  launchpadsWithLaunches$: Observable<any[]> | undefined;
  showDetails = false;
  displayedColumns: string[] = ['name', 'region', 'details'];

  dataSource = new MatTableDataSource<LaunchPad>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }

  constructor(private spacexService: SpacexService,
              private matDialog: MatDialog) {
  }

  ngOnInit() {
    this.launchpadsWithLaunches$ = this.spacexService.getLaunchpadsWithLaunches();

    this.spacexService.getLaunchpadsWithLaunches().subscribe(data => {
      this.launchpads = data;
      this.filteredLaunchpads = data;
      this.dataSource.data = this.filteredLaunchpads;
    }, error => {
      console.error('Error fetching launchpads:', error);
    });
  }


  filterLaunchpads(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  showLaunches(id: string) {
    this.matDialog.open(LaunchesComponent, {
      width: '1050px',
      data: {
        launchpadId: id
      }
    });

    this.showDetails = !this.showDetails
    this.spacexService.getLaunchesById(id).subscribe(data => {
      this.launches = data.docs
    })
  }
}
