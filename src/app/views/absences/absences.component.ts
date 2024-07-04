import { Component } from '@angular/core';
import { HeadlineComponent } from '../../components/headline/headline.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-absences',
  standalone: true,
  imports: [HeadlineComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './absences.component.html',
  styleUrl: './absences.component.scss'
})
export class AbsencesComponent {
  form = new FormGroup({
    selectedDate: new FormControl('', Validators.minLength(1)),
  }); 
  absences: any[] = [];
  apiResponse: any[] = [];
  lastSelectedDate: string = '';
  loading = false;
  error = false;

  constructor(
    private readonly apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.loading = true;
    this.apiService.fetchDataFromApi('/Absences')
    .subscribe((response: any) => {
      if (response.status === 401) {
        this.loading = false;
        this.error = true;
        return;
      }

      if(response && !!response.length) {
        this.handleApiResponse(response);
      }
      this.loading = false;
    });
  }

  handleApiResponse(response: any): void {
    const absences = response.filter((absence: any ) => !!absence.PartialTimeFrom && !!absence.PartialTimeTo);
    this.absences = absences;
    this.apiResponse = absences;
  } 

  updateView(): void {
    this.absences = [];
    this.loading = true;
    this.apiService.fetchDataFromApi('/Absences')
    .subscribe((response: any) => {
      if(response && !!response.length) {

        if(!this.lastSelectedDate) {
          this.handleApiResponse(response);
          return;
        }
        this.absences = this.getAbsencesBySelectedDate(this.lastSelectedDate);
        this.loading = false;
      }
    });
  }

  getAbsencesBySelectedDate(selectedDate: string): any[] {
    const selectedDateTime = new Date(selectedDate).getTime();
    const absences = this.apiResponse.filter((absence: any ) => 
      !!absence.PartialTimeFrom 
      && !!absence.PartialTimeTo
      && new Date(absence.PartialTimeFrom).getTime() <= selectedDateTime
      && new Date(absence.PartialTimeTo).getTime() >= selectedDateTime
    );
    return absences;
  }

  getDate(timestamp: string): string {
    const date = timestamp?.split('T') || [];
    return date[0];
  }

  search(): void {
    const selectedDate = this.form.get('selectedDate')?.value || '';
    this.lastSelectedDate = selectedDate;

    if(!selectedDate) {
      this.absences = this.apiResponse;
      return;
    }
    this.absences = this.getAbsencesBySelectedDate(selectedDate);
  }
}
