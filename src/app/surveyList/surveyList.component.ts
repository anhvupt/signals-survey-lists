import { Component, OnInit, Input, signal } from '@angular/core';
import { Survey } from '../../types/Survey';

@Component({
  selector: 'survey-list',
  templateUrl: './surveyList.component.html',
  styleUrls: ['./surveyList.component.scss'],
})
export class SurveyList implements OnInit {
  @Input() set surveyList(value: Survey[]) {
    this.surveyListSignal.set(value);
  }
  surveyListSignal = signal([] as Survey[]);
  ngOnInit() {}
}
