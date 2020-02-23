import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchBarComponent {

  constructor(public searchService: SearchService) {}

  onSearchStation(form: NgForm) {
    this.searchService.searchStation(form.value.station);
  }
}
