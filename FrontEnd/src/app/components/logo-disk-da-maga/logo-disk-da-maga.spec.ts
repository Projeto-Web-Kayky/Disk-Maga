import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoDiskDaMaga } from './logo-disk-da-maga';

describe('LogoDiskDaMaga', () => {
  let component: LogoDiskDaMaga;
  let fixture: ComponentFixture<LogoDiskDaMaga>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoDiskDaMaga]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoDiskDaMaga);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
