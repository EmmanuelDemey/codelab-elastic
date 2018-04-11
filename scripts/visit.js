const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  setInterval(async () => {
    for (let i = 0; i < 100; i++) {
      await page.goto("http://localhost/");
    }
  }, 5000);

  await browser.close();
})();
