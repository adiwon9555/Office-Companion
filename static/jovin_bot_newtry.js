'use strict';
const cmd = require('node-cmd');
const json2xls = require('json2xls');
const openurl = require('openurl');

var open = require("open");
const opn = require('opn');
const fs = require('fs');

var { selenium_obj } = require("./web-autamation-mypc/selenium-based-mypc");
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}
var BuildHTML = function () {
    function BuildHTML() {
        _classCallCheck(this, BuildHTML);
        this.messageWrapper = 'message-wrapper';
        this.circleWrapper = 'circle-wrapper';
        this.textWrapper = 'text-wrapper';
        this.meClass = 'me';
        this.themClass = 'them';
    }

    BuildHTML.prototype._build = function _build(text, who) {
        if (who == "me") {
            return '<div class="' + this.messageWrapper + ' ' + this[who + 'Class'] + '">\n              <div class="' + this.circleWrapper + ' animated bounceIn" style="background-image: url(\'./static/ic_user.png\') !important;" ></div>\n              <div class="' + this.textWrapper + '">...</div>\n            </div>';
        } else {
            return '<div class="' + this.messageWrapper + ' ' + this[who + 'Class'] + '">\n              <div class="' + this.circleWrapper + ' animated bounceIn" style="background-image: url(\'./static/ic_robot.png\') !important;" ></div> \n              <div class="' + this.textWrapper + '">...</div>\n            </div>';
        }
    };
    BuildHTML.prototype.me = function me(text) {
        return this._build(text, 'me');
    };
    BuildHTML.prototype.them = function them(text) {
        return this._build(text, 'them');
    };
    return BuildHTML;
}();


