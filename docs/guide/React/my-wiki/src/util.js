export const highlight = (str, keyword, className = 'highlight') => {
  const hl = `<span class="${className}">${keyword}</span>`;
  return str.replace(new RegExp(keyword, 'gi'), hl);
};

export const stripHtml = (html, searchTerm) => {
  let div = document.createElement('div');
  if (searchTerm !== undefined && searchTerm !== null && searchTerm.trim() !== '') {
    html = highlight(html, searchTerm);
  }
  div.innerHTML = html;
  return div.innerHTML;
};