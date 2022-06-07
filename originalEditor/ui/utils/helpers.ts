import { TPasswordScore } from '../interfaces/passwordStrong.intarface';
import * as React from 'react';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export function isNodeOutsideElement(node: HTMLElement, element: HTMLElement) {
  return !(element.contains(node) || element === node);
}

export function getCoords(elem: HTMLElement) {
  const box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset,
  };
}

export function sort(a: string | number, b: string | number) {
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  } else if (typeof a === 'string' && typeof b === 'string') {
    return a.localeCompare(b);
  } else {
    return 0;
  }
}

export class Debounce {
  private timerId: number;

  public on(f: (...arg: any[]) => any, ms: number) {
    return (...arg: any[]) => {
      if (this.timerId) {
        this.off();
      }

      this.timerId = window.setTimeout(() => {
        f(...arg);
      }, ms);
    };
  }

  public off() {
    clearTimeout(this.timerId);
  }
}

export function isNumber(value: number | string): boolean {
  return /^\d+\.?(\d+)?$/.test(`${value}`);
}

export function isInteger(num: number | string): boolean {
  if (!isNaN(+num)) {
    return /^\d+$/.test(`${num}`);
  }

  return false;
}

export function getDecimals(value: number | string): number {
  if (isNaN(Number(value))) {
    throw new Error('Value is not valid, is required type string or number ');
  }

  if (isInteger(value)) {
    return 0;
  }

  const str = toStr(value);

  if (isExponentNumber(str)) {
    return parseInt(
      str
        .split('')
        .reverse()
        .join(''),
      10
    );
  } else {
    return str.split('.')[1].length;
  }
}

export function isExponentNumber(value: string) {
  return /[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)/.test(value);
}

export function toStr(value: any): string {
  return value + '';
}

export function isBoolean(value: any): boolean {
  return typeof value === 'boolean';
}

export function bodyHideScroll(hide: boolean) {
  if (hide) {
    const bodyWidth = document.body.offsetWidth;

    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = document.body.offsetWidth - bodyWidth + 'px';
    document.body.setAttribute('data-owners', (Number(document.body.getAttribute('data-owners') || '0') + 1).toString());
  } else {
    const owners = Math.max(0, Number(document.body.getAttribute('data-owners') || '0') - 1);
    document.body.setAttribute('data-owners', owners.toString());

    if (owners === 0) {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  }
}

export function isValidPasswordStrange(score: TPasswordScore) {
  return score >= 3;
}

export function getInfoVariant(touched: boolean, errorText: string): 'error' | 'success' {
  if (touched && errorText) {
    return 'error';
  } else if (touched && !errorText) {
    return 'success';
  }
}

export function getChildElementByRef(ref: React.RefObject<any>, selector: string): HTMLElement {
  return ref.current.querySelector(selector);
}

export function isValidDate(date: string) {
  return /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(
    date
  );
}
