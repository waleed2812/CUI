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

  imgSrc: string;
  imgPath: string = "";
  image: any;
  userId: any;

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

          this.imgPath = this.globals.urls.baseUrl + "/" + user.profileImage;
          this.imgSrc = this.imgPath;
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
      this.image = new FormData();
      this.image.append('image', file, file.name);
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imgSrc = reader.result as string;   
      };
    }
  }

  upload(){
    this.service.postRequest(this.globals.urls.uploadPicture , this.image)
      .subscribe(
        (res) => {
          console.log(res);
          this.service.showSuccess('Image has been uploaded', 'Image Upload');
        },
        (error) => {
          console.log(error)
          this.service.showError('Image failed to upload', 'Image Upload');
        }
      )
  }

  onRemovePicture(): void {
    this.imgSrc = this.imgPath
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
