// docker compose run --rm e2e で実行

const { test, expect, chromium } = require('@playwright/test');

test.describe('ログイン画面の試験', () => {
  let browser;
  let page;

  test.beforeAll(async () => {
    // ヘッドレスモードをオン、これで実際にブラウザは開かれない
    browser = await chromium.launch(); 
    page = await browser.newPage();
    await page.goto('https://nginx/ococa/Login');
  });

  test.afterAll(async () => {
    await browser.close();
  });

  test('ページのタイトルが正しいこと', async () => {
    const title = await page.title();
    expect(title).toBe("ococa");
  });

  test('絶対失敗しますテスト', async () => {
    const title = await page.title();
    expect(title).toBe("hogehoge");
  });
});
