import { Component, OnInit } from '@angular/core';
import { Register } from '../models/register';
import { UsersService } from '../services/users-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
})
export class RegisterUserComponent implements OnInit {
  model = new Register();

  constructor(private usersService: UsersService, private router: Router) { }

  register(user: Register) {
    //add and navigate back to list, consider confirmation message
    this.usersService.register(user).subscribe(data => {
      if (data == null) {
        this.router.navigated = false;
        this.router.navigate(['/login']);
      } else {
        alert(data);
      }
    }, error => console.error(error));
    //console.log(this.model);
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  submitted = false;
  
  ngOnInit() {}

}
