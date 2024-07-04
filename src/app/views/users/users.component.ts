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

  constructor(
    private readonly apiService: ApiService
  ) {}
  
   ngOnInit(): void {
     this.apiService.fetchDataFromApi('/Users?userType=0')
      .subscribe((response: any) => {
        console.log(response);
        this.usersList = response;
        this.apiResponse = response;
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
