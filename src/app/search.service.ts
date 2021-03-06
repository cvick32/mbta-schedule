import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, scheduled } from 'rxjs';
import { Station } from './station.model';

/**
 * This service handles searching for an MBTA station. It
 * retrieves the station's schedule from the MBTA API and
 * updates any subscriptions after a successful call.
 */
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  api_url = 'https://api-v3.mbta.com/schedules?filter[stop]';
  station: Station;
  stationUpdated = new Subject<{station: Station}>();

  constructor(private http: HttpClient) {
    this.searchStation('North Station'); // start at North Station
  }

  /**
   * Given a station, retrieve the current time
   * table for that station.
   */
  searchStation(station: string) {
    const api_call = `${this.api_url}=${station}`;
    this.http.get(api_call).subscribe((response: any) => {
      this.station = {
        name: station,
        arrivals: response.data.filter(schedule => schedule.attributes.arrival_time),
        departures: response.data.filter(schedule => schedule.attributes.departure_time)
      };
      this.stationUpdated.next({station: this.station});
    });
  }

  getStation() {
    return this.station;
  }

  /**
   * Returns an Observable to the caller which updates with
   * the location.
   */
  getStationSubscription() {
    return this.stationUpdated.asObservable();
  }
}
