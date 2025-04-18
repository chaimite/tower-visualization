import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TowerComponent } from './tower.component';
import { StoreModule } from '@ngrx/store';

describe('TowerComponent', () => {
  let component: TowerComponent;
  let fixture: ComponentFixture<TowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TowerComponent, StoreModule.forRoot({})]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
