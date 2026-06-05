#!/usr/bin/env node
/**
 * calculator.js - Node.js CLI calculator
 * Supports operations:
 * - addition
 * - subtraction
 * - multiplication
 * - division
 * - modulo
 * - exponentiation (power)
 * - square root
 *
 * Usage:
 *   node src/calculator.js add 2 3
 *   node src/calculator.js sub 5 2
 *   node src/calculator.js mul 4 3
 *   node src/calculator.js div 6 2
 *   node src/calculator.js mod 10 3
 *   node src/calculator.js pow 2 3
 *   node src/calculator.js sqrt 9
 */

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
}

// Return the remainder of a divided by b
function modulo(a, b) {
  if (b === 0) {
    throw new Error('Modulo by zero');
  }
  return a % b;
}

// Return base raised to exponent
function power(base, exponent) {
  return Math.pow(base, exponent);
}

// Return the square root of n; throw on negative input
function squareRoot(n) {
  if (n < 0) {
    throw new Error('Square root of negative number');
  }
  return Math.sqrt(n);
}

function printUsage() {
  console.log('Usage: node src/calculator.js <operation> <num1> <num2?>');
  console.log('Operations: add, sub, mul, div, mod, pow, sqrt');
}

if (require.main === module) {
  const [, , op, aRaw, bRaw] = process.argv;

  if (!op || !aRaw) {
    printUsage();
    process.exitCode = 1;
  } else {
    const opKey = op.toLowerCase();

    // Handle single-argument operations (sqrt)
    if (['sqrt'].includes(opKey)) {
      const n = Number(aRaw);
      if (Number.isNaN(n)) {
        console.error('Error: operand must be a valid number');
        process.exitCode = 2;
      } else {
        try {
          const result = squareRoot(n);
          console.log(result);
        } catch (err) {
          console.error('Error:', err.message);
          process.exitCode = 4;
        }
      }
    } else {
      // Binary operations require two operands
      if (!bRaw) {
        printUsage();
        process.exitCode = 1;
      } else {
        const a = Number(aRaw);
        const b = Number(bRaw);

        if (Number.isNaN(a) || Number.isNaN(b)) {
          console.error('Error: both operands must be valid numbers');
          process.exitCode = 2;
        } else {
          try {
            let result;
            switch (opKey) {
              case 'add':
              case '+':
                result = add(a, b);
                break;
              case 'sub':
              case '-':
                result = subtract(a, b);
                break;
              case 'mul':
              case 'x':
              case '*':
                result = multiply(a, b);
                break;
              case 'div':
              case '/':
                result = divide(a, b);
                break;
              case 'mod':
              case '%':
                result = modulo(a, b);
                break;
              case 'pow':
              case '^':
                result = power(a, b);
                break;
              default:
                console.error(`Unknown operation: ${op}`);
                printUsage();
                process.exitCode = 3;
                break;
            }

            if (typeof result !== 'undefined') {
              console.log(result);
            }
          } catch (err) {
            console.error('Error:', err.message);
            process.exitCode = 4;
          }
        }
      }
    }
  }
}

module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot };
