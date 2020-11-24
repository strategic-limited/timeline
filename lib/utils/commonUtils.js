"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sumStyle = sumStyle;
exports.pixToInt = pixToInt;
exports.intToPix = intToPix;

/**
 * Add int pixels to a css style (left or top generally)
 * @param  {string} style Style string in css format
 * @param  {number} diff The pixels to add/subtract
 * @returns {string} Style as string for css use
 */
function sumStyle(style, diff) {
  return intToPix(pixToInt(style) + diff);
}
/**
 * Converts a pixel string to an int
 * @param  {string} pix Pixel string
 * @return {number} Integer value of the pixel string
 */


function pixToInt(pix) {
  return parseInt(pix.replace('px', ''));
}
/**
 * Convert integer to pixel string.
 * If not an integer the input is returned as is
 * @param  {number} int Integer value
 * @returns {string} Pixel string
 */


function intToPix(_int) {
  if (_int === Number(_int)) return _int + 'px';
  return _int;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9jb21tb25VdGlscy5qcyJdLCJuYW1lcyI6WyJzdW1TdHlsZSIsInN0eWxlIiwiZGlmZiIsImludFRvUGl4IiwicGl4VG9JbnQiLCJwaXgiLCJwYXJzZUludCIsInJlcGxhY2UiLCJpbnQiLCJOdW1iZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLFNBQVNBLFFBQVQsQ0FBa0JDLEtBQWxCLEVBQXlCQyxJQUF6QixFQUErQjtBQUNwQyxTQUFPQyxRQUFRLENBQUNDLFFBQVEsQ0FBQ0gsS0FBRCxDQUFSLEdBQWtCQyxJQUFuQixDQUFmO0FBQ0Q7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDTyxTQUFTRSxRQUFULENBQWtCQyxHQUFsQixFQUF1QjtBQUM1QixTQUFPQyxRQUFRLENBQUNELEdBQUcsQ0FBQ0UsT0FBSixDQUFZLElBQVosRUFBa0IsRUFBbEIsQ0FBRCxDQUFmO0FBQ0Q7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNPLFNBQVNKLFFBQVQsQ0FBa0JLLElBQWxCLEVBQXVCO0FBQzVCLE1BQUlBLElBQUcsS0FBS0MsTUFBTSxDQUFDRCxJQUFELENBQWxCLEVBQXlCLE9BQU9BLElBQUcsR0FBRyxJQUFiO0FBQ3pCLFNBQU9BLElBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBBZGQgaW50IHBpeGVscyB0byBhIGNzcyBzdHlsZSAobGVmdCBvciB0b3AgZ2VuZXJhbGx5KVxyXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHN0eWxlIFN0eWxlIHN0cmluZyBpbiBjc3MgZm9ybWF0XHJcbiAqIEBwYXJhbSAge251bWJlcn0gZGlmZiBUaGUgcGl4ZWxzIHRvIGFkZC9zdWJ0cmFjdFxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBTdHlsZSBhcyBzdHJpbmcgZm9yIGNzcyB1c2VcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzdW1TdHlsZShzdHlsZSwgZGlmZikge1xyXG4gIHJldHVybiBpbnRUb1BpeChwaXhUb0ludChzdHlsZSkgKyBkaWZmKTtcclxufVxyXG4vKipcclxuICogQ29udmVydHMgYSBwaXhlbCBzdHJpbmcgdG8gYW4gaW50XHJcbiAqIEBwYXJhbSAge3N0cmluZ30gcGl4IFBpeGVsIHN0cmluZ1xyXG4gKiBAcmV0dXJuIHtudW1iZXJ9IEludGVnZXIgdmFsdWUgb2YgdGhlIHBpeGVsIHN0cmluZ1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHBpeFRvSW50KHBpeCkge1xyXG4gIHJldHVybiBwYXJzZUludChwaXgucmVwbGFjZSgncHgnLCAnJykpO1xyXG59XHJcbi8qKlxyXG4gKiBDb252ZXJ0IGludGVnZXIgdG8gcGl4ZWwgc3RyaW5nLlxyXG4gKiBJZiBub3QgYW4gaW50ZWdlciB0aGUgaW5wdXQgaXMgcmV0dXJuZWQgYXMgaXNcclxuICogQHBhcmFtICB7bnVtYmVyfSBpbnQgSW50ZWdlciB2YWx1ZVxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBQaXhlbCBzdHJpbmdcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpbnRUb1BpeChpbnQpIHtcclxuICBpZiAoaW50ID09PSBOdW1iZXIoaW50KSkgcmV0dXJuIGludCArICdweCc7XHJcbiAgcmV0dXJuIGludDtcclxufVxyXG4iXX0=