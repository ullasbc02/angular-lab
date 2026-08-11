import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { convertToParamMap } from '@angular/router';

import { ProjectTasks } from './project-tasks';
import { ApiService } from '../../services/api.service';

describe('ProjectTasks', () => {
  let component: ProjectTasks;
  let fixture: ComponentFixture<ProjectTasks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectTasks],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            parent: {
              paramMap: of(convertToParamMap({ id: '1' })),
            },
          },
        },
        {
          provide: ApiService,
          useValue: {
            getTasksByProject: () => of([]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectTasks);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
