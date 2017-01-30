export default xs => {
  let j, t, l;

  l = xs.length;

  while (--l > 0) {
    j = ~~(Math.random() * (l + 1));
    t = xs[j];
    xs[j] = xs[l];
    xs[l] = t;
  }

  return xs;
};
