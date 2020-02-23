import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { Station } from '../station.model';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements OnInit {

  station: Station;
  currentStationUpdate: BehaviorSubject<Station>;
  private stationSub: Subscription;

  constructor(public searchService: SearchService) { }

  ngOnInit(): void {
    this.station = this.searchService.getStation();
    this.stationSub = this.searchService.getStationSubscription()
      .subscribe((stationData: {station: Station}) => {
        this.station = stationData.station;
        this.currentStationUpdate.next(this.station);
      });
  }
}
