import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservarConsultaComponent } from './reservar-consulta.component';

describe('ReservarConsultaComponent', () => {
  let component: ReservarConsultaComponent;
  let fixture: ComponentFixture<ReservarConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservarConsultaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservarConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
