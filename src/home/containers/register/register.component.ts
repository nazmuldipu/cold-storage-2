import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/service/auth.service';
import { UserService } from 'src/service/user.service';
import { User } from 'src/shared/model/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  errorMessage: string = '';
  thankyouMessage = false;
  loading = false;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('^01[3-9][ ]?[0-9]{2}[ ]?[0-9]{3}[ ]?[0-9]{3}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async submit() {
    if (this.form.valid) {
      this.errorMessage = '';
      try {
        this.loading = true;
        const user = { ...this.form.value } as User;
        const resp = await this.userService.userRegistration(user).toPromise();
        this.thankyouMessage = true;
        this.loading = false;
      } catch (error) {
        this.errorMessage = error;
      }
      // this.auth.register(user.email, user.password).then((usr) => {
      //   this.userService.saveRegisteredUser(usr.user.uid, user.name, user.email, user.password)
      //     .then(() => {
      //       this.loading = false;
      //       this.thankyouMessage = true;
      //     })
      //     .catch((error) => {
      //       this.errorMessage = error.message;
      //     });
      // }).catch((error) => {
      //   this.errorMessage = error.message;
      // })
    } else {
      this.errorMessage = 'Form data missing';
    }
  }
}
