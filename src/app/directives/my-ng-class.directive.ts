import { Directive, ElementRef, Renderer2, DoCheck, Input } from '@angular/core';

@Directive({
  selector: '[myNgClass]'
})
export class MyNgClassDirective implements DoCheck {

  private initialClasses: string[] = [];

  @Input('myNgClass') set classes(classes: string) {

    // TODO delete
    console.log(classes);
    if(typeof classes === 'string' && classes) {
      this.removeClasses(this.initialClasses);
      this.initialClasses = classes.split(/\s+/);
      this.applyClasses(this.initialClasses);   
    }
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { 
  }

  ngDoCheck() {
  }

  private applyClasses(classes: string[]) {
    classes.forEach(item => this.renderer.addClass(this.elementRef.nativeElement, item));
  }

  private removeClasses(classes: string[]) {
    classes.forEach(item => this.renderer.removeClass(this.elementRef.nativeElement, item));
  }
}
