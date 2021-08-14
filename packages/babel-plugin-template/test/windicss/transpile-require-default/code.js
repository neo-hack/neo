const styled_default = require('styled-components')

const TestNormal = styled.div`
  width: 100%;
`

const Test = styled_default.default.div`
  width: 100%;
`

const TestCallExpression = styled_default.default(Test)`
  height: 20px;
  @apply m-0 p-0 w-100vw h-100vh overflow-hidden;
`
