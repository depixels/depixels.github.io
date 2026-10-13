const filters = document.querySelectorAll('.filter');
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
  let count = 0;
  document.querySelectorAll('.paper').forEach(paper => {
    const show = button.dataset.filter === 'all' || paper.dataset.topics.split(' ').includes(button.dataset.filter);
    paper.hidden = !show;
    if (show) count++;
  });
  document.querySelector('#paper-count').textContent = String(count).padStart(2, '0');
}));

const figureDialog = document.querySelector('.figure-dialog');
const expandedFigure = figureDialog.querySelector('.expanded-figure');
const figureCaption = figureDialog.querySelector('.figure-caption');
document.querySelectorAll('.figure-open').forEach(link => {
  link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || typeof figureDialog.showModal !== 'function') return;
    event.preventDefault();
    expandedFigure.src = link.href;
    expandedFigure.alt = link.dataset.caption;
    figureCaption.textContent = link.dataset.caption;
    figureDialog.showModal();
  });
});
figureDialog.querySelector('.figure-close').addEventListener('click', () => figureDialog.close());
figureDialog.addEventListener('click', event => {
  if (event.target === figureDialog) {
    const rect = figureDialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) figureDialog.close();
  }
});
