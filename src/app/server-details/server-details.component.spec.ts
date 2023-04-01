import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

import { ServerDetailsComponent } from './server-details.component';
import { BackendService } from '../services/backend.service';

describe('ServerDetailsComponent', () => {
  let component: ServerDetailsComponent;
  let fixture: ComponentFixture<ServerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule],
      declarations: [ ServerDetailsComponent ],
      providers:[BackendService,{ provide: ActivatedRoute, useValue: { params: of({id: 1}) } }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
