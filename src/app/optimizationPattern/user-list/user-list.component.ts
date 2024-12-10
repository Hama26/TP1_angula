import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {User} from "../users.service";
import { FormsModule } from '@angular/forms';
import { FiboPipe } from 'src/app/cv/pipes/fibo.pipe';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css'],
    standalone: true,
    imports: [FormsModule, FiboPipe, CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {
  @Input() usersCluster: string = '';
  @Input() users: User[] = [];
  @Output() add = new EventEmitter<string>();
  userFullName: string = '';
  addUser() {
    this.add.emit(this.userFullName);
    this.userFullName = '';
  }

  trackUser(index: number, user: User) {
    return user.name; // Assumes names are unique enough; otherwise use a unique ID
  }
}
