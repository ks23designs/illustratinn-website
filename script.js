// Optional subtle hover animation using JS
document.querySelectorAll('.grid-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.transform = 'scale(1.02)';
  });
  item.addEventListener('mouseleave', () => {
    item.style.transform = 'scale(1)';
  });
});
