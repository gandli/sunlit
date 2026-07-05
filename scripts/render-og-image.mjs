import { chromium } from '@playwright/test';
import { writeFileSync } from 'node:fs';
const html = `<!DOCTYPE html><html><head><style>
body{margin:0;font-family:-apple-system,system-ui,sans-serif;width:1200px;height:630px;background:linear-gradient(135deg,#f5c542 0%,#e89341 100%);display:flex;align-items:center;justify-content:center}
.card{background:rgba(0,0,0,0.15);padding:60px 80px;border-radius:32px;color:#fff;text-align:center;backdrop-filter:blur(8px)}
h1{font-size:120px;margin:0;letter-spacing:-4px;font-weight:900}
.stack{font-size:38px;margin-top:20px;opacity:0.95;font-weight:600}
.tag{font-size:24px;margin-top:16px;opacity:0.85}
</style></head><body><div class="card"><h1>sunlit</h1><div class="stack">SolidJS · Vite</div><div class="tag">a warm sunlight web toy</div></div></body></html>`;
writeFileSync('/tmp/og.html', html);
const b = await chromium.launch();
const c = await b.newContext({ viewport: { width: 1200, height: 630 } });
const p = await c.newPage();
await p.goto('file:///tmp/og.html');
await p.screenshot({ path: 'public/og-image.png' });
await b.close();
console.log('✓ og-image.png');
