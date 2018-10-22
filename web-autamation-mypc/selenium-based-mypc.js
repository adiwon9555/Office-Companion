const { Builder, By, Key, until } = require('selenium-webdriver');
var webdriver = require('selenium-webdriver');
var officegen = require('officegen');
var path = require('path');
var cmd = require('node-cmd');

const fs = require("fs");
var tc = 1;fc=1;
var takingScreenshot = (data, docx) => {
  var img = 'test' + tc + '.png';
  var base64Data = data.replace(/^data:image\/png;base64,/, "")
  fs.writeFile(img, base64Data, 'base64', function (err) {
    if (err) console.log(err);
    var pObj = docx.createP();
    // pObj.options.align = 'right';

    //***************************FOR DIRECTLY RUNNING**********************
    pObj.addImage(path.resolve(__dirname + '/../', img), { cx: 700, cy: 350 });

    //************************AFTER ELECTRON PACKAGE APP MADE*****************
    // pObj.addImage(path.resolve('./', img), { cx: 700, cy: 350 });
    pObj.addLineBreak();
  });
  tc++;
}
var finalScreeschot = (data, docx) => {
  var img = 'final' + fc + '.png';
  var base64Data = data.replace(/^data:image\/png;base64,/, "")
  fs.writeFile(img, base64Data, 'base64', function (err) {
    if (err) console.log(err);
    var pObj = docx.createP();

    //***************************FOR DIRECTLY RUNNING**********************
    pObj.addImage(path.resolve(__dirname + '/../', img), { cx: 700, cy: 350 });

    //************************AFTER ELECTRON PACKAGE APP MADE*****************
    //pObj.addImage(path.resolve('./', img), { cx: 700, cy: 350 });
    var out = fs.createWriteStream('testing.docx');
    out.on('error', function (err) {
      console.log(err);
    });
    docx.generate(out);
  });
}
async function switchToNewTab(driver) {
  var tab_handles = await driver.getAllWindowHandles();
  let number_of_tabs = tab_handles.length;
  let new_tab_index = number_of_tabs - 1;
  await driver.switchTo().window(tab_handles[new_tab_index]);
}
async function example(callback) {
  let driver = await new Builder().forBrowser('chrome').build();
  var docx = officegen({
    'type': 'docx'
  });

  try {
    await driver.manage().window().maximize();
    await driver.get('http://www.google.com');
    await driver.findElement(By.name('q')).sendKeys('ITC Infotech, Bangalore');
    await driver.takeScreenshot().then(function (data) {
      takingScreenshot(data, docx);

    });
    await driver.findElement(By.name('btnK')).sendKeys(Key.RETURN);

    await driver.sleep(1000);
    await driver.takeScreenshot().then(function (data) {
      takingScreenshot(data, docx);
    });
    // var em=await driver.findElement(By.tagName('body'));
    // await driver.wait(until.elementTextContains(em,'ITC Infotech: IT Consulting, Strategy & Outsourcing Services Company'),5000);
    //await driver.manage().timeouts().pageLoadTimeout(10, TimeUnit.SECONDS);
    await driver.findElement(By.xpath("//*[text()='ITC Infotech: IT Consulting, Strategy & Outsourcing Services Company']")).click();
    await driver.takeScreenshot().then(function (data) {
      finalScreeschot(data, docx);
    });
    await driver.wait(until.titleIs('IT Consulting, Strategy & Outsourcing Services Company | ITC Infotech'), 1000);
    //await driver.wait(until.titleIs('ITC Infotech, Bangalore - Google Search'), 1000);
  }
  finally {
    await driver.quit();
  }
  //callback();
  setTimeout(() => { callback(); }, 1500);
};
async function company_information(callback) {
  let driver = await new Builder().forBrowser('chrome').build();
  var docx = officegen({
    'type': 'docx'
  });

  try {
    await driver.manage().window().maximize();
    await driver.get('https://vpn.itcinfotech.com');
    await driver.findElement(By.name('username')).sendKeys('28569');
    await driver.findElement(By.name('password')).sendKeys('A7d3i555#');
    await driver.takeScreenshot().then(function (data) {
      takingScreenshot(data, docx);

    });
    await driver.findElement(By.name('password')).sendKeys(Key.RETURN);
    await driver.sleep(2000);
    await driver.takeScreenshot().then(function (data) {
      takingScreenshot(data, docx);
    });
    await driver.findElement(By.xpath("//*[text()='Click here to continue']")).click();
    await driver.takeScreenshot().then(function (data) {
      takingScreenshot(data, docx);
    });
    await driver.wait(until.elementLocated(By.id('/Common/CafeExpress')), 30000)
    await driver.findElement(By.id('/Common/CafeExpress')).click();

    switchToNewTab(await driver);
    var tab_handles = await driver.getAllWindowHandles();
    let number_of_tabs = tab_handles.length;
    let new_tab_index = number_of_tabs - 1;
    await driver.switchTo().window(tab_handles[new_tab_index]);
    await driver.takeScreenshot().then(function (data) {
      takingScreenshot(data, docx);
    });
    //await driver.findElement(By.tagName("body")).sendKeys(Key.CONTROL, Key.PAGE_DOWN);
    await driver.findElement(By.xpath('//*[@id="ulFlip"]/li[15]/div[2]/a')).click();
    var tab_handles2 = await driver.getAllWindowHandles();
    let number_of_tabs2 = tab_handles2.length;
    let new_tab_index2 = number_of_tabs2 - 1;
    await driver.switchTo().window(tab_handles2[new_tab_index2]);
    await driver.takeScreenshot().then(function (data) {
      takingScreenshot(data, docx);
    });
    //await driver.findElement(By.id('ctl00_SmallSearchInputBox1_csr_sbox')).sendKeys('Hello'); 
    //switchToNewTab(await driver);
    //await driver.sleep(300);
    //await driver.findElement(By.xpath("//*[text()='Organization Information and Processes']")).click();
    const actions = driver.actions({ bridge: true });
    var elem = await driver.findElement(By.xpath("//*[text()='Organization Information and Processes']"));
    await actions.move({ duration: 5000, origin: elem, x: 0, y: 0 }).perform();
    await driver.takeScreenshot().then(function (data) {
      takingScreenshot(data, docx);
    });
    //await new LegacyActionSequence(driver).mouseMove(elem).perform();
    // var elem=await driver.findElement(By.xpath("//*[text()='Organization Information and Processes']"));
    // await new LegacyActionSequence().mouseMove(elem).perform();
    await driver.findElement(By.xpath("//li/a[contains(text(),'Company Information')]")).click();
    // await driver.findElement(By.xpath('//*[@id="ctl00_PlaceHolderMain__MainMenu:submenu:2"]/li[1]/a')).click();
    await driver.takeScreenshot().then(function (data) {
      takingScreenshot(data, docx);
    });
    //var vis=await driver.findElement(By.xpath('//*[@id="ctl00_PlaceHolderMain_grd_DisplayFiles_ctl04__btn_ViewPDFFiles"]'));
    await driver.findElement(By.xpath('//*[@id="ctl00_PlaceHolderMain_grd_DisplayFiles_ctl04__btn_ViewPDFFiles"]')).click();

    await driver.takeScreenshot().then(function (data) {
      finalScreeschot(data, docx);
    });
    var invis = await driver.findElement(By.id('dlgTitleBtns'));
    await driver.wait(until.stalenessOf(invis), 300000);
    //await driver.wait(until.titleIs('ITC Infotech, Bangalore - Google Search'), 5555000);
  } finally {
    await driver.quit();

  }

  callback();
};






