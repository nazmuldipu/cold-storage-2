import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/service/auth.service';
import { UserService } from 'src/service/user.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  errorMessage: string = "";
  loading = false;
  showPassword = false;

  constructor(private fb: FormBuilder, private auth: AuthService,
    private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.createForm();
    this.auth.user$.subscribe(data => {
      if (data && data.uid) {
        this.router.navigate(['/dashboard'])
      }
    })
  }

  createForm() {
    this.form = this.fb.group({
      username: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  async submit() {
    if (this.form.valid) {
      this.errorMessage = "";
      try {
        this.loading = true;
        const resp = await this.auth.loginWithEmail(this.form.controls.username.value, this.form.controls.password.value);
        this.loading = false;
        if (resp.user.email) {
          this.router.navigate(['/dashboard']);      
          console.log(resp.user.email);
          this.getUser(resp);
        }
      } catch (err) { console.log(err); this.errorMessage = err.message; this.loading = false; }
    } else {
      this.errorMessage = "Form data missing";
    }
  }

  async getUser(data) {
    this.loading = true;
    await this.userService.get(data.user.uid).pipe(take(2)).subscribe(data => {
      this.loading = false;
      console.log(data);
    }, error => {
      this.loading = false;
      this.errorMessage = error.message;
    })

  }
}
