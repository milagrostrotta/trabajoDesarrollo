import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosFiltroComponent } from './cursos-filtro.component';

describe('CursosFiltroComponent', () => {
  let component: CursosFiltroComponent;
  let fixture: ComponentFixture<CursosFiltroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursosFiltroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursosFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