async function quality_policy(callback) {
  let driver = await new Builder().forBrowser('chrome').build();
  var docx = officegen({
    'type': 'docx'
  });

  try {
    await driver.manage().window().maximize();
    await driver.get('http://cafexpress/WebPages/Home.aspx');
    //await driver.get('https://www.google.com');
    await driver.takeScreenshot().then(function (data) {
      takingScreenshot(data, docx);
    });

    await driver.sleep(2000);
    //await driver.findElement(By.xpath('//*[@id="zz16_RootAspMenu"]/li[1]/ul/li[1]')).click();
    await driver.findElement(By.xpath('//*[@id="ulFlip"]/li[15]/div[2]/a/img')).click();
    var tab_handles2 = await driver.getAllWindowHandles();
    let number_of_tabs2 = tab_handles2.length;
    let new_tab_index2 = number_of_tabs2 - 1;
    await driver.switchTo().window(tab_handles2[new_tab_index2]);
    await driver.manage().window().maximize();
    await driver.takeScreenshot().then(function (data) {
      takingScreenshot(data, docx);
    });
    //await driver.findElement(By.id('ctl00_SmallSearchInputBox1_csr_sbox')).sendKeys('Hello'); 
    //switchToNewTab(await driver);
    //await driver.sleep(300);
    //await driver.findElement(By.xpath("//*[text()='Organization Information and Processes']")).click();
    const actions = driver.actions({ bridge: true });
    var elem = await driver.findElement(By.xpath("//*[text()='Organization Information and Processes']"));
    await actions.move({ duration: 5000, origin: elem, x: 0, y: 0 }).perform();
    await driver.takeScreenshot().then(function (data) {
      takingScreenshot(data, docx);
    });
    //await new LegacyActionSequence(driver).mouseMove(elem).perform();
    // var elem=await driver.findElement(By.xpath("//*[text()='Organization Information and Processes']"));
    // await new LegacyActionSequence().mouseMove(elem).perform();
    await driver.findElement(By.xpath("//li/a[contains(text(),'Policy and Manual')]")).click();
    // await driver.findElement(By.xpath('//*[@id="ctl00_PlaceHolderMain__MainMenu:submenu:2"]/li[1]/a')).click();
    await driver.takeScreenshot().then(function (data) {
      takingScreenshot(data, docx);
    });
    //var vis=await driver.findElement(By.xpath('//*[@id="ctl00_PlaceHolderMain_grd_DisplayFiles_ctl04__btn_ViewPDFFiles"]'));
    await driver.findElement(By.xpath('//*[@id="ctl00_PlaceHolderMain_grd_DisplayFiles_ctl04__btn_ViewPDFFiles"]')).click();
    await driver.sleep(3000);
    await driver.takeScreenshot().then(function (data) {
      finalScreeschot(data, docx);
    });
    var invis = await driver.findElement(By.id('dlgTitleBtns'));
    await driver.wait(until.stalenessOf(invis), 300000);
    //await driver.wait(until.titleIs('ITC Infotech, Bangalore - Google Search'), 5555000);
  } finally {
    await driver.quit();

  }

  callback();
};






