/* eslint-disable @typescript-eslint/no-explicit-any */
import { convert } from 'html-to-text';
import { REGEX } from '../constants';

class StringUtils {
  /**
   * Splits string into array by separator and trim each element
   * @param {String} str        - string to split
   * @param {String} delimiter  - separator
   * @returns String[]
   */
  static splitsAndTrim(str: string, delimiter: string) {
    return str.split(delimiter).map((item) => item.trim());
  }

  /**
   * Remove multiple spaces in string
   * @param {String} str - string to remove space
   * @returns String without multiple space
   */
  static removeMultiSpace(str: string) {
    return str.replace(/\s+/g, ' ');
  }

  /**
   * Escape RegExp
   * @param {*} str - string to escape
   * @returns String escaped
   */
  static escapeRegExp(str: any) {
    return str.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

  /**
   * Replaces all text in a string, using a regular expression or search string.
   * @param {*} str - string to replace
   * @param {*} find - string to find
   * @param {*} replace - replace string
   * @param {string} [flags] - flags, default is 'gm'
   * @returns String replaced
   */
  static replaceAll(str: any, find: any, replace: any, flags: string = 'gm') {
    const pattern = this.escapeRegExp(find);
    return str.replace(new RegExp(pattern, flags), replace);
  }

  /**
   * Remove accents in String
   * @see https://www.tunglt.com/2018/11/bo-dau-tieng-viet-javascript-es6/
   * @param {String} str - string to remove accents
   * @returns String without accents
   */
  static removeAccents(str: string) {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
  }

  /**
   * Validate string is uuid
   * @param {String} str - string to check
   * @returns true if string is Uuid else false
   */
  static isUUID(str: string) {
    return /^[0-9a-fA-F]{24}$/.test(str);
  }

  static isEmailAddress(str: string) {
    return REGEX.FIELDS.EMAIL.test(str);
  }

  static isPhoneNumber(str: any) {
    return REGEX.FIELDS.PHONE.test(str);
  }

  static isEmpty(str: string | any[] | null | undefined) {
    return !str || str === '' || str === null || str === undefined || str.length === 0;
  }

  static isBlank(str: string) {
    return !str || /^\s*$/.test(str);
  }

  static isBlankOrEmpty(str: any) {
    return this.isEmpty(str) || this.isBlank(str);
  }

  static isLetter(str: string) {
    if (typeof str !== 'string') {
      return false;
    }
    return str.toLowerCase() !== str.toUpperCase();
  }

  static isDigit(str: string) {
    if (typeof str !== 'string') {
      return false;
    }
    return str.match(/^\d+$/) !== null;
  }

  static htmlToText(str: string) {
    str = this.replaceAll(str, '&nbsp;', ' ').replace(/<img .*?>/g, '');
    return convert(str, {
      selectors: [{ selector: 'a', options: { ignoreHref: true } }]
    });
  }

  static keepLetterAndDigitOnly(str: string | any[]) {
    ['\n', '\t', '\r', '\r\n'].forEach((item) => {
      str = StringUtils.replaceAll(str, item, ' ');
    });

    let result = '';
    for (let i = 0; i < str.length; i++) {
      const c = str[i];
      if (this.isLetter(c) || this.isDigit(c) || c === ' ' || c === '.' || c === ',') {
        result += c;
      } else {
        result += ' ';
      }
    }

    return this.removeMultiSpace(result).trim();
  }
}

export default StringUtils;
