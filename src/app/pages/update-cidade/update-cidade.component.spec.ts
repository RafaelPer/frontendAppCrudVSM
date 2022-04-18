import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCidadeComponent } from './update-cidade.component';

describe('UpdateCidadeComponent', () => {
  let component: UpdateCidadeComponent;
  let fixture: ComponentFixture<UpdateCidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCidadeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
