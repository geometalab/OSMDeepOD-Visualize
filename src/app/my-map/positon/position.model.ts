export class Position {
  constructor(public latitude: number, public   longitude: number, public raw: string) {
  };

  toString() {
    return "Latitude: " + this.latitude + " Longitude: " + this.longitude;
  }
  toHtml() {
    return "Latitude: " + this.latitude + "<br> Longitude: " + this.longitude;
  }

}
