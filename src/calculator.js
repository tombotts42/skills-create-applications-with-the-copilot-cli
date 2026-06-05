#!/usr/bin/env node
/**
 * calculator.js - Node.js CLI calculator
 * Supports operations:
 * - addition
 * - subtraction
 * - multiplication
 * - division
 *
 * Usage:
 *   node src/calculator.js add 2 3
 *   node src/calculator.js sub 5 2
 *   node src/calculator.js mul 4 3
 *   node src/calculator.js div 6 2
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

function printUsage() {
  console.log('Usage: node src/calculator.js <operation> <num1> <num2>');
  console.log('Operations: add, sub, mul, div');
}

if (require.main === module) {
  const [, , op, aRaw, bRaw] = process.argv;

  if (!op || !aRaw || !bRaw) {
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
        switch (op.toLowerCase()) {
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
          default:
            console.error(`Unknown operation: ${op}`);
            printUsage();
            process.exitCode = 3;
            break;
        }

        if (typeof result !== 'undefined') {
          // Print result as-is (preserve integer or float)
          console.log(result);
        }
      } catch (err) {
        console.error('Error:', err.message);
        process.exitCode = 4;
      }
    }
  }
}

module.exports = { add, subtract, multiply, divide };
