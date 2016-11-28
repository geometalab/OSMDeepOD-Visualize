import {Injectable} from '@angular/core';
import {Position} from './position.model'
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class PositionService {
  private positionsUrl = '/positions';

  constructor(private http: Http) {
  }

  getPositions(): Observable<Position[]> {
    return this.http.get(this.positionsUrl)
      .map(this.extractGetData)
      .catch(this.handleError);
  }

  removePosition(positon: Position): Observable<Number> {
    return this.http.delete(this.positionsUrl + '/' + positon.raw)
      .catch(this.handleError);
  }

  deleteAll(): Observable<Number> {
    return this.http.delete(this.positionsUrl)
      .catch(this.handleError);
  }

  private extractGetData(res: Response) {
    let body = res.json();
    let points: Position[] = [];
    for (var i in body) {
      var entry = JSON.parse(body[i]);
      points.push(new Position(entry.coordinates[0], entry.coordinates[1], body[i]));
    }
    return points;
  }


  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
