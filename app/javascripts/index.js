// Preload all images

import shuffle from './lib/shuffle';

const STATE = {};

const QUESTIONS = [
  'what is a ghost?',
  'a tragedy doomed to repeat itself?',
];

const DOM = {
  app: document.getElementById('app'),
  sets: document.getElementsByClassName('set'),
};

const detect = el => fn =>
  el.addEventListener('scroll', () => {
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - (el.clientHeight / 2)) fn();
  });

const img = ({ id, klass, src }) => {
  const el = document.createElement('img');
  if (id) el.id = id;
  if (klass) el.className = klass;
  el.src = src;
  return el;
};

const src = (question, n) =>
  `img/${encodeURIComponent(question)}/${n}.png`;

const times = amount => fn =>
  Array(amount).fill(undefined).map((_, i) => fn(i));

const fill = (el, question) => {


  return take(question, 30)
    .forEach(img => el.appendChild(img));
};

const gen = question =>
  shuffle(times(500)(i =>
    img({ src: src(question, i + 1) })));

const take = (question, amount) => {
  if (STATE[question].pool.length === 0) {
    STATE[question].pool = gen(question);
  }

  return STATE[question].pool.splice(0, amount);
};

export default () => {
  Array.prototype.map.call(DOM.sets, (el, i) => {
    const question = QUESTIONS[i];

    STATE[question] = { pool: gen(question) };

    fill(el, question);

    detect(el)(() => {
      console.log(`Appending ${question}`)
      fill(el, question);
    });
  });
};
