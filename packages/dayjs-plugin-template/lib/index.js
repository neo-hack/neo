'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
var tslib_1 = require('tslib')
var lodash_chunk_1 = tslib_1.__importDefault(require('lodash.chunk'))
var DEFAULT_CHUNK = 7
var CalendarSets = /** @class */ (function () {
  function CalendarSets(instance, params) {
    var _a, _b
    this.$month = 0
    this.$year = 0
    this.instance = instance
    this.$month = (_a = params.month) !== null && _a !== void 0 ? _a : this.instance.month()
    this.$year = (_b = params.year) !== null && _b !== void 0 ? _b : this.instance.year()
  }
  CalendarSets.prototype.reset = function () {
    this.$month = this.instance.month()
    this.$year = this.instance.year()
    return this
  }
  CalendarSets.prototype.current = function (_a) {
    var _b = _a === void 0 ? { chunked: true } : _a,
      _c = _b.chunked,
      chunked = _c === void 0 ? true : _c
    return this.month({ chunked: chunked, month: this.$month, year: this.$year })
  }
  CalendarSets.prototype.prev = function (_a) {
    var _b =
        _a === void 0
          ? {
              chunked: true,
              type: 'month',
            }
          : _a,
      _c = _b.chunked,
      chunked = _c === void 0 ? true : _c,
      _d = _b.type,
      type = _d === void 0 ? 'month' : _d
    if (type === 'year') {
      this.$year -= 1
    }
    this.$month -= 1
    this.$month = Math.max(0, this.$month)
    return this.month({ chunked: chunked, month: this.$month, year: this.$year })
  }
  CalendarSets.prototype.next = function (_a) {
    var _b =
        _a === void 0
          ? {
              chunked: true,
              type: 'month',
            }
          : _a,
      _c = _b.chunked,
      chunked = _c === void 0 ? true : _c,
      _d = _b.type,
      type = _d === void 0 ? 'month' : _d
    if (type === 'year') {
      this.$year += 1
    }
    this.$month += 1
    this.$month = Math.min(11, this.$month)
    return this.month({ chunked: chunked, month: this.$month, year: this.$year })
  }
  CalendarSets.prototype.year = function (_a) {
    var _this = this
    var _b = _a === void 0 ? {} : _a,
      year = _b.year,
      chunked = _b.chunked
    var data = {}
    new Array(12).fill(0).forEach(function (_, month) {
      data[month] = _this.month({ month: month, chunked: chunked, year: year })
    })
    return data
  }
  /**
   * @description generate calender sets
   * @example dayjs().calendarSet({ month, chunked })
   * @returns [['', 1, ..., 7], ..., ['', 1, ..., 7]]
   */
  CalendarSets.prototype.month = function (_a) {
    var _this = this
    var _b
    if (_a === void 0) {
      _a = {
        chunked: true,
      }
    }
    var _c = _a.chunked,
      chunked = _c === void 0 ? true : _c,
      args = tslib_1.__rest(_a, ['chunked'])
    var month = (_b = args.month) !== null && _b !== void 0 ? _b : this.instance.month()
    /** total days of <month> */
    var len = this.instance.set('date', 1).set('month', month).daysInMonth()
    /** array of each-day in <month> */
    var days = new Array(len).fill(0).map(function (_v, i) {
      var _a
      return _this.instance
        .set('date', i + 1)
        .year((_a = args.year) !== null && _a !== void 0 ? _a : _this.instance.year())
        .set('month', month)
        .format('YYYY-MM-DD')
    })
    /** get the-first-day-of-month the-day-of-week */
    var firstDayOfMonth = (this.instance.month(month).startOf('month').day() || DEFAULT_CHUNK) - 1
    var lastDayOfMonth = this.instance.month(month).endOf('month').day() || DEFAULT_CHUNK
    /**
     * 如果一个月的第一天是星期2，那么前面就有一个星期一的空
     */
    var beginEmpties = new Array(firstDayOfMonth).fill('')
    var endEmpties = new Array(7 - lastDayOfMonth).fill('')
    var calendarSets = beginEmpties.concat(days).concat(endEmpties)
    return chunked
      ? lodash_chunk_1.default(calendarSets, DEFAULT_CHUNK)
      : calendarSets.filter(function (v) {
          return !!v
        })
  }
  return CalendarSets
})()
var wrapper = function (_options, _Dayjs, dayjs) {
  dayjs.calendarSets = function (input) {
    if (input === void 0) {
      input = {}
    }
    return new CalendarSets(dayjs(), input)
  }
}
exports.default = wrapper
