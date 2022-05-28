import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import swal from 'sweetalert2';
declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['text1000@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', Validators.required],
    remember: [false],
  });
  email: string = '';
  googleInstance: any;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.initGoogle();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.loginForm.get('remember')?.setValue(true);
    }
    this.loginForm.get('email')?.setValue(this.email);
  }

  login() {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value, this.loginForm.get('remember')?.value).subscribe(
        (resp: any) => {
          this.router.navigate(['/dashboard']);
        },
        (err: any) => {
          swal.fire('Error', err.error.msg, 'error');
        }
      );
    }
  }

  async initGoogle() {
    await this.userService.googleInit();
    this.googleInstance = this.userService.googleInstance;

    google.accounts.id.renderButton(
      document.getElementById('buttonDiv'),
      { theme: 'outline', size: 'large', width: 360 } // customization attributes
    );
  }
}
