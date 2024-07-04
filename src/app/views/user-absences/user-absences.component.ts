import { Component, OnInit } from '@angular/core';
import { HeadlineComponent } from '../../components/headline/headline.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-absences',
  standalone: true,
  imports: [HeadlineComponent, CommonModule, RouterLink],
  templateUrl: './user-absences.component.html',
  styleUrl: './user-absences.component.scss'
})
export class UserAbsencesComponent implements OnInit {
  userId: string | null = '';
  absences: any[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');

    this.apiService.fetchDataFromApi('/Absences/' + this.userId)
    .subscribe((response: any) => {
      if(response && !!response.length) {
        this.absences = response;
      }
    });
  }
}
