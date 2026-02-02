# Testing Guide

This design system uses multiple testing strategies to ensure quality and accessibility.

## Test Types

### 1. Unit Tests (Vitest)
Test component logic, props, and behavior.

**Run tests:**
```bash
npm test              # Run tests in watch mode
npm test -- --run     # Run tests once
npm run test:ui       # Open Vitest UI
npm run test:coverage # Generate coverage report
```

**Example test structure:**
```tsx
// ComponentName.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName>Test</ComponentName>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

### 2. Accessibility Tests (A11y)
Automated accessibility testing in Storybook.

**How to use:**
1. Run Storybook: `npm run storybook`
2. Open any story
3. Click the **Accessibility** tab
4. Review violations and passes

**What it checks:**
- ARIA attributes
- Color contrast
- Keyboard navigation
- Screen reader compatibility

### 3. Visual Regression Tests (Chromatic)
Automated visual testing on every commit.

**Runs automatically on:**
- Every push to `main`
- Every pull request

**Manual run:**
```bash
npm run chromatic
```

## Writing Tests for New Components

### Step 1: Create the test file
```
src/components/YourComponent/YourComponent.test.tsx
```

### Step 2: Follow this template
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { YourComponent } from './YourComponent';

describe('YourComponent', () => {
  // Test rendering
  it('renders with required props', () => {
    render(<YourComponent>Content</YourComponent>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  // Test variants/props
  it('applies variant classes', () => {
    render(<YourComponent variant="primary">Test</YourComponent>);
    expect(screen.getByText('Test')).toHaveClass('component--variant-primary');
  });

  // Test interactions
  it('handles user interactions', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    
    render(<YourComponent onClick={handleClick}>Click</YourComponent>);
    await user.click(screen.getByText('Click'));
    
    expect(handleClick).toHaveBeenCalled();
  });

  // Test accessibility
  it('is accessible', () => {
    render(<YourComponent aria-label="Description">Test</YourComponent>);
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
  });
});
```

### Step 3: Run tests
```bash
npm test
```

## Best Practices

### ✅ Do
- Test component behavior, not implementation
- Use semantic queries (`getByRole`, `getByLabelText`)
- Test accessibility requirements
- Keep tests simple and focused
- Use descriptive test names

### ❌ Don't
- Test internal state or implementation details
- Use `getByClassName` or `getByTestId` unless necessary
- Write tests that depend on other tests
- Mock everything - test real behavior

## CI/CD Integration

Tests run automatically on:
- ✅ Every push to `main`
- ✅ Every pull request
- ✅ Before Chromatic builds

**GitHub Actions workflows:**
- `.github/workflows/test.yml` - Unit tests
- `.github/workflows/chromatic.yml` - Visual tests

## Coverage

Generate coverage reports:
```bash
npm run test:coverage
```

Coverage is **not** enforced but aim for:
- 80%+ line coverage
- 100% coverage for critical paths
- All accessibility features tested

---

**Questions?** Check the [Vitest docs](https://vitest.dev) or [Testing Library docs](https://testing-library.com/react).
