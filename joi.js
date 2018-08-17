var joi = {};
var chat = document.getElementById('chat');
var select = document.getElementById('select');
var chatTime;
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
  tLine.childNodes[0].innerText = now.getHours() + ':' + now.getMinutes();
  chat.appendChild(tLine);
  return tLine
}
var csbsto;
function chatScrollBottom() {
  clearInterval(csbsto)
  if (isTouch) {
    return
  }
  var scrollBottom = chat.scrollHeight - chat.clientHeight - chat.scrollTop;
  csbsto = setInterval(function (){
    if ( chat.scrollTop + chat.clientHeight === chat.scrollHeight ) {
      clearInterval(csbsto)
    }
    if (scrollBottom > 150) {
      chat.scrollTop += scrollBottom/20
    } else {
      chat.scrollTop += 1
    }
  }, 1)
}
function say (options) {
  var cLine = chatLine.cloneNode(true);
  var cText = cLine.childNodes[1].childNodes[0];

  cLine.className += ' ' + options.name
  cText.innerText = options.text;
  showTimeLine();
  chatList.push({
    name: options.name,
    time: new Date(),
    text: options.text
  })
  chat.appendChild(cLine);
  chatScrollBottom();
  return cLine
}

function joiSay (text) {
  say({
    name: 'joi',
    text: text
  })
}

function meSay (text) {
  say({
    name: 'me',
    text: text
  })
}
function toBeRepeater () {
  setTimeout(function () {
      joiSay('人类的本质是复读机~')
    }, 1000)
}

toBeRepeater();


addEvent(chat, 'touchmove', function () {
  isTouch = true;
  clearInterval(csbsto);
})
addEvent(chat, 'touchend', function () {
  isTouch = false;
})
addEvent(select, 'click', function () {
  meSay('人类的本质是复读机~');
  toBeRepeater();
})