import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SignUpServiceService } from '../../services/signup-service/sign-up-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css'
})
export class SignupPageComponent implements OnInit {

  signupForm: FormGroup;
  countries: string[] = ['Canada', 'United States', 'United Kingdom', 'Australia'];
  cities: string[] = ['Halifax', 'Toronto', 'Vancouver', 'New York'];  // This could be dynamic based on selected country
  passwordMismatch: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    public signUpService: SignUpServiceService,
    public route:ActivatedRoute,
  ) {
    // Initialize the form with empty values and validation rules
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    });
  }

  LoginRedirect() {
    this.router.navigate(['/login']);
  }

  postLoginRedirect(signupForm: any) {
    if (this.signupForm.invalid || this.passwordMismatch) {
      return;
    }
    const formData = this.signupForm.value;
    console.log('Form Data:', formData);

    Swal.fire({
      title: 'Are you sure want to add?',
      text: 'Your blog will be added!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No '
    }).then((result) => {
      if (result.value) {
      this.signUpService.signUpUser(formData).subscribe((res) => {
      });
        Swal.fire(
          'Added!',
          'Your blog has been added.',
          'success'
        )
      }
    })
    this.router.navigate(['/postLogin']);
  }

  ngOnInit(): void {
    // Listen for changes in password and confirm password fields to check for mismatch
    this.signupForm.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.checkPasswordMatch();
    });
  }

  checkPasswordMatch(): void {
    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;
    this.passwordMismatch = password && confirmPassword && password !== confirmPassword;
  }

  onSubmit(): void {
    // Check form validity before submission
    console.log(this.signupForm)
    if (this.signupForm.invalid || this.passwordMismatch) {
      return;
    }

    // Collect form data
    const formData = this.signupForm.value;
    console.log('Form Data:', formData);

    // Handle form submission logic (e.g., send data to server)
    // You can use HTTP client to send the data to the server

    // Navigate to another route on successful submission
    this.router.navigate(['/login']);
  }

  navigateToLogin(): void {
    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}
