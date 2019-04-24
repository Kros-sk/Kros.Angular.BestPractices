import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user.model';

@Component({
  selector: 'kros-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor() { }

  @Input() user: User;

  ngOnInit() {
  }

}
