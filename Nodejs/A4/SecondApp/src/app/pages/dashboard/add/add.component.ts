import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http-service';
import { StorageService } from 'src/app/services/localStorage.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  isEditin: string = "Add";
  picture: string = "";
  file: any;
  user: any;

  constructor(
    public storageService: StorageService,
    public service: HttpService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { }

  
  updateForm = this.formBuilder.group({
    name: '',
    newpass: '',
    confirm: '',
  });

  ngOnInit(): void {
  }

  onChangePicture(): void {}
  onSubmitPicture(): void {}
  onRemovePicture(): void {}
  onSubmit(): void {
    console.log(this.updateForm.value)
  }

}
