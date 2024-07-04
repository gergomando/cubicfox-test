import { Component } from '@angular/core';
import { HeadlineComponent } from '../../components/headline/headline.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-absences',
  standalone: true,
  imports: [HeadlineComponent, ReactiveFormsModule],
  templateUrl: './absences.component.html',
  styleUrl: './absences.component.scss'
})
export class AbsencesComponent {
  form = new FormGroup({
    selectedDate: new FormControl('', Validators.minLength(1)),
   }); 

   onFormSubmit(): void {
    console.log(this.form.get('selectedDate')?.value);
  }
}
