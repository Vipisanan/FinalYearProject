import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyRegisterComponent } from './party-register.component';

describe('PartyRegisterComponent', () => {
  let component: PartyRegisterComponent;
  let fixture: ComponentFixture<PartyRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
