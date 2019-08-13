
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicialDashboardComponent } from './inicial-dashboard.component';

describe('InicialDashboardComponent', () => {
  let component: InicialDashboardComponent;
  let fixture: ComponentFixture<InicialDashboardComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InicialDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicialDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
