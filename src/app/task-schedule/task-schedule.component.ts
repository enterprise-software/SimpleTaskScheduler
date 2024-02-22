import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DataScraping } from '../models/data-scraping';

@Component({
  selector: 'app-task-schedule',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './task-schedule.component.html',
  styleUrl: './task-schedule.component.css'
})
export class TaskScheduleComponent {

  urlRegex = /^https:\/*(?:\w+(?::\w+)?@)?[^\s\/]+(?::\d+)?(?:\/[\w#!:.?+=&%@\-\/]*)?$/;
  isCronExecuting: boolean = false;
  isBadRequest: boolean = false;
  scrapingResult: DataScraping[] = new Array<DataScraping>;
  errorCallingWebApi: boolean = false;
  private urlTaskSchedulerWebApi:string = "https://rataskschedulerwebapi20240222172016.azurewebsites.net";
  constructor(private http: HttpClient, private formBuilder: FormBuilder){}

  ngOnInit() {      

  }

  taskSchedulerForm = this.formBuilder.group({
    cronExpressionControl: ['* * * ? * *', [Validators.required]], //Every second (https://www.freeformatter.com/cron-expression-generator-quartz.html)
    urlControl: ['https://en.wikipedia.org/wiki/List_of_programmers', [Validators.required, Validators.pattern(this.urlRegex)]]
  })


  runJob() {
    const cronExpress: string = this.taskSchedulerForm.get('cronExpressionControl')?.getRawValue()
    const urlToScraping: string = this.taskSchedulerForm.get('urlControl')?.getRawValue()
    const params = new HttpParams()
    .set('cronExpression', cronExpress)
    .set('url', urlToScraping);
    this.http.post<any>(`${this.urlTaskSchedulerWebApi}/TaskScheduler`, null, { params }).subscribe(result => {
      this.isCronExecuting = result;
      result ? this.isBadRequest = false: this.isBadRequest = true;
    },
    error => {
      this.errorCallingWebApi = true;
    });
  }

  stopJob() {
    this.http.get<any>(`${this.urlTaskSchedulerWebApi}/TaskScheduler`).subscribe(data => {
      console.log(data);
      this.isCronExecuting = false;
      this.scrapingResult = data;
    });
  }

  showErrorBadRequest() {
    return this.isBadRequest;
  }

  getIsCronExecuting() {
    return this.isCronExecuting;
  }


  
}
