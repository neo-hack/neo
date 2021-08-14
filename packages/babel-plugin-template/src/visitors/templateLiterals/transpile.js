import { isStyled, isHelper } from '../../utils/detectors'
import { parse, transformGroups } from '../../utils/windicss'

export default (t) => (path, state) => {
  if (isStyled(t)(path.node.tag, state) || isHelper(t)(path.node.tag, state)) {
    const {
      tag: callee,
      quasi: { quasis, expressions },
    } = path.node

    const values = t.arrayExpression(
      quasis
        .filter((quasi) => quasi.value.cooked !== undefined)
        .map((quasi) => {
          if (/@apply/g.test(quasi.value.cooked)) {
            const result = parse(quasi.value.cooked)
            const translated = transformGroups(result)
            if (translated) {
              return t.stringLiteral(translated.code)
            }
            return t.stringLiteral(result)
          }
          return t.stringLiteral(quasi.value.cooked)
        }),
    )

    path.replaceWith(t.callExpression(callee, [values, ...expressions]))
  }
}
