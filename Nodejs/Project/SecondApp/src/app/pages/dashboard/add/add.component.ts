import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http-service';
import { StorageService } from 'src/app/services/localStorage.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Globals } from 'src/globals';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  picture: string;
  file: any;
  user: any;
  updateForm: any = new FormGroup({
    name: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    userType: new FormControl('admin'),
  });
  public globals = Globals;
  
  constructor(
    public storageService: StorageService,
    public service: HttpService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.updateForm.value);
    try {
      this.service.postRequest(this.globals.urls.createUser, this.updateForm.value).
      subscribe(
        (res: any) => {  
          console.log(res);
          this.service.showSuccess(res?.message, 'Users Created');
          return;
        },
        (error: any) => {
          console.log("error: " + JSON.stringify(error))
          this.service.showError(error?.message, 'Users Created');
        }
      )
    } catch (error) {
      console.error(error);
    }
  }

}
