import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeadlineComponent } from '../../components/headline/headline.component';

@Component({
  selector: 'app-user-absences-create',
  standalone: true,
  imports: [HeadlineComponent, CommonModule, RouterLink, ReactiveFormsModule
  ],
  templateUrl: './user-absences-create.component.html',
  styleUrl: './user-absences-create.component.scss'
})
export class UserAbsencesCreateComponent implements OnInit {  
  form = new FormGroup({
    PartialTimeFrom: new FormControl('', Validators.minLength(1)),
    PartialTimeTo: new FormControl('', Validators.minLength(1)),
    AbsenceDefinitionId: new FormControl('', Validators.minLength(1)),
    Comment: new FormControl(''),
  });
  userId: string | null = '';
  absenceDefinitions: any[] = [];
  loading = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly apiService: ApiService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.apiService.fetchDataFromApi('/AbsenceDefinitions/')
    .subscribe((response: any) => {
      if(response && !!response.length) {
        this.absenceDefinitions = response;
        this.form.patchValue({
          AbsenceDefinitionId: response[0].Id,
          PartialTimeFrom: new Date().toISOString().split('T')[0],
          PartialTimeTo: new Date().toISOString().split('T')[0]
        });
      }
    });
  }

  createAbsence(): void {
    this.loading = true;

    const TimeStamp = new Date().toISOString();
    const PartialTimeFrom = this.form.get('PartialTimeFrom')?.value || '';
    const PartialTimeTo = this.form.get('PartialTimeTo')?.value || '';
    const AbsenceDefinitionId = this.form.get('AbsenceDefinitionId')?.value;
    const Comment = this.form.get('Comment')?.value || '';

    const absence = {
      UserId: this.userId,
      TimeStamp,
      PartialTimeFrom: new Date(PartialTimeFrom).toISOString(),
      PartialTimeTo: new Date(PartialTimeTo).toISOString(),
      AbsenceDefinitionId,
      Comment,
      Origin: 0,
      IsPartial: false,
      OverrideHolidayAbsence: true
    };

    this.apiService.postDataToApi('/Absences', absence).subscribe(() => {
      this.loading = false;
      this.router.navigate(['user-absences', this.userId]);
    });
  }

  isAbsenceDefinitionSelected(absenceDefinitionId: string): boolean {
    return this.form.get('AbsenceDefinitionId')?.value === absenceDefinitionId;
  }

}
