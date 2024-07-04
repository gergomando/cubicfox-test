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
  loading = false;
  error = false;
  
  constructor(
    private readonly route: ActivatedRoute,
    private readonly apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.error = false;
    this.userId = this.route.snapshot.paramMap.get('id');
    this.loading = true;
    this.apiService.fetchDataFromApi('/Absences')
    .subscribe((response: any) => {
      if (response.status === 401) {
        this.loading = false;
        this.error = true;
        return;
      }

      if(response && !!response.length) {
        this.absences = response.filter((absence: any) => absence.UserId === this.userId);
      }
      this.loading = false;
    });
  }

  getDate(timestamp: string): string {
    const date = timestamp?.split('T') || [];
    return date[0];
  }
}
