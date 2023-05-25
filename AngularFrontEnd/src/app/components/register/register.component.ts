import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/services/toaster.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  userRegister: FormGroup;

  constructor(private fb: FormBuilder, private userSer: UsersService, private toaster:ToasterService, private router:Router) {

    this.userRegister = this.fb.group({
      'name': this.fb.control('', [Validators.required]),
      'email': this.fb.control('', [Validators.required]),
      'phone': this.fb.control('', [Validators.required]),
      'password': this.fb.control('', [Validators.required]),
      'confirmPassword': this.fb.control('', [Validators.required]),
    })

  }


  register(value: any) {
    this.userSer.userSignup(value).subscribe((res:any) => {
      if(res.Success){
        this.toaster.RegisterSuccess(res.Success);
        this.router.navigateByUrl("/login");    
      }else{
        this.toaster.RegisterSuccess(res.error);
      }





  },(err:any)=>{
    console.log(err,"error");
    
this.toaster.LoginFail(err.error.message);
  })
}
  

}
