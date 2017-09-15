// Simple $ selector, who needs jQuery anyway?
module.exports = (q) => {
  const elems = document.querySelectorAll(q);
  if (elems.length) {
    return elems.length === 1 ? elems[0] : elems;
  }
  return false;
};
