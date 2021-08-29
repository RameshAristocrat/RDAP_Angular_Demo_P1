import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import * as breadcrumbdata from 'src/assets/config/breadcrumb-details';

@Component({
  selector: 'app-rdap-shared-breadcrumb',
  templateUrl: './rdap-shared-breadcrumb.component.html',
  styleUrls: ['./rdap-shared-breadcrumb.component.scss']
})
export class RdapSharedBreadcrumbComponent implements OnInit {

  breadcrumbList: any[];
  breadcrumbLinksList: any[];
  breadcrumbarr: any[];
  breadcrumbdetails: any[];
  route: string;
  routeName: string;
  constructor(private httpClient: HttpClient, private location: Location, private router: Router) {
    this.breadcrumbdetails = [];
    this.router.events.subscribe((val) => {
      if (location.path() != '') {
        this.route = location.path();
        this.routeName = this.route.split('/')[this.route.split('/').length - 1];
        if (breadcrumbdata.breadcrumb) {
          this.breadcrumbdetails = breadcrumbdata.breadcrumb;
          console.log(this.breadcrumbdetails)
          this.breadcrumb();
        }
      } else {
        this.route = 'Home'
        if (breadcrumbdata.breadcrumb) {
          this.breadcrumbdetails = breadcrumbdata.breadcrumb;
          console.log(this.breadcrumbdetails)
          this.breadcrumb();
        }
      }
    });
    // this.httpClient.get("assets/config/breadcrumb-details.json").subscribe(data => {
    //   //console.log(data)
    //   this.breadcrumbdetails.push(data);
    //   this.breadcrumb();
    // });
  }

  ngOnInit(): void {
    // console.log(this.breadcrumbarr);
    // console.log(this.breadcrumbLinksList);
  }

  breadcrumb() {
    this.breadcrumbList = [];
    this.breadcrumbLinksList = [];
    this.breadcrumbarr = [];
    let tempBreadcrumbDetail = [];
    this.breadcrumbarr.push({ label: "Home", url: "/home/dashboard" });
    console.log("breadcrumbarr",this.breadcrumbarr)
    if(this.route){
      this.breadcrumbList = this.route.split('/');
      console.log(this.breadcrumbList)
      this.breadcrumbList = this.breadcrumbList.filter(function (e) {return e != null;});
      this.breadcrumbLinksList = [this.breadcrumbList[0]];
      for (let i = 1; i <= this.breadcrumbList.length; i++) {
        const link = this.breadcrumbLinksList[i - 1] + '/' + this.breadcrumbList[i]
        this.breadcrumbLinksList.push(link);
        //this.breadcrumbList[i]
        if ((i > 1) && (i < this.breadcrumbList.length)) {
          if (this.breadcrumbList[i] == "dashboard") {
            this.breadcrumbarr.push({ label: "Dashboard", url: "/home/dashboard" });
          } else {
            tempBreadcrumbDetail = this.breadcrumbdetails.filter(x => {
              console.log(this.breadcrumbList[this.breadcrumbList.length-1]);
              if (x.page == this.breadcrumbList[i]) {
                if (x.details.length > 1) {
                  this.breadcrumbarr.push(x.details.filter(x => { return x.url == this.route })[0]);
                } else {
                  this.breadcrumbarr.push(x.details[0]);
                }
              }
            });
          }
  
        }
      }
    }
  }

}
