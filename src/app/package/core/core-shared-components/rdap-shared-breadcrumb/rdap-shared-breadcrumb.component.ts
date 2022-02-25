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
  tempjoin:any[];
  constructor(private httpClient: HttpClient, private location: Location, private router: Router) {
    this.breadcrumbdetails = [];
    this.router.events.subscribe((val) => {
      if (location.path() != '') {
        this.route = location.path();
        this.routeName = this.route.split('/')[this.route.split('/').length - 1];
        if (breadcrumbdata.breadcrumb) {
          this.breadcrumbdetails = breadcrumbdata.breadcrumb;
          this.breadcrumb();
        }
      } else {
        this.route = 'Home'
        if (breadcrumbdata.breadcrumb) {
          this.breadcrumbdetails = breadcrumbdata.breadcrumb;
          this.breadcrumb();
        }
      }
    });
    // this.httpClient.get("assets/config/breadcrumb-details.json").subscribe(data => {
    //   this.breadcrumbdetails.push(data);
    //   this.breadcrumb();
    // });
  }

  ngOnInit(): void {
  }

  breadcrumb() {
    this.breadcrumbList = [];
    this.breadcrumbLinksList = [];
    this.breadcrumbarr = [];
    let tempBreadcrumbDetail = [];
    this.breadcrumbarr.push({ label: "Home", url: "/home/dashboard" });
    if(this.route){
      this.breadcrumbList = this.route.split('/');
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
            let finalUrl;
            tempBreadcrumbDetail = this.breadcrumbdetails.filter(x => {
              if (x.page == this.breadcrumbList[i]) {
                if (x.details.length > 1) {
                  if(x.page == "extrapinrequest"){
                    if(this.route.includes('view')){
                      this.tempjoin = this.route.split('/');
                      this.tempjoin.splice(- 1, 1);
                      finalUrl = this.tempjoin.join('/');
                      
                      this.breadcrumbarr.push(x.details.filter(x => { return x.url == finalUrl })[0]);
                    }else{
                      this.breadcrumbarr.push(x.details.filter(x => { return x.url == this.route })[0]);
                    }
                  }
                  else if(x.page == "reworkrequest"){
                    if(this.route.includes('view')){
                      this.tempjoin = this.route.split('/');
                      this.tempjoin.splice(- 1, 1);
                      finalUrl = this.tempjoin.join('/');
                      
                      this.breadcrumbarr.push(x.details.filter(x => { return x.url == finalUrl })[0]);
                    }else{
                      this.breadcrumbarr.push(x.details.filter(x => { return x.url == this.route })[0]);
                    }
                  }
                  else if(x.page == "blanketpinreq"){
                    if(this.route.includes('view')){
                      this.tempjoin = this.route.split('/');
                      this.tempjoin.splice(- 1, 1);
                      finalUrl = this.tempjoin.join('/');
                      
                      this.breadcrumbarr.push(x.details.filter(x => { return x.url == finalUrl })[0]);
                    }else{
                      this.breadcrumbarr.push(x.details.filter(x => { return x.url == this.route })[0]);
                    }
                  }
                  else{
                    this.breadcrumbarr.push(x.details.filter(x => { return x.url == this.route })[0]);
                  }
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
