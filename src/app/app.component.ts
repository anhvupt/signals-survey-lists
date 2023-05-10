import { Component, OnInit, OnDestroy } from '@angular/core';
import { Survey } from '../types/Survey';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface IParams {
  category: string;
  status: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  statuses: string[] = ['All', 'Active', 'Completed'];
  categories: string[] = ['Development', 'Workplace', 'Hardware'];
  status = 'status';
  category = 'category';

  paramsSubject = new BehaviorSubject<IParams>({ category: '', status: '' });
  destroySubject = new Subject<unknown>();
  params$ = this.paramsSubject.asObservable();

  surveyList: Survey[] = [
    {
      title: 'Designer Survey',
      category: 'Workplace',
      status: 'Active',
      label: 'New Framework',
    },
    {
      title: 'Developer Survey',
      category: 'Development',
      status: 'Active',
      label: 'Education',
    },
    {
      title: 'Backend Survey',
      category: 'Hardware',
      status: 'Completed',
      label: 'Personal',
    },
  ];

  filteredList: Survey[];

  ngOnInit() {
    this.params$.pipe(takeUntil(this.destroySubject)).subscribe((params) => {
      const hasStatus = (x: Survey) =>
        !params.status || params.status === 'All'
          ? true
          : x.status === params.status;
      const hasCategory = (x: Survey) =>
        !params.category ? true : x.category === params.category;
      this.filteredList = this.surveyList.filter(
        (x) => hasCategory(x) && hasStatus(x)
      );
    });
  }

  onFilterSelected(filter: string, type: keyof IParams) {
    const params = { ...this.paramsSubject.value, [type]: filter };
    this.paramsSubject.next(params);
  }

  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }
}
