import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http-service';
import { StorageService } from '../../../services/localStorage.service';
import { Globals } from '../../../../globals';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css'],
})
export class StatisticComponent implements OnInit {
  // Public Functions
  public globals = Globals;

  isLoadingResults: boolean;
  httpSub$: Subscription = null;
  userListing: any = [];

  constructor(
    public storageService: StorageService,
    public service: HttpService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.service.getRequest(this.globals.urls.dashBoard.users).subscribe(
      (res: any) => {
        this.isLoadingResults = false;
        this.userListing = [];
        if (res && res['success'] === 1) {
          if (res['data'].users.length) {
            this.userListing = res['data'].users;
            console.log(this.userListing);
          }
        } else this.service.showError(res['data'].message, 'Users listing');
      },
      (error) => {
        this.isLoadingResults = false;
        console.log(error);
      }
    );
  }
}
