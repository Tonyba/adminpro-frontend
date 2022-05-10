import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html',
  styles: [],
})
export class IncreaserComponent implements OnInit {
  @Input('value') progress: number = 0;
  @Input() btnClass: string = 'btn btn-primary';

  @Output() onChangeValue: EventEmitter<number> = new EventEmitter();

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  get getProgress() {
    return `${this.progress}%`;
  }

  changeValue(value: number) {
    if (this.progress >= 100 && this.progress >= 0) {
      this.onChangeValue.emit(100);
      return (this.progress = 100);
    }

    if (this.progress <= 0 && this.progress < 0) {
      this.onChangeValue.emit(0);
      return (this.progress = 0);
    }

    this.progress += value;
    this.onChangeValue.emit(this.progress);

    return;
  }

  onChange(value: number) {
    if (value >= 100) {
      this.progress = 100;
    } else if (value <= 0) {
      this.progress = 0;
    } else {
      this.progress = value;
    }
    this.onChangeValue.emit(value);
  }
}
