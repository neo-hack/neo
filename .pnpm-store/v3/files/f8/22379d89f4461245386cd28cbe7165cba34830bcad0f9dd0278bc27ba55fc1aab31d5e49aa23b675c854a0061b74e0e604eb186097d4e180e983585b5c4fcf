import getExternal from './get-external';

describe('getExternal', () => {
  describe('when passed an array of module names', () => {
    it('returns true for matching modules INCLUDING peer dependencies and dependencies', () => {
      const fn = getExternal(['redux', 'redux-saga', 'reselect']);

      expect(fn('redux')).toBe(true);
      expect(fn('redux/compose')).toBe(true);
      expect(fn('redux-saga')).toBe(true);
      expect(fn('babel-plugin-lodash')).toBe(false);
      expect(fn('lodash-es')).toBe(false);
      expect(fn('rollup')).toBe(true);
    });

    it('returns true for matching modules EXCLUDING peer dependencies and dependencies', () => {
      const fn = getExternal(['redux', 'redux-saga', 'reselect'], false, false);

      expect(fn('redux')).toBe(true);
      expect(fn('redux/compose')).toBe(true);
      expect(fn('redux-saga')).toBe(true);
      expect(fn('babel-plugin-lodash')).toBe(false);
      expect(fn('lodash-es')).toBe(false);
      expect(fn('rollup')).toBe(false);
    });
  });
});
