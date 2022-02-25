import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class BehaviourSubjectService {

  constructor() { }

  public masterDetailsView = new Subject<any>();

    // function to pass data to other component
    setViewSelectedMasterDetails(data: any) {
      this.masterDetailsView.next(data);
    }
  
    // function to receive passed click event from other component
    getViewSelectedMasterDetails(): Observable<any> {
      return this.masterDetailsView.asObservable();
    }
}
