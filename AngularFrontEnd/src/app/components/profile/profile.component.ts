import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemServiceService } from 'src/app/services/item-service.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  edit: boolean = false;
  bgColor: any = '#f0ad4e';
  updateProfile: FormGroup;


  name: any;
  email: any;
  phone: any;
  password: any;

  user: any = {
    name: '',
    email: '',
    phone: '',
    password: '',
  }
  constructor(private FB: FormBuilder, private US: UsersService, private toaster:ToasterService, private itemSer:ItemServiceService) {
    this.updateProfile = this.FB.group({
      name: this.FB.control('', [Validators.required]),
      email: this.FB.control('', [Validators.required]),
      phone: this.FB.control('', [Validators.required]),
      password: this.FB.control('', [Validators.required]),
    })
  }

  ngOnInit() {
    this.checkUser();
    this.emitUser();
  }

  editProfile(FormData: any) {
    this.edit = !this.edit;
    this.user.name = this.name;
    this.user.email = this.email;
    this.user.phone = this.phone;
    this.user.password = this.password;
    if (!this.edit) {
      this.bgColor = '#f0ad4e';
      let user: any = localStorage.getItem("user");
      let UserId = user && JSON.parse(user).data.id;
      this.US.updateProfile(UserId, FormData).subscribe((res: any) => {
        this.toaster.ProfileUpdateSuccess();
        this.checkUser();
      },err=>{
        this.toaster.ProfileUpdateFail();
      })
      // Write Profile Update Code Here

      // 8269730633
    } else {
      this.bgColor = '#28a745';
    }
  }

  checkUser() {
    let user: any = localStorage.getItem("user");
    let UserId = user && JSON.parse(user).data.id;
    if (UserId) {
      this.US.getProfile(UserId).subscribe((res: any) => {
        this.name = res.data.name;
        this.email = res.data.email;
        this.phone = res.data.phone;
        this.password = res.data.password;
      })
    }
  }

  emitUser() {
    let user = localStorage.getItem("user");
    let userVerify = user && JSON.parse(user).data.id
    if(userVerify){
   this.itemSer.ActiveUser.emit(true);
  }
  }

}
