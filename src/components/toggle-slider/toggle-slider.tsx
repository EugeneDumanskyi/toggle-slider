import {Component, Event, EventEmitter, h} from '@stencil/core';

@Component({
  tag: 'toggle-slider',
  styleUrl: 'toggle-slider.css',
  shadow: true
})
export class ToggleSlider {
  @Event() onChange: EventEmitter;

  private thumb!: HTMLDivElement;
  private checkbox!: HTMLInputElement;
  private readonly width: number;
  private readonly thumbSize: number;
  private readonly padding: number;
  private x: number = 0;
  private progress: number = 0;
  private dragging: boolean = false;

  constructor() {
    const globalStyles = getComputedStyle(document.documentElement);
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.width = parseInt(globalStyles.getPropertyValue('--width')) || 200;
    this.thumbSize = parseInt(globalStyles.getPropertyValue('--height')) || 54;
    this.padding = parseInt(globalStyles.getPropertyValue('--padding')) || 4;
  }

  private mouseDown(e: MouseEvent) {
    this.dragging = true;
    this.thumb.style.transition = 'none';
    this.x = this.thumb.offsetLeft - e.clientX;
  }

  private mouseLeave() {
    if (this.dragging) {
      this.mouseUp();
    }
  }

  private mouseMove(e: MouseEvent) {
    e.preventDefault();
    if (this.dragging) {
      let left = e.clientX + this.x;
      const maxLeft = this.width - this.thumbSize + this.padding;
      left = left < this.padding ? this.padding : left;
      left = left > maxLeft ? maxLeft : left;
      const newProgress = (left + this.thumbSize / 2) / this.width * 100;
      this.thumb.style.left = left + 'px';
      this.progress = newProgress;
    }
  }

  private mouseUp() {
    if (!this.dragging) {
      return;
    }
    if(!this.checkbox.checked) {
      this.handleUnChecked();
    } else {
      this.handleChecked();
    }
    this.dragging = false;
    this.thumb.style.transition = '';
  }

  private handleUnChecked() {
    if (this.progress >= 50) {
      this.thumb.style.left = (this.width - this.thumbSize + this.padding) + 'px';
      this.checkbox.checked = true;
      this.onChange.emit(this.checkbox.checked);
    } else {
      this.thumb.style.left = this.padding + 'px';
    }
  }

  private handleChecked() {
    if (this.progress < 50) {
      this.thumb.style.left = this.padding + 'px';
      this.checkbox.checked = false;
      this.onChange.emit(this.checkbox.checked);
    } else {
      this.thumb.style.left = (this.width - this.thumbSize + this.padding) + 'px';
    }
  }

  render() {
    return (
      <label class="toggle-slider">
        <input type="checkbox" ref={(el) => this.checkbox = el as HTMLInputElement}/>
        <div class="slider-thumb"
             ref={(el) => this.thumb = el as HTMLDivElement}
             onClick={(e: MouseEvent) => e.preventDefault()}
             onMouseDown={this.mouseDown}
             onMouseMove={this.mouseMove}
             onMouseUp={this.mouseUp}
             onMouseLeave={this.mouseLeave}/>
        <span class="slider round" onClick={(e: MouseEvent) => e.preventDefault()}/>
      </label>
    );
  }
}
