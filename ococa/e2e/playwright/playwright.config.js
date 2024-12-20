module.exports = {
  reporter: [['html', { 
    outputFolder: `/reports/playwright-report`, 
    open: 'never' 
  }]],
  use: {
    headless: true,
    ignoreHTTPSErrors: true, // 自己署名証明書を使用しているため必要
  },
};