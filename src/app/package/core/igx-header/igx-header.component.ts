import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'app-igx-header',
  templateUrl: './igx-header.component.html',
  styleUrls: ['./igx-header.component.scss']
})
export class IgxHeaderComponent implements OnInit {
  @Input() sidenav: MatSidenav
  constructor() { }

  ngOnInit(): void {
  }

}
