var joi = {};
var frame = document.getElementById('frame');
var chat = document.getElementById('chat');
var select = document.getElementById('select');
var chatTime;
var csbsto;
var isScrollBottom = true;
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
  chat.lastChild.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
    inline: 'nearest'
  });
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
  return cLine
}

function joiSay (text) {
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
  isScrollBottom = true;
}
function toBeRepeater () {
  setTimeout(function () {
      joiSay('人类的本质是复读机~');
    }, 1000)
}

toBeRepeater();

addEvent(frame, 'touchmove', function () {
  isScrollBottom = false;
})

addEvent(select, 'click', function () {
  meSay('人类的本质是复读机~');
  toBeRepeater();
})