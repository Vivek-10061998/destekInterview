import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  myForm: FormGroup;
  submitted = false;
  success = false;

  constructor(private fb: FormBuilder , private formService: UserService) {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      gender: ['', Validators.required],
      profile: ['', Validators.required],
      dob: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { notSame: true };
  }
  getMinimumDate(): string {
    const currentDate = new Date();
    const minAgeDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
    const minimumDate = new Date(minAgeDate.getTime() + minAgeDate.getTimezoneOffset() * 60000).toISOString().substring(0, 10);
    return minimumDate;
  }

  onSubmit(): void {
    console.log('onSubmit() called');
    this.submitted = true;
    console.log(this.myForm.value)
    if (this.myForm.valid) {
      console.log('Form is valid');
      const formValues = JSON.stringify(this.myForm.value);
      console.log('Form values:', formValues);
      this.formService.submitForm(this.myForm).subscribe({
        next: () => {
          this.success = true;
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    }
  }
  
}
