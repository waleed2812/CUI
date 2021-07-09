import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';

@NgModule({
	declarations: [PagesComponent, HeaderComponent, FooterComponent],
	imports: [CommonModule, PagesRoutingModule, FormsModule, ReactiveFormsModule],
	exports: [],
})
export class PagesModule {}
