/**
 * MIT License
  Copyright (c) 2016-present Vladimir Danchenkov and Maximilian Stoiber

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

/**
 * most code is forked from [babel-plugin-styled-components](https://github.com/styled-components/babel-plugin-styled-components)
 */
import syntax from 'babel-plugin-syntax-jsx'
import templateLiterals from './visitors/templateLiterals'
import assignStyledRequired from './visitors/assignStyledRequired'
import transpileCssProp from './visitors/transpileCssProp'

export default function ({ types: t }) {
  return {
    inherits: syntax,
    // TODO: looks like babel not support async pre
    // pre(state) {
    //   getWindiCSSService(state.opts)
    // },
    visitor: {
      Program(path, state) {
        path.traverse(
          {
            JSXAttribute(path, state) {
              transpileCssProp(t)(path, state)
            },
            VariableDeclarator(path, state) {
              assignStyledRequired(t)(path, state)
            },
          },
          state,
        )
      },
      TaggedTemplateExpression(path, state) {
        templateLiterals(t)(path, state)
      },
    },
  }
}
