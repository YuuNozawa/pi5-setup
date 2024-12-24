// docker compose run --rm e2e で実行

const { test, expect, chromium } = require('@playwright/test');

test.describe('ログイン画面の試験', () => {
  // ブロック内のテストは上から順に実行
  test.describe.configure({ mode: 'serial' }); 

  let browser;
  let page;

  // すべてのテストを実行する前に1回だけ実行する
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

  test('認可サーバのログイン画面が表示されること', async () => {
    page.click('role=button[name="login"]');
    await expect(page).toHaveURL('https://nginx/login');
  });

  test('alice で認可画面が表示できること', async () => {
    await page.fill('input[name="username"]', 'alice');
    await page.fill('input[name="password"]', process.env.ALICE_PASSWORD);
    await page.click('text=Sign in');
    
    await expect(page).toHaveURL(/\/oauth2\/authorize\?/);
    await expect(page.locator('body')).toContainText('Consent required');
  });

  test('認可画面で認可後aliceのホーム画面が表示されること', async () => {
    await page.check('input[name="profile"]');
    await page.check('input[name="email"]');
    await page.click('text=Submit Consent');
    
    await expect(page).toHaveURL('https://nginx/ococa/Mood/alice');
    await expect(page.locator('body')).toContainText('Alice');
  });
});
