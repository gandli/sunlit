// Vitest setup — ensures each unit test starts with a clean DOM state.
import { afterEach } from 'vitest';

afterEach(() => {
  document.body.className = '';
});
