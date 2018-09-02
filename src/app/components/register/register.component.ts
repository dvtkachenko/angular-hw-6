import { ToastrService } from 'node_modules/ngx-toastr';
import { NgxSpinnerService } from 'node_modules/ngx-spinner';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  public registerForm: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  ngOnInit() {
    if (this.authService.isAuth()) {
      this.router.navigate(['/']);      
    }
    this.registerForm = this.createRegisterForm();
  }

  public onSubmit(): void {

    if (this.registerForm.invalid) {
      return;
    }

    const newUser: User = { email: this.registerForm.value.email, 
                            name: this.registerForm.value.name,
                            password: this.registerForm.value.password };

    this.spinner.show();

    this.authService.registerNewUser(newUser)
      .subscribe((response: boolean) => {
        this.spinner.hide();
        this.toastr.success("New user was successfully created !", "Info", { timeOut: 3000 });
        this.router.navigate(['/']);
      }, ({error, status}) => {
        this.spinner.hide();
        this.toastr.error(`Can not create new user ! ${error} ! Status code: ${status}`, "Error", { timeOut: 3000 });
      });
  }

  public onCancel(): void {
    this.router.navigate(['login']);
  }

  private passwordValidator(control: FormControl): ValidationErrors {

    const value = control.value;

    const hasNumber = /[0-9]/.test(value);
    const hasCapitalLetter = /[A-Z]/.test(value);
    const isLengthValid = value ? value.length > 7 : false;

    const passwordValid = hasNumber && hasCapitalLetter && isLengthValid;
   
    if (!passwordValid) {

      let message: string = "Password should consist at least:";
      let errors: any[];

      if (!hasNumber) {
        message = message + " 1 number ";
      }

      if (!hasCapitalLetter) {
        message = message + " 1 capital letter ";
      }

      if (!isLengthValid) {
        message = message + " 8 symbols ";
      }

      message = message + "!";

      return { invalidPassword: message };
    }
     return null;
   }

  private createRegisterForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
      password: ['', [Validators.required, this.passwordValidator]]
    });
  }

}
