import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddElectionComponent } from './add-election.component';

describe('AddElectionComponent', () => {
  let component: AddElectionComponent;
  let fixture: ComponentFixture<AddElectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddElectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddElectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
