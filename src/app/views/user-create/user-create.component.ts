import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { HeadlineComponent } from '../../components/headline/headline.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [HeadlineComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss'
})
export class UserCreateComponent {
  form = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  loading = false; 
  submitted = false;

  constructor(
    private readonly apiService: ApiService,
    private router: Router
  ) {}

   createUser(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    const firstName = this.form.get('firstName')?.value;
    const lastName = this.form.get('lastName')?.value;
    const email = this.form.get('email')?.value;

    this.apiService.postDataToApi('/Users', {
      firstName,
      lastName,
      email
    }).subscribe(() => {
      this.loading = false;
      this.router.navigate(['users']);
    }
     );
   }
}
