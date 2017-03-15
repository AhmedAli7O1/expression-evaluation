var data = {};

function expression(obj, exp) {
  data = obj;
  return compare(exp);
}

function compare(exp) {
  var op = nextOperator(exp);
  if (!op) return evaluate(exp);
  var beforeOp = evaluate(exp.slice(0, op.index - 1));

  if (op.op === '||' && beforeOp) return beforeOp;
  if (op.op === '&&' && !beforeOp) return beforeOp;

  return compare(exp.slice(op.index + 3, exp.length));

}

function nextOperator(exp) {
  for (var i = 0; i < exp.length; i++) {
    if (exp[i] + exp[i + 1] === '||' || exp[i] + exp[i + 1] === '&&') {
      return { index: i, op: exp[i] + exp[i + 1] };
    }
  }
}

function evaluate(exp) {
  var exp = exp.split(' ');

  // evaluate values.
  exp[0] = data[exp[0]] || exp[0];
  exp[2] = data[exp[2]] || exp[2];

  switch (exp[1]) {
    case '==':
      return exp[0] == exp[2];
      break;
    case '>':
      return exp[0] > exp[2];
      break;
    case '<':
      return exp[0] < exp[2];
      break;
    case '>=':
      return exp[0] >= exp[2];
      break;
    case '<=':
      return exp[0] <= exp[2];
      break;
    case '!=':
      return exp[0] != exp[2];
      break;
    default:
      return null;
  }

}

var result = expression(
  {
    firstName: 'Ahmed',
    lastName: 'Ali',
    age: 26
  },
  'firstName == Ahmed && lastName == Ali && age == 26'
);

console.log('RESULT >>>>>>>>> ', result, '<<<<<<<<');