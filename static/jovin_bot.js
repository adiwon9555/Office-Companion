'use strict';
const cmd=require('node-cmd');
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
        if(who == "me") {
            return '<div class="' + this.messageWrapper + ' ' + this[who + 'Class'] + '">\n              <div class="' + this.circleWrapper + ' animated bounceIn" style="background-image: url(\'./static/ic_user.png\') !important;" ></div>\n              <div class="' + this.textWrapper + '">...</div>\n            </div>';
        }else{
            return '<div class="' + this.messageWrapper + ' ' + this[who + 'Class'] + '">\n              <div class="' + this.circleWrapper + ' animated bounceIn" style="background-image: url(\'./static/ic_robot.png\') !important;" ></div> \n              <div class="' + this.textWrapper +  '">...</div>\n            </div>';
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
    
    var bot_response=function(text_test) {
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
        $($inner).animate({scrollTop: $($content).offset().top + 9999999}, {
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
        var text = text_test.length <= 0 || text_test === undefined ? '' : text_test;
        if (!!text.length) {
            var message = {
                user: 'me',
                text: text,
                time: new Date().getTime()
            };
        }
        buildSent(message);

            if(text.toUpperCase()==="HELP")
            {
                setTimeout(()=>{
                bot_response("Ready to help..");
                },1000)
            }
            else{
                $.get( "http://localhost:5002/ChatRes/"+text, function( data ) {
                    var res=data.chatRes;
                    bot_response(res);
                  }).fail(function() {
                    bot_response( "Error connecting to server" );
                  });
                
            }
        
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