var joi = {};
var chat = document.getElementById('chat');
var chatTime;
var chatLine = createChatLine();
var timeLine = createTimeLine();
var chatList = [];

function createDiv (clazz) {
  var element = document.createElement('div');
  element.classList = clazz;
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
  tLine
    .getElementsByClassName('time')[0]
    .innerText = now.getHours() + ':' + now.getMinutes();
  chat.appendChild(tLine);
  return tLine
}

function say (options) {
  var cLine = chatLine.cloneNode(true);
  var cText = cLine
  .getElementsByClassName('word')[0]
  .getElementsByClassName('text')[0];

  cLine.classList += ' ' + options.name
  cText.innerText = options.text;
  showTimeLine();
  chatList.push({
    name: options.name,
    time: new Date(),
    text: options.text
  })
  chat.appendChild(cLine);
  chat.scrollIntoView(0, chat.offsetHeight);
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
    setTimeout(function (){
      joiSay('人类的本质是复读机~')
    }, 0)
    setTimeout(function () {
      meSay('人类的本质是复读机~')
    }, 1000)
    toBeRepeater()
  }, 2000)
}

toBeRepeater()

window.onscroll = function (e) {
  e.preventDefault()
}