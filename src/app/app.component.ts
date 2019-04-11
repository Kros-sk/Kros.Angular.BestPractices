import { Component } from '@angular/core';
import { sumTwoNumbers } from '@kros-sk/test-package';

@Component({
  selector: 'kros-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'KROS Angular best practices';

  public sumTwoNums(a: number, b: number): number {
    return sumTwoNumbers(a, b);
  }

}
