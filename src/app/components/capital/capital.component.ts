import { JsonPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-capital',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './capital.component.html',
  styleUrl: './capital.component.scss',
})
export class CapitalComponent implements OnInit {
  @Input({ required: true }) data: any;

  quizData = new Map<string, string>();

  buttonList: Array<string> = [];

  selectedValues: Array<any> = [];

  ngOnInit(): void {
    Object.keys(this.data).forEach((key: string) => {
      let value: string = this.data[key] ?? '';
      if (value.length > 0) {
        this.quizData.set(key, value);
      }
    });
    this.initializeButtonList();
  }

  initializeButtonList() {
    this.buttonList = [];
    this.quizData.forEach((value, key) => {
      this.buttonList.push(key);
      this.buttonList.push(value);
    });
    this.buttonList.sort(() => Math.random() - 0.5);
  }

  removeItem(key: string) {
    this.quizData.delete(key);
    this.initializeButtonList();
    this.selectedValues = [];
  }

  wrongPair() {
    this.selectedValues.forEach((value) => {
      value.html.target.classList.add('wrong-pair');
    });
    this.selectedValues = [];
  }

  onItemSelect(value: string, event: any) {
    document.querySelectorAll('button').forEach((value) => {
      value.classList.remove('wrong-pair', 'button-selected');
    });
    if (this.selectedValues.length === 2) {
      return;
    } else {
      this.selectedValues.push({ value: value, html: event });
      event.target.classList.add('button-selected');
      if (this.selectedValues.length === 2) {
        if (this.quizData.get(this.selectedValues[0].value)) {
          this.selectedValues[1].value ===
            this.quizData.get(this.selectedValues[0].value)
            ? this.removeItem(this.selectedValues[0].value)
            : this.wrongPair();
        } else {
          this.selectedValues[0].value ===
            this.quizData.get(this.selectedValues[1].value)
            ? this.removeItem(this.selectedValues[1].value)
            : this.wrongPair();
        }
      }
    }
  }
}
