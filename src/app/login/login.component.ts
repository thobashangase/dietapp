import { Component, OnInit } from '@angular/core';
import { Login } from '../models/login';
import { UsersService } from '../services/users-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private usersService: UsersService, private router: Router){}
  
  submitted = false;
  model = new Login();

  onSubmit() { 
    this.submitted = true;
  }

  login(user: Login) {
    //add and navigate back to list, consider confirmation message
    this.usersService.login(user).subscribe((data: any) => {
      //console.log(data);
      if (data.token) {
        this.router.navigated = false;
        this.router.navigate(['/home']);
      }
    }, error => { 
      console.error(error);
      alert(error);
    });
  }

  ngOnInit() {}

}
