import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateToDoItemComponent } from './create-to-do-item.component';

describe('CreateToDoItemComponent', () => {
  let component: CreateToDoItemComponent;
  let fixture: ComponentFixture<CreateToDoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateToDoItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateToDoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
