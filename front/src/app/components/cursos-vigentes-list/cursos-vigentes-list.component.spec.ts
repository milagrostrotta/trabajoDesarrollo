import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosVigentesListComponent } from './cursos-vigentes-list.component';

describe('CursosVigentesListComponent', () => {
  let component: CursosVigentesListComponent;
  let fixture: ComponentFixture<CursosVigentesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursosVigentesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursosVigentesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
