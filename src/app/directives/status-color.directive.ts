import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appStatus]'
})
export class StatusColorDirective implements OnChanges{

  @Input() appStatus?: boolean;

  constructor(private el: ElementRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.appStatus) {
      this.el.nativeElement.style.backgroundColor = 'grey';
    } else {
      this.el.nativeElement.style.backgroundColor = 'transparent';
    }
  }
}
