const styled_default = require('styled-components');

const TestNormal = styled.div(["\n  width: 100%;\n"]);
const Test = styled_default.default.div(["\n  width: 100%;\n"]);
const TestCallExpression = styled_default.default(Test)(["height: 20px;\nheight: 100vh;\nmargin: 0px;\noverflow: hidden;\npadding: 0px;\nwidth: 100vw;"]);
