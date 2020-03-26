export default (width, height, lineCount, margin, backgroundColor, hasLine) => {
  const lineWidth = 100 - margin.left - margin.right;
  const lineHeight = (100 - margin.top - margin.bottom) / lineCount;
  let lines = '';
  for (let i = 0; i <= lineCount; i += 1) {
    lines += `<rect x="${margin.left}%" y="${+margin.top + lineHeight * i}%" width="${lineWidth}%" height="0.1%" fill="black"/>\n`;
  }
  const svg = `
<svg version="1.1" 
  xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <rect width="100%" height="100%" fill="${backgroundColor}"/>
  ${hasLine ? lines : ''}
</svg>
`;
  return svg;
};
