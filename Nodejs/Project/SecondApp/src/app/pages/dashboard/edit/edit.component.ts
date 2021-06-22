import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http-service';
import { StorageService } from 'src/app/services/localStorage.service';
import { Globals } from 'src/globals';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  imgFile: string;
  userId: any;

  updateForm: any = new FormGroup({
    name: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    userType: new FormControl('admin'),
  });
  uploadForm: any = new FormGroup({
    name: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
    imgSrc: new FormControl('', [Validators.required])
  });
  public globals = Globals;
  
  constructor(
    public storageService: StorageService,
    public service: HttpService,
    private _Activatedroute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userId=this._Activatedroute.snapshot.paramMap.get("id");

    try {
      this.service.getRequest(this.globals.urls.dashBoard.users + "/" + this.userId).
      subscribe(
        (res: any) => {  
          const user = res.data.userDetail;
          this.updateForm = new FormGroup({
            name: new FormControl(user.name),
            phone: new FormControl(user.phoneNumber),
            email: new FormControl(user.email),
            userType: new FormControl(user.userType),
          });
          
          return;
        },
        (error: any) => {
          console.log("error: " + JSON.stringify(error))
          this.service.showError(error?.message, 'Users Data Fetch');
        }
        
      )
    } catch (error) {
      console.error(error);
    }

  }

  onImageChange(e) {
    const reader = new FileReader();
    
    if(e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.imgFile = reader.result as string;
        this.uploadForm.patchValue({
          imgSrc: reader.result
        });
   
      };
    }
  }

  upload(){
    console.log(this.uploadForm.value);
    this.service.postRequest(this.globals.urls.uploadPicture , this.uploadForm.value)
      .subscribe(response => {
        alert('Image has been uploaded.');
      })
  }

  onRemovePicture(): void {
    this.uploadForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      file: new FormControl('', [Validators.required]),
      imgSrc: new FormControl('', [Validators.required])
    });
  }

  onSubmit(): void {
    console.log(this.updateForm.value);
    try {
      this.service.postRequest(this.globals.urls.dashBoard.users + "/" + this.userId, this.updateForm.value).
      subscribe(
        (res: any) => {  
          console.log(res);
          this.service.showSuccess(res?.message, 'Users Updated');
          return;
        },
        (error: any) => {
          console.log("error: " + JSON.stringify(error))
          this.service.showError(error?.message, 'Users Updated');
        }
      )
    } catch (error) {
      console.error(error);
    }
  }
}
