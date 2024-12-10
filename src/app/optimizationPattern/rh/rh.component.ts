import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { User, UsersService } from '../users.service';
import * as ChartJs from 'chart.js/auto';
import { UserListComponent } from '../user-list/user-list.component';
@Component({
  selector: 'app-rh',
  templateUrl: './rh.component.html',
  styleUrls: ['./rh.component.css'],
  standalone: true,
  imports: [UserListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RhComponent implements OnInit {
  private userService = inject(UsersService);

  oddUsers: User[];
  evenUsers: User[];
  chart: ChartJs.Chart | undefined;

  constructor() {
    this.oddUsers = this.userService.getOddOrEven(true);
    this.evenUsers = this.userService.getOddOrEven();
  }

  ngOnInit(): void {
    this.createChart();
  }

  addUser(list: User[], newUser: string) {
    // Instead of mutating the array directly, let's return a new array from service
    const updatedList = this.userService.addUser(list, newUser);
    if (list === this.oddUsers) {
      this.oddUsers = updatedList;
    } else {
      this.evenUsers = updatedList;
    }

    // If OnPush doesn't detect changes automatically,
    // we might need ChangeDetectorRef.markForCheck() here.
    // But usually input changes trigger detection.
    // If you need it:
    // this.cdr.markForCheck();

    // After adding a user, if you need to update the chart:
    this.updateChart();
  }

  createChart() {
    const data = [
      { users: 'Workers', count: this.oddUsers.length },
      { users: 'Boss', count: this.evenUsers.length },
    ];
    this.chart = new ChartJs.Chart('MyChart', {
      type: 'bar',
      data: {
        labels: data.map((row) => row.users),
        datasets: [
          {
            label: 'Entreprise stats',
            data: data.map((row) => row.count),
          },
        ],
      },
    });
  }

  updateChart() {
    if (this.chart) {
      this.chart.data.datasets[0].data = [
        this.oddUsers.length,
        this.evenUsers.length,
      ];
      this.chart.update();
    }
  }
}
