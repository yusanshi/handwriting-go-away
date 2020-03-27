/**
 * A wrapper for fillText, with add additional options
 * @param {string} text Text string to render into the context.
 * @param {number} x The x-axis coordinate of the point at which to begin drawing, in pixels
 * @param {number} y The y-axis coordinate of the point at which to begin drawing, in pixels
 * @param {number} charSpace Proportion of canvas.width (%), can be negative or postive
 * @param {number} _distortion Distortion factor. Not implemented yet
 * @param {number} horizontalOffset Proportion of canvas.width (%)
 * @param {number} verticalOffset Proportion of canvas.height (%)
 */
CanvasRenderingContext2D.prototype.fillTextExtended = function fillTextExtended(
  text,
  x,
  y,
  charSpace,
  _distortion,
  horizontalOffset,
  verticalOffset,
) {
  const ctx = this;
  const { canvas } = ctx;
  let currentOffset = 0;
  for (let i = 0; i < text.length; i += 1) {
    // Apply single byte character a smaller offset
    const isSingle = new TextEncoder().encode(text[i]).length === 1;
    ctx.fillText(
      text[i],
      x
        + currentOffset
        + (Math.random() - 0.5) * 2 * (horizontalOffset / 100) * canvas.width * (isSingle ? 0.7 : 1), // eslint-disable-line
      y + (Math.random() - 0.5) * 2 * (verticalOffset / 100) * canvas.height * (isSingle ? 0.7 : 1),
    );
    currentOffset
      += ctx.measureText(text[i]).width
      + (charSpace / 100) * canvas.width
      + (isSingle ? (Math.abs(charSpace) / 1.333 / 100) * canvas.width : 0);
  }
};

/**
 *  Measure text width based on charSpace
 * @param {string} text Text to measure
 * @param {number} charSpace Proportion of canvas.width (%), can be negative or postive
 * @return {{width: null}} Can be used as X.width like a TextMetrics object,
 * but no other properties
 */
CanvasRenderingContext2D.prototype.measureTextExtended = function measureTextExtended(
  text,
  charSpace,
) {
  const originalValue = this.measureText(text);
  if (text === '') {
    return originalValue;
  }
  const singleNum = Array.from(text).filter((e) => new TextEncoder().encode(e).length === 1).length;
  return {
    width:
      originalValue.width
      + (text.length - 1) * (charSpace / 100) * this.canvas.width
      + singleNum * (Math.abs(charSpace) / 1.333 / 100) * this.canvas.width,
  };
};

/**
 * Divide a text into multiple segments, each element stands for a line
 * @param {string} text Text to typeset
 * @param {charSpace} number Proportion of canvas.width (%), can be negative or postive
 * @param {lineWidth} number Proportion of canvas.width (%)
 * @return {array} Array of string segments
 */
CanvasRenderingContext2D.prototype.typesetText = function typesetText(text, charSpace, lineWidth) {
  const ctx = this;
  const { canvas } = ctx;
  const returnValue = [];
  let consumed = 0;
  while (consumed < text.length) {
    let lineConsumed = 0;
    while (
      consumed + lineConsumed < text.length
      && (lineConsumed === 0 || (lineConsumed !== 0 && text[consumed + lineConsumed - 1] !== '\n'))
      && ctx.measureTextExtended(text.slice(consumed, consumed + lineConsumed + 1), charSpace).width
        <= (lineWidth / 100) * canvas.width
    ) {
      lineConsumed += 1;
    }
    returnValue.push(text.slice(consumed, consumed + lineConsumed));
    consumed += lineConsumed;
  }
  return returnValue;
};
