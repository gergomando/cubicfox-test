import { Component, OnInit } from '@angular/core';
import { HeadlineComponent } from '../../components/headline/headline.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    HeadlineComponent,
    ReactiveFormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  usersList: any[] = [];
  apiResponse: any[] = [];
  searchForm = new FormGroup({
    firstName: new FormControl('', Validators.minLength(1)),
    lastName: new FormControl('', Validators.minLength(1)),
  });
  loading = false;
  error = false;

  constructor(
    private readonly apiService: ApiService
  ) {}
  
   ngOnInit(): void {
    this.error = false;
    this.loading = true;
    this.apiService.fetchDataFromApi('/Users?userType=0')
      .subscribe((response: any) => {
        if (response.status === 401) {
          this.loading = false;
          this.error = true;
          return;
        }

        this.usersList = response;
        this.apiResponse = response;
        this.loading = false;
      });
   }

  search(): void {
    const searchTermFirstName = this.searchForm.get('firstName')?.value;
    const searchTermLastName = this.searchForm.get('lastName')?.value;
    let usersList = this.apiResponse;
    
    if (searchTermFirstName)
      usersList = usersList.filter(user => user.FirstName === searchTermFirstName);
    
    if (searchTermLastName)
      usersList = usersList.filter(user => user.LastName === searchTermLastName);
    
    this.usersList = usersList;
  }

}
