import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeScheduleComponent } from './home-schedule.component';

describe('HomeScheduleComponent', () => {
  let component: HomeScheduleComponent;
  let fixture: ComponentFixture<HomeScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeScheduleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
