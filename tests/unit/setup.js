// Vitest setup — clean DOM between tests.
import { afterEach } from 'vitest';

afterEach(() => {
  document.body.className = '';
});
