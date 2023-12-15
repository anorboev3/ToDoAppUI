import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateToDoItemComponentComponent } from './update-to-do-item-component.component';

describe('UpdateToDoItemComponentComponent', () => {
  let component: UpdateToDoItemComponentComponent;
  let fixture: ComponentFixture<UpdateToDoItemComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateToDoItemComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateToDoItemComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
