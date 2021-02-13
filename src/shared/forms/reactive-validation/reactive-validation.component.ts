import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';

import { REQUIRED_MESSAGE } from '../constants/validation-messages-list';
import { PATTERNS_LIST } from '../constants/validation-patterns-list';

@Component({
  selector: 'app-reactive-validation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reactive-validation.component.html',
  styleUrls: ['./reactive-validation.component.scss'],
})
export class ReactiveValidationComponent implements OnChanges {
  @Input() validationErrors: object | null = null;
  @Input() name: string = '';

  errorMessage: string | null = null;

  ngOnChanges(): void {
    this.errorMessage = this.getErrorMessage();
  }

  getErrorMessage(): string | null {
    const errors = this.validationErrors;
    if (errors) {
      return errors['required']
        ? this.name +
            REQUIRED_MESSAGE /** <----------- Data should be filled     */
        : errors['pattern']
        ? this.getPatternMessage(
            errors['pattern']['requiredPattern']
          ) /** <----------- Data should match pattern */
        : null; /** <----------- Data is filled correctly  */
    }
    return null;
  }

  /**
   * Method 'getPatternMessage' finds proper pattern message form patterns list
   * and returns the message.
   */
  getPatternMessage(requiredPattern: string): string {
    return PATTERNS_LIST.filter((x) => x['PATTERN'] === requiredPattern)[0][
      'MESSAGE'
    ];
  }
}