$(document).ready(function () {

    var bot_response = function (text_test) {
        console.log('response')
        var text = text_test.length <= 0 || text_test === undefined ? '' : text_test;

        if (!!text.length) {
            var message = {
                user: "jovin",
                text: text,
                time: new Date().getTime()
            };
        }
        buildreceived(message)
        scrollBottom();
    }

    var buildHTML = new BuildHTML();
    var $input = $('#input');
    var $send = $('#send');
    var $content = $('#content');
    var $inner = $('#inner');

    function safeText(text) {
        $content.find('.message-wrapper').last().find('.text-wrapper').html(text);
    }

    function animateText() {
        console.log('animate')
        setTimeout(function () {
            console.log('animate timeout')
            $content.find('.message-wrapper').last().find('.text-wrapper').addClass('animated fadeIn');
        }, 100);
    }

    function scrollBottom() {
        $($inner).animate({ scrollTop: $($content).offset().top + 9999999 }, {
            queue: false,
            duration: 'ease'
        });
    }

    function buildSent(message) {
        console.log('sending: ', message.text);
        $content.append(buildHTML.me(message.text));
        safeText(message.text);
        animateText();
        scrollBottom();
        console.log('buildSent')
    }

    function buildreceived(message) {
        console.log('receiving: ', message.text);
        $content.append(buildHTML.them(message.text));
        safeText(message.text);
        animateText();
        scrollBottom();
    }

    function sendMessage() {
        var text_test = $input.val();
        var text = text_test;
        if (!!text.length) {
            var message = {
                user: 'me',
                text: text,
                time: new Date().getTime()
            };
        }
        buildSent(message);
        var for_qms = text.toLowerCase();
        var for_web_test = text.toLowerCase();

        if (text.toUpperCase() === "HELP") {
            setTimeout(() => {
                bot_response("Ready to help..");
            }, 1000)
        } else if (for_qms.includes("time") && for_qms.includes("spend")) {
            setTimeout(() => {
                bot_response("Opening site for details");
            }, 1000)
            open("http://cafexpress/Applications/SitePages/Resource%20Time%20Tracker.aspx");
        } else if (for_qms.includes("fill") && for_qms.includes("time") && for_qms.includes("sheet")) {
            setTimeout(() => {
                var today = new Date();
                if (today.getDay() == 5) {
                    //bot_response("Fill normally or using previous data");
                    bot_response("Filling this week's Timesheet....Press ok after completion");
                    setTimeout(()=>{
                        selenium_obj.time_sheet_existing(() => {
                            cmd.run('start testing.docx');
                        });
                    },4000)
                    
                }
                else {
                    bot_response("Filling last week's Timesheet....Press ok after completion");
                    setTimeout(()=>{
                        selenium_obj.time_sheet_existing(() => {
                            cmd.run('start testing.docx');
                        });
                    },4000)
                    
                }


            }, 1000)
        } else if (for_web_test.includes('automation')) {
            if (for_web_test.includes('google')) {
                setTimeout(() => {
                    bot_response("Performing automation");

                }, 300)

                selenium_obj.open_google(() => {
                    bot_response("Complete");
                    cmd.run('start testing.docx')
                });

            }
            // else if(for_web_test.includes('company information')){
            //     setTimeout(() => {
            //         bot_response("Performing automation");

            //     }, 300)
            //     selenium_obj.company_information(_=>cmd.run('start testing.docx'));

            // }
            else if (for_web_test.includes('quality policy')) {
                setTimeout(() => {
                    bot_response("Performing automation");

                }, 300)
                selenium_obj.quality_policy(() => {
                    bot_response("Complete");
                    cmd.run('start testing.docx');
                });

            }
            else {
                setTimeout(() => {
                    bot_response("No automation set for this..");

                }, 300)
            }

        }
        else if ((for_qms.includes("get") || for_qms.includes("fetch") || for_qms.includes("retrieve")) && for_qms.includes("qms homepage")) {
            setTimeout(() => {
                bot_response("Opening site for details");
            }, 1000)

            //casper.start('http://ssqagitcinfo01:4664/sites/QMS/SitePages/Home.aspx');
            // .thenClick('a', function() {
            //     this.echo("I clicked on first link found, the page is now loaded.");
            // });
            //casper.run();
            open('http://ssqagitcinfo01:4664/sites/QMS/SitePages/Home.aspx');
        }
        else if ((for_qms.includes("get") || for_qms.includes("fetch") || for_qms.includes("retrieve")) && for_qms.includes("from qms")) {
            if (for_qms.includes("project planning")) {
                setTimeout(() => {
                    bot_response("Opening site for details");
                }, 1000)
                open("https://vpn.itcinfotech.com/f5-w-687474703a2f2f7373716167697463696e666f30313a34363634$$/sites/QMS/_layouts/15/QAG_QMgmtSys/DisplayPage.aspx?FLDID=4&LSTID=2f6667e5-e2a9-4f5f-ba1d-53554eb8d8e9");
                //open("http://ssqagitcinfo01:4664/sites/QMS/_layouts/15/QAG_QMgmtSys/DisplayPage.aspx?FLDID=4&LSTID=2f6667e5-e2a9-4f5f-ba1d-53554eb8d8e9", "iexplore");
                // cmd.run('start http://ssqagitcinfo01:4664/sites/QMS/_layouts/15/QAG_QMgmtSys/DisplayPage.aspx?FLDID=4&LSTID=2f6667e5-e2a9-4f5f-ba1d-53554eb8d8e9');
                // openurl.open('http://ssqagitcinfo01:4664/sites/QMS/SitePages/Home.aspx');
            } else if (for_qms.includes("requirement development")) {
                setTimeout(() => {
                    bot_response("Opening site for details");
                }, 1000)
                open("http://ssqagitcinfo01:4664/sites/QMS/_layouts/15/QAG_QMgmtSys/DisplayPage.aspx?FLDID=8&LSTID=2f6667e5-e2a9-4f5f-ba1d-53554eb8d8e9");
            } else if (for_qms.includes("agile process")) {
                setTimeout(() => {
                    bot_response("Opening site for details");
                }, 1000)
                open('http://ssqagitcinfo01:4664/sites/QMS/_layouts/15/QAG_QMgmtSys/DisplayPage.aspx?FLDID=226&LSTID=2f6667e5-e2a9-4f5f-ba1d-53554eb8d8e9');
            } else if (for_qms.includes("finance process")) {
                setTimeout(() => {
                    bot_response("Opening site for details");
                }, 1000)
                open('http://ssqagitcinfo01:4664/sites/QMS/_layouts/15/QAG_QMgmtSys/DisplayPage.aspx?FLDID=88&LSTID=1641f9c2-12ce-4c32-a2b5-f0fd608e5f18');
            } else {
                setTimeout(() => {
                    bot_response("Sorry no details");
                }, 1000)
            }

        }
        else {
            $.getJSON("http://localhost:5002/ChatRes/" + text, function (data) {

                var restr = data.chatRes;
                console.log(restr);
                if (!restr.startsWith('{"')) {
                    if (restr.includes('start')) {
                        bot_response("Opening.......");
                        cmd.run(restr);

                    }
                    else {
                        bot_response(restr);
                    }
                }
                else {
                    var res = JSON.parse(restr);
                    console.log(data);
                    console.log('res = ', res);


                    if ('accounts' in res) {
                        bot_response('check the excel file and "save as" if needed for future');
                        var xls = json2xls(res.accounts, { fields: ['_id', 'customer_name', 'account_number', 'account_type', 'created_at', 'modified_at', 'balance'] });
                        fs.writeFileSync('data.xlsx', xls, 'binary');
                        cmd.run('data.xlsx');
                    } else if ('error' in res) {

                        bot_response(res.error);
                    }
                    else {
                        bot_response(res);
                    }

                }
            }).fail(function () {
                bot_response("Error connecting to server");
            });


        }
        text_test = '';
        $input.val('');
        $input.focus();
        scrollBottom();


    }


    setTimeout(function () {
        bot_response('Hi, I\'m Jovin, Your assistant.. I will make your work easy.. Type Help to see all the commands you can use..');
    }, 1000);

    $input.focus();

    $send.on('click', function (e) {
        sendMessage();
    });

    $input.on('keydown', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) {
            e.preventDefault();
            sendMessage();
        }
    });
});