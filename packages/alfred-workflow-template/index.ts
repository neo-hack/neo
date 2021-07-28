import alfy from 'alfy'
import dayjs from 'dayjs'
import isNaN from 'lodash.isnan'
import WeekOfYear from 'dayjs/plugin/weekOfYear'
import IsLeapYear from 'dayjs/plugin/isLeapYear'
import DayOfYear from 'dayjs/plugin/dayOfYear'
import QuarterOfYear from 'dayjs/plugin/quarterOfYear'
import Duration from 'dayjs/plugin/duration'
import RelativeTime from 'dayjs/plugin/relativeTime'

import { isStringDuration, parseStringDurations } from './utils'

dayjs.extend(WeekOfYear)
dayjs.extend(IsLeapYear)
dayjs.extend(DayOfYear)
dayjs.extend(QuarterOfYear)
dayjs.extend(Duration)
dayjs.extend(RelativeTime)

const toItem = (
  value: number | string | boolean,
  { title, subtitle }: { title?: string | number | boolean; subtitle?: string } = {},
) => {
  return {
    title: title || value,
    subtitle: subtitle || '',
    arg: value,
    icon: {
      path: ' ', // Hide icon
    },
    text: {
      copy: value,
      largetype: value,
    },
  }
}

const getInputMode = (input = '') => {
  if (input === ' ' || input === 'ls' || input === '.') {
    return 'default'
  }
  if (input.startsWith('d')) {
    return 'number-duration'
  }
  if (isStringDuration(input)) {
    return 'string-duration'
  }
  return 'time'
}

const trim = (input: string) => {
  if (!input) {
    return input
  }
  return input.trim().replace(/[\n\t]/g, '')
}

const DEFAULT_FORMAT = 'YYYY-MM-DD HH:mm:ss'
const DETAIL_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSS'
const WEEK_DAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

const getDefaultOutput = (value?: string) => {
  const now = dayjs(value)
  const startOfDay = now.startOf('day')
  const [startOfYear, endOfYear, endOfMonth] = [
    now.startOf('year'),
    now.endOf('year'),
    now.endOf('month'),
  ]
  const [dayOfWeek, weekOfYear, dayOfYear] = [now.day(), now.week(), now.dayOfYear()]
  const year = now.year()
  const isLeapYear = now.isLeapYear()
  const quarterOfYear = now.quarter()
  const remain =
    (now.valueOf() - startOfYear.valueOf()) / (endOfYear.valueOf() - startOfYear.valueOf())

  return [
    toItem(now.valueOf(), { title: `today is ${now.format(DEFAULT_FORMAT)}` }),
    toItem(remain, { title: `${year} has passed ${remain * 100}%` }),
    toItem(dayOfWeek, {
      title: `今天是${WEEK_DAYS[dayOfWeek]}${dayOfWeek === 5 ? '🎉🎉🎉' : ''}`,
    }),
    toItem(dayOfYear, { title: `today is the ${dayOfYear}th day of the year` }),
    toItem(weekOfYear, { title: `this week is ${weekOfYear}th week of the year` }),
    toItem(quarterOfYear, { title: `this quarter is ${quarterOfYear}th quarter of the year` }),
    toItem(startOfDay.valueOf(), {
      title: `start of this day is ${startOfDay.format(DEFAULT_FORMAT)}`,
    }),
    toItem(endOfYear.valueOf(), {
      title: `the last day of year is ${endOfYear.format(DEFAULT_FORMAT)}`,
    }),
    toItem(endOfMonth.valueOf(), {
      title: `the last day of month is ${endOfMonth.format(DEFAULT_FORMAT)}`,
    }),
    toItem(isLeapYear, { title: `${year} has ${isLeapYear ? 365 : 364} days` }),
  ]
}

const getDurationOutput = (type: 'string' | 'number' = 'string', value: any) => {
  const duration = type === 'string' ? dayjs.duration(value) : dayjs.duration(value)
  const ms = duration.asMilliseconds()
  const now = dayjs()
  const before = now.subtract(ms, 'millisecond')
  const after = now.add(ms, 'millisecond')
  const humanize = duration.humanize(false)
  return [
    toItem(ms, { title: `${ms} milliseconds` }),
    toItem(humanize),
    toItem(before.valueOf(), { title: `${humanize} ago is ${before.format(DETAIL_FORMAT)}` }),
    toItem(after.valueOf(), { title: `in ${humanize} is ${after.format(DETAIL_FORMAT)}` }),
    toItem(now.valueOf(), { title: `now is ${now.format(DETAIL_FORMAT)}` }),
  ]
}

const getTimeOutput = (value: string) => {
  let time
  if (value === 'now') {
    time = undefined
  } else if (isNaN(Number(value))) {
    time = value
  } else {
    time = Number(value)
  }
  const now = dayjs(time)
  const startOfDay = now.startOf('day')
  return [
    toItem(now.valueOf()),
    toItem(now.unix(), { subtitle: 'unix timestamp' }),
    toItem(now.format(DEFAULT_FORMAT)),
    toItem(startOfDay.valueOf(), {
      title: `start of this day is ${startOfDay.format(DEFAULT_FORMAT)}`,
    }),
  ]
}

const input = trim(alfy.input)
const mode = getInputMode(input)

const durations = parseStringDurations(input)
const ms = input.split(' ')[1]
switch (mode) {
  case 'default':
    alfy.output(getDefaultOutput())
    break
  case 'string-duration':
    alfy.output(getDurationOutput('string', durations))
    break
  case 'number-duration':
    alfy.output(getDurationOutput('number', Number(ms)))
    break
  case 'time':
    alfy.output(getTimeOutput(input))
    break
  default:
    break
}
