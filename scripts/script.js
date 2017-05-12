$(document).ready(function() {
    var text, containerCSS, defaultCSS;
    var interval = 100;
    var cursor = "|";
    var x, y, r = 3;

    defaultCSS = 'body { font-size: 30px; } ::selection { background-color: #39ff14; color: #000;}';

    containerCSS = 'body { line-height: 1.8; background-color: #000; color: #fff; padding: 0; margin: 0; } #container {position: fixed; width: 100%; top: 0; bottom: 0; overflow: auto; font-family: Orbitron, sans-serif; background-color: #000; color: #39ff14; box-sizing: border-box; padding: 20px 50px;}';

    msg = [
        'Hi there!',
        'I am Ayalhsik,',
        'A Self-Constructing Bot',
        'Version: 0.0.2',
        'Give me a few seconds to modify myself...',
        '...................................',
        'All done!',
        '',
        'I\'m your web companion.',
        'Right now, I\'m in a very basic development age.',
        'I will soon set the web on fire.',
        'Looking forward to see you in future.',
        '   ',
        '   ',
        'Ok, Goodbye',
        '   ',
        'Wait! One last thing',
        'If you\'d like me and wanna appreciate',
        'then you can find my developer on facebook - Kishlaya.Jaiswal',
        '   ',
        '   ',
        '   ',
        'C\'ya next time... '
    ];

    function cssMagic(style, index, interval) {
        if(index < style.length) {
            $('#style-tag').append(style[index++]);
            setTimeout(function() {
                cssMagic(style, index, interval);
            }, interval);
        }
    }

    function printMessage(textBox, message, index, interval) {
        var box;
        if(index < message.length) {
        	if(message.substring(index, index+4) == "<br>") {
            	index = index+4;

            	cursorBlink(textBox, interval, r);
	            box = document.getElementById('container');
	            box.scrollTop = box.scrollHeight;
	            setTimeout(function() {
	                textBox.append('<br>');
	                printMessage(textBox, message, index, interval);
	            }, interval*r*2);
        	}
            else {
            	textBox.append(message[index++]);

            	textBox.append(cursor);
	            box = document.getElementById('container');
	            box.scrollTop = box.scrollHeight;
	            setTimeout(function() {
	                var temp = textBox.html();
	                temp = temp.substring(0, temp.length-1);
	                textBox.html(temp);
	                printMessage(textBox, message, index, interval);
	            }, interval);
            }
        }
        else {
        	var temp = $('#container').html();
        	temp = temp.substring(0, temp.length-4);
        	$('#container').html(temp)
        	cursorBlink(textBox, 250, -1);
        }
    }

    function cursorBlink(textBox, blinkTime, repeat) {
    	if(repeat==0)
    		return;
        textBox.append(cursor);
        setTimeout(function() {
            var temp = textBox.html();
            temp = temp.substring(0, temp.length-1);
            textBox.html(temp, blinkTime, repeat);
        }, blinkTime);
        setTimeout(function() {
            cursorBlink(textBox, blinkTime, --repeat);
        }, blinkTime*2);
    }

    var x = 0;
    var str = "";
    while(x < msg.length)
        str = str + msg[x++] + '<br>';

    $('body').append('<style id="style-tag"></style><div id="container"></div>');
    $('#style-tag').append(defaultCSS);

    cssMagic(containerCSS, 0, interval/2.5);
    printMessage($('#container'), str, 0, interval);
});