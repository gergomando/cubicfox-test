import { Component, OnInit } from '@angular/core';
import { HeadlineComponent } from '../../components/headline/headline.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TOKEN_IN_STORAGE } from '../../../constants';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [HeadlineComponent, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

  constructor(
    private readonly storageService: StorageService
  ) { }

  form = new FormGroup({
    accessToken: new FormControl(this.storageService.getAccessToken(), Validators.minLength(1))
  });

  onFormSubmit(): void {
    const accessTokenInputValue = this.form.get('accessToken')?.value;

    this.storageService.setAccessToken(accessTokenInputValue?.toString());
  }
}