async function getframe(driver) {
  return await driver.findElement(By.id('ptifrmtgtframe'));
}




async function time_sheet_existing(callback) {
  let driver = await new Builder().forBrowser('chrome').build();
  var docx = officegen({
    'type': 'docx'
  });

  try {
    await driver.manage().window().maximize();
    await driver.get('https://i3lmobile.itcinfotech.com/psp/OPPORTAL/?cmd=login&languageCd=ENG&');
    // await driver.get('http://cafexpress/WebPages/Home.aspx');
    // //await driver.get('https://www.google.com');
    // await driver.takeScreenshot().then(function (data) {
    //   takingScreenshot(data, docx);
    // });
    // await driver.wait(until.elementLocated(By.xpath('//*[@id="homepage_main"]/div[2]/div[5]')), 3000);
    // //await driver.findElement(By.xpath('//*[@id="zz16_RootAspMenu"]/li[1]/ul/li[1]')).click();
    // await driver.findElement(By.xpath('//*[@id="homepage_main"]/div[2]/div[5]')).click();
    // var tab_handles2 = await driver.getAllWindowHandles();
    // let number_of_tabs2 = tab_handles2.length;
    // let new_tab_index2 = number_of_tabs2 - 1;
    // await driver.switchTo().window(tab_handles2[new_tab_index2]);
    // await driver.manage().window().maximize();
    await driver.wait(until.elementLocated(By.id('userid')), 3000);
    // await driver.findElement(By.id('userid')).sendKeys('28569');
    // await driver.findElement(By.id('pwd')).sendKeys('');
    
    await driver.takeScreenshot().then(function (data) {
      takingScreenshot(data, docx);
    });
    // await driver.findElement(By.id('pwd')).sendKeys(Key.RETURN); 

    await driver.wait(until.elementLocated(By.xpath('//a[@title="Enter project and personal time and submit a report for approval."]')), 300000);
    await driver.takeScreenshot().then(function (data) {
      takingScreenshot(data, docx);
    });
    await driver.findElement(By.xpath('//a[@title="Enter project and personal time and submit a report for approval."]')).click();
    await driver.wait(until.elementLocated(By.id('ptifrmtgtframe')), 3000);
    await driver.takeScreenshot().then(function (data) {
      takingScreenshot(data, docx);
    });
    //var fe=await driver.findElement(By.id('ptifrmtgtframe'));
    await driver.switchTo().frame(getframe(driver));
    await driver.wait(until.elementLocated(By.name('EX_TIME_ADD_VW_PERIOD_END_DT')), 3000);
    
    let dt=new Date().getDate();
    let today=new Date().getDay();
    if(today===5)
    {
      await driver.findElement(By.name('EX_TIME_ADD_VW_PERIOD_END_DT')).sendKeys(Key.RETURN);
    }
    else{
      let ndt=today===6?dt-1:(today===0?dt-2:dt-(today+2));
      let ndate=new Date();
      ndate.setDate(ndt);
      let strdate=(ndate.getMonth()+1)+'/'+ndate.getDate()+'/'+ndate.getFullYear();
      await driver.findElement(By.name('EX_TIME_ADD_VW_PERIOD_END_DT')).sendKeys(Key.chord(Key.CONTROL, "a"), strdate,Key.RETURN);
     
    }
    
    await driver.wait(until.elementLocated(By.xpath('//*[@id="EX_TIME_HDR_WRK_COPY_TIME_RPT"]')), 3000);
    await driver.takeScreenshot().then(function (data) {
      takingScreenshot(data, docx);
    });
    await driver.findElement(By.xpath('//*[@id="EX_TIME_HDR_WRK_COPY_TIME_RPT"]')).click();
    await driver.wait(until.elementLocated(By.id('COPY_TIME_REPORT$0')), 3000);
    await driver.takeScreenshot().then(function (data) {
      takingScreenshot(data, docx);
    });
    driver.findElement(By.id('COPY_TIME_REPORT$0')).click();
    await driver.wait(until.elementLocated(By.id('EX_ICLIENT_WRK_OK_PB')), 3000);
    await driver.takeScreenshot().then(function (data) {
      takingScreenshot(data, docx);
    });
    await driver.findElement(By.id('EX_ICLIENT_WRK_OK_PB')).click();
    await driver.wait(until.elementLocated(By.id('EX_ICLIENT_WRK_PB_UPDATE')), 3000);
    await driver.findElement(By.id('TIME1$0')).sendKeys('8');
    await driver.findElement(By.id('TIME2$0')).sendKeys('8');
    await driver.findElement(By.id('TIME3$0')).sendKeys('8');
    await driver.findElement(By.id('TIME4$0')).sendKeys('8');
    await driver.findElement(By.id('TIME5$0')).sendKeys('8');
    await driver.findElement(By.id('EX_ICLIENT_WRK_PB_UPDATE')).click();
    await driver.sleep(1000);//need to change via elementtextis
    await driver.takeScreenshot().then(function (data) {
      takingScreenshot(data, docx);
    });
    await driver.findElement(By.id('EX_TIME_HDR_WRK_PB_SUBMIT')).click();
    await driver.switchTo().defaultContent();
    await driver.wait(until.elementLocated(By.id('ptModTable_0')), 3000);
    await driver.takeScreenshot().then(function (data) {
      finalScreeschot(data, docx);
    });
    
    var em = await driver.findElement(By.id('ptModTable_0'));

    await driver.wait(until.stalenessOf(em), 300000);
    //await driver.wait(until.titleIs('ITC Infotech, Bangalore - Google Search'), 5555000);
  } finally {
    await driver.quit();

  }

  callback();
};
















