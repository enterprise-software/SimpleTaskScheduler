import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { isValidCron } from 'cron-validator'
import { cronExpressionValidator } from '../custom-validators/cronexpression.validort';

@Component({
  selector: 'app-task-schedule',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-schedule.component.html',
  styleUrl: './task-schedule.component.css'
})
export class TaskScheduleComponent {

  urlRegex = /^https:\/*(?:\w+(?::\w+)?@)?[^\s\/]+(?::\d+)?(?:\/[\w#!:.?+=&%@\-\/]*)?$/;

  formBuilder = inject(FormBuilder);

  taskSchedulerForm = this.formBuilder.group({
    cronExpressionControl: ['', [Validators.required, cronExpressionValidator()]],
    urlControl: ['', [Validators.required, Validators.pattern(this.urlRegex)]]
  })


  createJob() {
    console.info(this.taskSchedulerForm.value);
    console.warn(this.taskSchedulerForm.valid);
  }


  
}
