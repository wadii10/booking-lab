import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../../shared/services/search/search.service';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent implements OnInit {
  searchResults: any[] = [];
  state!: any;
  activity!: any;
  date!: any;
  loading: boolean = false;

  constructor(private route: ActivatedRoute, private searchService: SearchService) { }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.state = params['state'];
      this.activity = params['activity'];
      this.date = params['date'];

      if (this.state && this.date) {
        this.loading = true;
        this.searchService.searchByCriteria(this.state, this.activity, this.date).subscribe(
          results => {
            this.searchResults = results;
            console.log(this.searchResults)
            this.loading = false;
          },
          error => {
            console.error('Error fetching search results', error);
            this.loading = false;
          }
        );
      }
    });
  }

}