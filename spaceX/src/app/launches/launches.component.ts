import {Component, Inject, OnInit} from '@angular/core';
import {SpacexService} from "../services/spacex/spacex.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Launch} from "../models/launch.model";

@Component({
  selector: 'app-launches',
  templateUrl: './launches.component.html',
  styleUrls: ['./launches.component.scss']
})
export class LaunchesComponent implements OnInit {
  launches: Launch[] = [];
  displayedColumns: string[] = [ 'name',  'wikipedia'];
  constructor(private spacexService: SpacexService,
              @Inject(MAT_DIALOG_DATA) public data: any
              ) {

  }

  ngOnInit() {
    this.spacexService.getLaunchesById(this.data.launchpadId).subscribe(data => {
      this.launches = data.docs
    })
  }
}
