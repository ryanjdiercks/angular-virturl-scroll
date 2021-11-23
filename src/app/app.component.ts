import { Component, ChangeDetectionStrategy,ɵmarkDirty as markDirty  } from '@angular/core';

import { IntersectionStatus } from './from-intersection-observer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent  {
  list: Array<any> = [];
  visibilityStatus: {[key: number]: IntersectionStatus} = {};
  intersectionStatus = IntersectionStatus;
  
  ngOnInit() {
    for (let n = 0; n < 1000; n++) {
      this.list.push(n);
    }
  }

  onVisibilityChanged(index: number, status: IntersectionStatus) {
    this.visibilityStatus[index] = status;
  }

  trackByIndex(index: number) {
    return index;
  }
}