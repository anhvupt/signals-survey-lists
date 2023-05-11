import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Filters implements OnInit {
  @Input() set filterType(filterType: string) {
    this.input.update((value) => ({ ...value, filterType }));
  }
  @Input() set filterValues(filterValues: string[]) {
    this.input.update((value) => ({ ...value, filterValues }));
  }
  @Output() onFilterSelected: EventEmitter<string> = new EventEmitter<string>();

  selectedFilter = signal('');
  input = signal({ filterType: '', filterValues: [] });

  ngOnInit() {}

  selected(value: string): void {
    this.selectedFilter.update((prev) => (prev === value ? '' : value));
    this.onFilterSelected.emit(this.selectedFilter());
  }
}
