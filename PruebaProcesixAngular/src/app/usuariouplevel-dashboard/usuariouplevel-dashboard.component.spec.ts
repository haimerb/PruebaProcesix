
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariouplevelDashboardComponent } from './usuariouplevel-dashboard.component';

describe('UsuariouplevelDashboardComponent', () => {
  let component: UsuariouplevelDashboardComponent;
  let fixture: ComponentFixture<UsuariouplevelDashboardComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariouplevelDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariouplevelDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
