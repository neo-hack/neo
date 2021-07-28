// time
const DURATION_REGEX =
  /^(?:(\d+)(y))?(?:(\d+)(M))?(?:(\d+)(w))?(?:(\d+)(d))?(?:(\d+)(h))?(?:(\d+)(m))?(?:(\d+)(s))?(?:(\d+)(ms))?$/
const SHORTCUTS_TO_UNIT = {
  y: 'years',
  M: 'months',
  w: 'weeks',
  d: 'days',
  h: 'hours',
  m: 'minutes',
  s: 'seconds',
  ms: 'milliseconds',
}

export const isStringDuration = (input: string) => {
  return DURATION_REGEX.test(input)
}

export const parseStringDurations = (
  input: string,
): { [key in keyof typeof SHORTCUTS_TO_UNIT]?: number } => {
  let groups = [...input.matchAll(DURATION_REGEX)]?.[0] ?? []
  const durations = {}
  groups = groups.filter((v) => !!v).slice(1)
  for (let i = 1; i < groups.length; ) {
    const number = Number(groups[i - 1])
    durations[SHORTCUTS_TO_UNIT[groups[i]]] = number
    i += 2
  }
  return durations
}
