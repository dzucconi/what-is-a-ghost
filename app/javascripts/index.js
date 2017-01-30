import imagesloaded from 'imagesloaded';
import shuffle from './lib/shuffle';
import animate from './lib/animate';

const STATE = {};

const QUESTIONS = [
  'what is a ghost?',
  'a tragedy doomed to repeat itself?',
];

const DOM = {
  app: document.getElementById('app'),
  sets: document.getElementsByClassName('set'),
};

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

const gen = () =>
  shuffle(times(500)(i => i + 1));

const take = (question, amount) => {
  if (STATE[question].pool.length === 0) {
    STATE[question].pool = gen(question);
  }

  return STATE[question].pool.splice(0, amount);
};

const next = question => {
  const indexes = take(question, 1);

  indexes.forEach(i => {
    const el = img({ src: src(question, i) });

    STATE[question].el.appendChild(el);

    imagesloaded(STATE[question].el, () => {
      animate({ el, speed: 1.5 })
        .then(() => next(question));
    });
  });
};

export default () => {
  Array.prototype.map.call(DOM.sets, (el, i) => {
    const question = QUESTIONS[i];

    STATE[question] = {
      el,
      pool: gen(question)
    };

    next(question);
  });
};
