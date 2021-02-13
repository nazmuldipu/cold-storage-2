import {
  CYRILLIC_PATTERN_MESSAGE,
  EMAIL_PATTERN_MESSAGE,
  PHONE_NUMBER_PATTERN_MESSAGE,
} from './validation-messages-list';

export const EMAIL_PATTERN =
  '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$';
export const CYRILLIC_PATTERN = '^[А-Яа-яЁё\\s]+$';
export const PHONE_NUMBER_PATTERN =
  '^01[3-9][ ]?[0-9]{2}[ ]?[0-9]{3}[ ]?[0-9]{3}$';

export const PATTERNS_LIST: Array<{ PATTERN: string; MESSAGE: string }> = [
  { PATTERN: EMAIL_PATTERN, MESSAGE: EMAIL_PATTERN_MESSAGE },
  { PATTERN: CYRILLIC_PATTERN, MESSAGE: CYRILLIC_PATTERN_MESSAGE },
  { PATTERN: PHONE_NUMBER_PATTERN, MESSAGE: PHONE_NUMBER_PATTERN_MESSAGE },
];