// const {Builder, By, until} = require('selenium-webdriver');
// var example=()=>{
// new Builder()
//     .forBrowser('chrome')
//     .build()
//     .then(driver => {
//       return driver.get('http://www.google.com/ncr')
//         .then(_ => driver.findElement(By.name('q')).sendKeys('webdriver'))
//         .then(_ => driver.findElement(By.name('btnK')).click())
//         .then(_ => driver.wait(until.titleIs('webdriver - Google Search'), 1000))
//         .then(_ => driver.quit());
//     });
//   }

async function gdrive(callback) {
  let driver = await new Builder().forBrowser('internet explorer').build();
  var docx = officegen({
    'type': 'docx'
  });

  try {
    await driver.manage().window().maximize();
    await driver.get('https://mail.google.com/mail/u/0/?tab=wm#inbox');

    //await driver.findElement(By.name('identifier')).sendKeys('aditya.rathi9555@gmail.com');
    await driver.executeScript('window.open("https://www.google.com");');
    var tab_handles = await driver.getAllWindowHandles();
    let number_of_tabs = tab_handles.length;
    let new_tab_index = number_of_tabs - 1;
    await driver.switchTo().window(tab_handles[new_tab_index]);
    //  console.log(tab_handles.);

    await driver.findElement(By.name('q')).sendKeys('ITC Infotech, Bangalore');

    //await driver.findElement(By.tagName("body")).sendKeys(Key.CONTROL, Key.PAGE_DOWN);
    await driver.wait(until.titleIs('Google'), 3000);
    //await driver.wait(until.titleIs('ITC Infotech, Bangalore - Google Search'), 5555000);
  } finally {
    await driver.quit();

  }

  //callback();
};


var selenium_obj = {};
selenium_obj.open_google = example;
selenium_obj.company_information = company_information;
selenium_obj.quality_policy = quality_policy;
selenium_obj.time_sheet_existing = time_sheet_existing;
//selenium_obj.time_sheet_existing();
//gdrive();
//selenium_obj.company_information();
// selenium_obj.open_google();
//selenium_obj.quality_policy();
module.exports = { selenium_obj };