import { Component, OnInit } from '@angular/core';
import { HeadlineComponent } from '../../components/headline/headline.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TOKEN_IN_STORAGE } from '../../../constants';
import { StorageService } from '../../services/storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [HeadlineComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  dataUpdated = false;

  constructor(
    private readonly storageService: StorageService
  ) { }

  form = new FormGroup({
    accessToken: new FormControl(this.storageService.getAccessToken(), Validators.required)
  });

  onFormSubmit(): void {
    this.dataUpdated = false;
    
    const accessTokenInputValue = this.form.get('accessToken')?.value;

    this.storageService.setAccessToken(accessTokenInputValue?.toString());
    this.dataUpdated = true;
  }
}
