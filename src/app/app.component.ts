import {Component} from '@angular/core';
import {PositionService} from './my-map/positon/position.service';


@Component({
  selector: 'detection-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private errorMessage: string;
  title = 'OSMDeepOD-Visualize';

  constructor(private positionService: PositionService) {
  }

  deleteAllRedisEntries() {
    this.positionService.deleteAll()
      .subscribe(error => this.errorMessage = <any>error);
  }
}
