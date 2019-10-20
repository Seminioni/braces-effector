
function lockBody() {
  document.body.style.position = "fixed";
  document.body.style.top = `-${window.scrollY}px`;
}

function unlockBody() {
  const scrollY = document.body.style.top;
  document.body.style.position = "";
  document.body.style.top = "";
  window.scrollTo(0, parseInt(scrollY || "0", 0) * -1);
}

export {
  lockBody,
  unlockBody,
};
