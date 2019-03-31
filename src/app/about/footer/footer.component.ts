import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public bundling = false;

  constructor() {
    this.bundling = environment.bundling;
  }

  ngOnInit() {
  }

}
