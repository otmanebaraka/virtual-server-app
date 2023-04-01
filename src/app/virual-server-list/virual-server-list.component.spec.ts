import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirualServerListComponent } from './virual-server-list.component';

describe('VirualServerListComponent', () => {
  let component: VirualServerListComponent;
  let fixture: ComponentFixture<VirualServerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VirualServerListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VirualServerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
