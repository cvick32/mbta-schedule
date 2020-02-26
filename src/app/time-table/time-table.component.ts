import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SearchService } from '../search.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { Station } from '../station.model';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements OnInit {
  displayedColumns: string[] = ['date', 'time', 'destination', 'status'];
  station: Station;
  currentStationUpdate = new BehaviorSubject<Station>(this.station);
  scheduleString = 'dept';
  currentSchedule;
  private stationSub: Subscription;

  constructor(public searchService: SearchService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.station = this.searchService.getStation();
    this.stationSub = this.searchService.getStationSubscription()
      .subscribe((stationData: {station: Station}) => {
        this.station = stationData.station;
        this.changeSchedule();
        this.changeDetectorRef.detectChanges();
        this.currentStationUpdate.next(this.station);
      });
  }

  changeSchedule() {
    if (this.scheduleString === 'arri') {
      this.currentSchedule = this.station.arrivals;
    } else {
      this.currentSchedule = this.station.departures;
    }
  }
}
