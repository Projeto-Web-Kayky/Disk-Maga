import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteDialog } from './cliente-dialog';

describe('ClienteDialog', () => {
  let component: ClienteDialog;
  let fixture: ComponentFixture<ClienteDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
