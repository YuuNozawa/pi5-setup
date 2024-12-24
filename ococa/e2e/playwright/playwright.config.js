module.exports = {
  reporter: [['html', { 
    outputFolder: `/reports/playwright-report`, 
    open: 'never' 
  }]],
  use: {
    headless: true,
    ignoreHTTPSErrors: true, // 自己署名証明書を使用しているため必要
    video: 'on', // ビデオ記録を有効化
    videoDir: `/reports/playwright-report/videos`,
  },
};