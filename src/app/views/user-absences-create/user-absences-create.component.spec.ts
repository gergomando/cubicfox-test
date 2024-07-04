import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAbsencesCreateComponent } from './user-absences-create.component';

describe('UserAbsencesCreateComponent', () => {
  let component: UserAbsencesCreateComponent;
  let fixture: ComponentFixture<UserAbsencesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAbsencesCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserAbsencesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
