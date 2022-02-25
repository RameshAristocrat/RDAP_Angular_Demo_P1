import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit(): void {
    let tokenSessionData = JSON.parse(localStorage.getItem("okta-token-storage"));
    if(tokenSessionData){
      this._router.navigate(["/home/dashboard"]);
    }
  }

}
