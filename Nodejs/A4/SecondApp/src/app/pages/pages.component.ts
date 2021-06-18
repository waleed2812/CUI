import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-pages',
	template: `<app-header></app-header><router-outlet></router-outlet><app-footer></app-footer>`,
})
export class PagesComponent implements OnInit {
	constructor(private router: Router) {}

	ngOnInit() {}
}
