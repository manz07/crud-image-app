import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKucingDialogComponent } from './add-kucing-dialog.component';

describe('AddKucingDialogComponent', () => {
  let component: AddKucingDialogComponent;
  let fixture: ComponentFixture<AddKucingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddKucingDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddKucingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
