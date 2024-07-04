import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { HeadlineComponent } from '../../components/headline/headline.component';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [HeadlineComponent, ReactiveFormsModule],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss'
})
export class UserCreateComponent {
  form = new FormGroup({
    firstName: new FormControl('', Validators.minLength(1)),
    lastName: new FormControl('', Validators.minLength(1)),
    email: new FormControl('', Validators.minLength(1)),
   });
  
  constructor(
    private readonly apiService: ApiService
  ) {}

   createUser(): void {
    const firstName = this.form.get('firstName')?.value;
    const lastName = this.form.get('lastName')?.value;
    const email = this.form.get('email')?.value;

    this.apiService.postDataToApi('/Users', {
      firstName,
      lastName,
      email
    }).subscribe(response => console.log(response) );
   }
}
