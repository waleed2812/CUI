import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';

@NgModule({
	declarations: [PagesComponent, LoginComponent, HeaderComponent, FooterComponent],
	imports: [CommonModule, PagesRoutingModule, FormsModule],
	exports: [],
})
export class PagesModule {}
