import styled, { css, createGlobalStyle } from 'styled-components'

const Named = styled.div`
  width: 100%;
  &:hover {
    width: 50%;
  }
`

const NamedWithInterpolation = styled.div`
  color: ${(color) => props.color};
  & {
    @apply m-0 p-0 w-100vw h-100vh overflow-hidden hover:(bg-blue-500 text-xs);
  }
`

const Wrapped = styled(Inner)`
  color: red;
  @apply m-0 p-0 w-100vw h-100vh overflow-hidden;
`

const Foo = styled.div({
  color: 'green',
})

const style = css`
  background: green;
`

const GlobalStyle = createGlobalStyle`
  html {
    background: silver;
  }
`
