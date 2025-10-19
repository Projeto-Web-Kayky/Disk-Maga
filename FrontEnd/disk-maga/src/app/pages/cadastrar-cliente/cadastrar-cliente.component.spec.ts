import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastrarCliente } from './cadastrar-cliente.component';

describe('CadastrarCliente', () => {
  let component: CadastrarCliente;
  let fixture: ComponentFixture<CadastrarCliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarCliente]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CadastrarCliente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
