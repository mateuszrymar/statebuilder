import { Component, Input } from '@angular/core';
import { Point } from '../math/point';
import { Line } from '../math/line';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent {
  @Input({required: true}) line: Line = Line.fromPoints(new Point(0,0), new Point(0,0));
}
