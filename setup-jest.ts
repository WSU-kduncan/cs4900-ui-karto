import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv();

// Global test configuration
Object.defineProperty(window, 'CSS', { value: null });
Object.defineProperty(window, 'getComputedStyle', {
  value: () => {
    return {
      display: 'none',
      appearance: ['-webkit-appearance'],
    };
  },
});

Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>',
});

Object.defineProperty(document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true,
    };
  },
});

// Custom Jest matchers for Angular testing - Commented out to avoid TypeScript conflicts
// (expect as any).extend({
//   toHaveBeenCalledWithAngularComponent(received: any, expected: any): any {
//     const pass = received.calls.any() &&
//                  received.calls.argsFor(0)[0] === expected;
//     return {
//       pass,
//       message: () =>
//         `Expected ${received} ${pass ? 'not ' : ''}to have been called with Angular component ${expected}`
//     };
//   }
// });

// Global test utilities - Commented out to avoid TypeScript conflicts
// declare global {
//   namespace jest {
//     interface Matchers<R> {
//       toHaveBeenCalledWithAngularComponent(component: any): R;
//     }
//   }
// }

// Console configuration for tests
const originalWarn = console.warn;
const originalError = console.error;

beforeEach(() => {
  console.warn = jest.fn();
  console.error = jest.fn();
});

afterEach(() => {
  console.warn = originalWarn;
  console.error = originalError;
});
