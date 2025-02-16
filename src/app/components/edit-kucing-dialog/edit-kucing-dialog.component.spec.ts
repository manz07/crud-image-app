import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditKucingDialogComponent } from './edit-kucing-dialog.component';

describe('EditKucingDialogComponent', () => {
  let component: EditKucingDialogComponent;
  let fixture: ComponentFixture<EditKucingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditKucingDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditKucingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
