export default ({ el, speed }) =>
  new Promise(resolve => {
    const bounds = el.offsetHeight;
    const limit = el.offsetHeight + el.parentNode.offsetHeight;

    let delta = 0;

    const tick = () => {
      if (el.destroyed) return;

      el.style.transform = `translateY(${delta += speed}px)`;

      // Next
      if (delta > bounds) resolve();

      // Animate
      if (delta < limit) window.requestAnimationFrame(tick);

      // Pool
      if (delta >= limit) el.parentNode.removeChild(el);
    };

    tick();

    return el;
  });
