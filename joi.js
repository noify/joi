var joi = {};
var html = document.getElementsByTagName('html')[0];
var frame = document.getElementById('frame');
var chat = document.getElementById('chat');
var select = document.getElementById('select');
var chatTime;
var csbsto;
var chatLine = createChatLine();
var timeLine = createTimeLine();
var chatList = [];
var isTouch = false;
var addEvent = (function (){
  if (window.attachEvent) {
    return function (ele, event, func) {
      ele.attachEvent('on' + event, func)
    }
  } else {
    return function (ele, event, func, options) {
      ele.addEventListener(event, func, typeof options === 'undefined' ? false : options)
    }
  }
})();
(function() {
  var lastTime = 0;
  var vendors = ['webkit', 'moz'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // Webkit中此取消方法的名字变了
                                    window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function(callback, element) {
          var currTime = new Date().getTime();
          var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
          var id = window.setTimeout(function() {
              callback(currTime + timeToCall);
          }, timeToCall);
          lastTime = currTime + timeToCall;
          return id;
      };
  }
  if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function(id) {
          clearTimeout(id);
      };
  }
}());

function PrefixInteger(num, n) {
  return (Array(n).join(0) + num).slice(-n);
}

function createDiv (clazz) {
  var element = document.createElement('div');
  element.className = clazz;
  return element
}

function createChatLine() {
  var chatLine = createDiv('chatLine');
  var head = createDiv('head');
  var word = createDiv('word');
  var text = createDiv('text');
  chatLine.appendChild(head);
  word.appendChild(text);
  chatLine.appendChild(word);
  return chatLine
}

function createTimeLine() {
  var timeLine = createDiv('timeLine');
  var time = createDiv('time');
  timeLine.appendChild(time);
  return timeLine
}

function showTimeLine () {
  var now = new Date();
  var tLine;
  if (now - chatTime < 1 * 60 * 1000) {
    return
  }
  chatTime = now;
  tLine = timeLine.cloneNode(true);
  tLine.childNodes[0].innerText = PrefixInteger(now.getHours(), 0) + ':' + PrefixInteger(now.getMinutes(), 2);
  chat.appendChild(tLine);
  return tLine
}
function frameScrollBottom() {
  var scrollBottom;
  return; // 待修复 bug
  if (html.scrollHeight <= html.clientHeight) {
    return
  }
  isTouch = false;
  scrollBottom = html.scrollHeight - html.clientHeight - html.scrollTop;
  csbsto = function (){
    html.scrollTop += scrollBottom/12; // bug iphone中scrollTop一直为0
    if (!isTouch && html.scrollTop + html.clientHeight !== html.scrollHeight ) {
      requestAnimationFrame(csbsto)
    }
  }
  csbsto();
}

function say (options) {
  var cLine = chatLine.cloneNode(true);
  var cText = cLine.childNodes[1].childNodes[0];

  cLine.className += ' ' + options.name
  cText.innerText = options.text;
  showTimeLine();
  chatList.push({
    el: cLine,
    name: options.name,
    time: new Date(),
    text: options.text
  })
  chat.appendChild(cLine);
  cLine.scrollIntoView(); // 临时解决scrollTop一直为0的bug
  return cLine
}

function joiSay (text) {
  var isScrollBottom = false;
  isScrollBottom = html.scrollTop + html.clientHeight === html.scrollHeight;
  say({
    name: 'joi',
    text: text
  })
  if (isScrollBottom) {
    frameScrollBottom();
  }
}

function meSay (text) {
  say({
    name: 'me',
    text: text
  })
  frameScrollBottom();
}
function toBeRepeater () {
  setTimeout(function () {
      joiSay('人类的本质是复读机~');
    }, 1000)
}

toBeRepeater();

addEvent(frame, 'touchmove', function () {
  isTouch = true;
})

addEvent(select, 'click', function () {
  meSay('人类的本质是复读机~');
  toBeRepeater();
})