import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGameSettingsComponent } from './dialog-game-settings.component';

describe('DialogGameSettingsComponent', () => {
  let component: DialogGameSettingsComponent;
  let fixture: ComponentFixture<DialogGameSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogGameSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogGameSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
