import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-igx-sidenavbar',
  templateUrl: './igx-sidenavbar.component.html',
  styleUrls: ['./igx-sidenavbar.component.scss']
})
export class IgxSidenavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public navItems = [
    { name: 'account_circle', text: 'Avatar' },
    { name: 'error', text: 'Badge' },
    { name: 'group_work', text: 'Button Group' }
];

public selected = 'Avatar';

public navigate(item) {
    this.selected = item.text;
}
}
