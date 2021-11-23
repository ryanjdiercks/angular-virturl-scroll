import { Directive, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {fromIntersectionObserver, IntersectionStatus} from './from-intersection-observer';

@Directive({
  selector: '[intersectionObserver]'
})
export class IntersectionObserverDirective implements OnInit {
  @Input() intersectionDebounce = 0;
  @Input() intersectionRootMargin = '0px';
  @Input() intersectionRoot: any;
  @Input() intersectionThreshold: any;

  @Output() visibilityChange = new EventEmitter<IntersectionStatus>();

  private destroy$ = new Subject();

  constructor(private element: ElementRef) {}

  ngOnInit() {
    const element = this.element.nativeElement;
    const config = {
      root: this.intersectionRoot,
      rootMargin: this.intersectionRootMargin,
      threshold: this.intersectionThreshold
    };

    fromIntersectionObserver(
      element,
      config,
      this.intersectionDebounce
    ).pipe(
      takeUntil(this.destroy$)
    ).subscribe((status) => {
      this.visibilityChange.emit(status);
    });
  }
}