import {
  Component,
  OnInit,
  signal,
  ChangeDetectionStrategy,
  computed,
} from '@angular/core';
import { Survey } from '../types/Survey';

interface IParams {
  category: string;
  status: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  statuses: string[] = ['All', 'Active', 'Completed'];
  categories: string[] = ['Development', 'Workplace', 'Hardware'];
  status = 'status';
  category = 'category';

  params = signal<IParams>({ category: '', status: '' });

  filteredListSignal = computed(() => {
    const params = this.params();
    const hasStatus = (x: Survey) =>
      !params.status || params.status === 'All'
        ? true
        : x.status === params.status;
    const hasCategory = (x: Survey) =>
      !params.category ? true : x.category === params.category;
    return surveyList.filter((x) => hasCategory(x) && hasStatus(x));
  });

  ngOnInit() {}

  onFilterSelected(filter: string, type: keyof IParams) {
    this.params.update((value) => ({ ...value, [type]: filter }));
  }
}

const surveyList: Survey[] = [
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
