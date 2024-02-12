import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Signal,
  WritableSignal,
  effect,
  signal,
} from '@angular/core';

interface QuizRecord {
  content: string;
  pairWith: string;
}
@Component({
  selector: 'app-capital',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './capital.component.html',
  styleUrl: './capital.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CapitalComponent {
  protected quizData = signal<QuizRecord[]>([]);

  @Input({ required: true }) set data(data: { [x: string]: string }) {
    let tempList: any[] = [];
    Object.keys(data).forEach((key: string) => {
      tempList.push({ content: data[key], pairWith: key });
      tempList.push({ content: key, pairWith: data[key] });
    });
    this.quizData.set(tempList);
  }

  selectedValues = signal<QuizRecord | null>(null);
  wrongPairMap = signal<QuizRecord | null>(null);

  wrongPair(value: QuizRecord) {
    this.wrongPairMap.set({
      content: this.selectedValues()?.content ?? '',
      pairWith: value.content,
    });
  }

  onItemSelect(value: QuizRecord) {
    if (this.selectedValues()) {
      if (this.selectedValues()?.content === value.pairWith) {
        this.quizData.update((list) => {
          return list.filter(
            (qObj) =>
              qObj.content !== value.content && qObj.content !== value.pairWith
          );
        });
        this.selectedValues.set(null);
        this.wrongPairMap.set(null);
      } else {
        this.wrongPair(value);
        this.selectedValues.set(null);
      }
      return;
    }
    this.wrongPairMap.set(null);
    this.selectedValues.set(value);
  }
}
