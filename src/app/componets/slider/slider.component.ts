import { Component, AfterContentInit, ContentChildren, ViewChild, QueryList, ElementRef, Input } from '@angular/core';
import { SliderItemDirective } from './slider-item.directive';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements AfterContentInit {

    @ContentChildren(SliderItemDirective, { read: ElementRef }) items!: QueryList<ElementRef<HTMLDivElement>>;
  @ViewChild('slides') slidesContainer!: ElementRef<HTMLDivElement>;

    @Input() customTitle: string = "";
    @Input() customSubTitle: string = "";

  private slidesIndex = 0;

  get currentItem(): ElementRef<HTMLDivElement>|any {
    // if (this.items != undefined)
      return this.items?.find((item, index) => index === this.slidesIndex);
    // else return null
  }

  ngAfterContentInit() {
    console.log('items', this.items);
  }

  ngAfterViewInit() {
    console.log('slides', this.slidesContainer);
  }

  onClickLeft() {
    this.slidesContainer.nativeElement.scrollLeft -= this.currentItem.nativeElement.offsetWidth;
    
    if (this.slidesIndex > 0) {
      this.slidesIndex--;
    } 
  }

  onClickRight() {
    this.slidesContainer.nativeElement.scrollLeft += this.currentItem.nativeElement.offsetWidth;

    if (this.slidesIndex < this.items.length - 1) {
      this.slidesIndex++
    }
  }

}