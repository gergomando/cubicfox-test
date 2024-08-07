import { Routes } from '@angular/router';
import { SettingsComponent } from './views/settings/settings.component';
import { AbsencesComponent } from './views/absences/absences.component';
import { UsersComponent } from './views/users/users.component';
import { UserCreateComponent } from './views/user-create/user-create.component';
import { UserAbsencesComponent } from './views/user-absences/user-absences.component';
import { UserAbsencesCreateComponent } from './views/user-absences-create/user-absences-create.component';
import { TOKEN_IN_STORAGE } from '../constants';

const accessToken = window.localStorage.getItem(TOKEN_IN_STORAGE);

export const routes: Routes = [
  { path: '', redirectTo: !!accessToken ? '/users' : '/settings', pathMatch: 'full'},
  { path: 'settings', component: SettingsComponent },
  { path: 'absences', component: AbsencesComponent },
  { path: 'users', component: UsersComponent },
  { path: 'user-create', component: UserCreateComponent },
  { path: 'user-absences/:id', component: UserAbsencesComponent },
  { path: 'user-absences-create/:id', component: UserAbsencesCreateComponent }
]
