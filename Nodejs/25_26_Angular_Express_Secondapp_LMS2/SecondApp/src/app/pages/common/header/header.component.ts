import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http-service';
import { StorageService } from 'src/app/services/localStorage.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
	constructor(public storageService: StorageService, public service: HttpService, private router: Router, private route: ActivatedRoute) {}

	ngOnInit(): void {}

	logOut() {
		sessionStorage.clear();
		localStorage.removeItem('test-data');
		localStorage.removeItem('Token');
		this.service.showSuccess('User Logout Successfully.', 'LogOut');
		this.router.navigate(['/login']);
	}
}
