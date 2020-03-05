/* eslint no-constant-condition: ["error", { "checkLoops": false }] */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */

// eslint-disable-next-line import/extensions
import paperConfig from './papers/config.js';

// current paper config
let currentConfig;

window.onload = () => {
  document.querySelector('#generatorForm').addEventListener('submit', (e) => {
    e.preventDefault();
    generate(
      e.target.text.value,
      e.target.font.value,
      e.target.uploadFont.files[0],
      e.target.paper.value,
      e.target.lineCount.value,
      e.target.textScale.value,
      e.target.textColor.value,
      e.target.charSpace.value,
      e.target.shadowOffset.value,
      e.target.shadowRadius.value,
      e.target.shadowColor.value,
      e.target.blur.value,
      e.target.opacity.value,
      e.target.paperRotation.value,
      e.target.beginningOffset.value,
      e.target.distortion.value,
      e.target.horizontalOffset.value,
      e.target.verticalOffset.value,
    );
  });

  document.querySelector('#downloadPDF').addEventListener('click', downloadPDF);

  document.querySelector("[name='font']").addEventListener('change', (e) => {
    if (e.target.value === 'upload') {
      document.querySelector('#uploadFontArea').style.display = '';
    } else {
      document.querySelector('#uploadFontArea').style.display = 'none';
    }
  });

  document.querySelector("[name='paper']").addEventListener('change', (e) => {
    if (e.target.value.includes('noline')) {
      document.querySelector('#lineCountArea').style.display = '';
    } else {
      document.querySelector('#lineCountArea').style.display = 'none';
    }
  });

  $('#textColorGroup, #shadowColorGroup').colorpicker();

  i18next
    .use(i18nextXHRBackend)
    .use(i18nextBrowserLanguageDetector)
    .init({
      load: 'languageOnly',
      fallbackLng: 'zh',
      backend: {
        loadPath: 'lang/{{lng}}.json',
      },
    })
    .then(() => {
      jqueryI18next.init(i18next, $);
      $('body').localize();
    });
};

async function generate(
  text,
  font,
  uploadFont,
  paper,
  lineCount,
  textScale,
  textColor,
  charSpace,
  shadowOffset,
  shadowRadius,
  shadowColor,
  blur,
  opacity,
  paperRotation,
  beginningOffset,
  distortion,
  horizontalOffset,
  verticalOffset,
) {
  if (text === '') {
    alert(i18next.t('alert-no-text-input'));
    return;
  }

  if (font === 'upload' && typeof uploadFont === 'undefined') {
    alert(i18next.t('alert-no-font-uploaded'));
    return;
  }

  document.querySelector('#downloadPDF').setAttribute('disabled', 'disabled');
  document.querySelector('#preview').innerHTML = `
<div class="preview-placeholder">
  <div class="lds-ring">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
  <div class="alert alert-light" role="alert" id="loading-prompt"></div>
</div>
`;
  const generatedCanvas = document.createElement('div');

  currentConfig = paperConfig[paper];

  const realLineCount = paper.includes('noline')
    ? lineCount
    : currentConfig.line_count;
  const lineWidth = currentConfig.end.x - currentConfig.start.x;
  const lineHeight = (currentConfig.end.y - currentConfig.start.y) / (realLineCount - 1);

  document.querySelector('#loading-prompt').innerText = i18next.t(
    'loading-font-prompt',
  );

  let fontName;
  let fontUrl;

  if (font === 'upload') {
    fontName = uploadFont.name;
    fontUrl = URL.createObjectURL(uploadFont);
  } else {
    fontName = font;
    fontUrl = `fonts/${font}`;
  }

  const fontRep = `${parseInt(
    (currentConfig.default_font_size * textScale) / 100,
    10,
  )}px "${fontName}"`;

  if (!document.fonts.check(fontRep)) {
    try {
      const fontLoaded = await new FontFace(
        fontName,
        `url("${fontUrl}")`,
      ).load();
      document.fonts.add(fontLoaded);
    } catch (err) {
      alert(i18next.t('alert-wrong-font-file'));
      document.querySelector('#loading-prompt').innerText = i18next.t(
        'alert-wrong-font-file',
      );
      return;
    }
    if (!document.fonts.check(fontRep)) {
      alert(i18next.t('alert-text-size-not-supported'));
      document.querySelector('#loading-prompt').innerText = i18next.t(
        'alert-text-size-not-supported',
      );
      return;
    }
  }

  document.querySelector('#loading-prompt').innerText = i18next.t(
    'loading-paper-prompt',
  );

  const loadingTask = pdfjsLib.getDocument(`./papers/${paper}.pdf`);
  const page = await loadingTask.promise.then((pdf) => pdf.getPage(1));

  let pageCount = 0;
  let currentText = text;
  while (currentText.length !== 0) {
    pageCount += 1;
    document.querySelector(
      '#loading-prompt',
    ).innerText = i18next.t('generating-prompt', { count: pageCount });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = currentConfig.width * 10;
    canvas.height = currentConfig.height * 10;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    const radian = ((Math.random() - 0.5) * 2 * paperRotation * Math.PI) / 180;
    ctx.rotate(radian);
    // How to get scale factor such that after rotation, no blank area exist?
    // wolframalpha: Solve[{y - b/2*cos(θ) == (x - b/2*sin(θ))*(-tan(θ)), y==b/a*x},{x,y}]
    // Let x denote its nontrivial solution, then factor equals to (a/2)/x,
    // i.e., factor = (tan(θ)/k + 1)cos(θ)
    // Also, abs() is needed i.e. it works for both clockwise and anti-clockwise rotation
    const radianAbs = Math.abs(radian);
    let k = canvas.height / canvas.width;
    if (k > 1) {
      k = 1 / k;
    }
    const factor = (Math.tan(radianAbs) / k + 1) * Math.cos(radianAbs);
    ctx.scale(factor, factor);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);

    const viewport = page.getViewport({ scale: 1 });
    const scale = canvas.width / viewport.width;
    const scaledViewport = page.getViewport({ scale });

    const renderContext = {
      canvasContext: ctx,
      viewport: scaledViewport,
    };
    // eslint-disable-next-line no-await-in-loop
    await page.render(renderContext).promise;

    ctx.font = fontRep;
    ctx.fillStyle = textColor;
    ctx.textBaseline = 'bottom';
    ctx.filter = `blur(${blur}px) opacity(${opacity}%) drop-shadow(${shadowOffset}px ${shadowOffset}px ${shadowRadius}px ${shadowColor})`;

    let consumed = 0;
    for (
      let currentLine = 0;
      currentLine < realLineCount && consumed < currentText.length;
      currentLine += 1
    ) {
      // calc lineConsumed
      let lineConsumed = 0;
      while (true) {
        if (
          ctx.measureText(currentText.slice(consumed, consumed + lineConsumed + 1))
            .width
            > lineWidth * canvas.width
          || consumed + lineConsumed >= currentText.length
        ) {
          const newLinePostion = currentText
            .slice(consumed, consumed + lineConsumed)
            .indexOf('\n');
          if (newLinePostion !== -1) {
            lineConsumed = newLinePostion + 1;
          }
          break;
        } else {
          lineConsumed += 1;
        }
      }

      ctx.fillText(
        currentText.slice(consumed, consumed + lineConsumed),
        (currentConfig.start.x + (Math.random() * beginningOffset) / 100)
          * canvas.width,
        (currentConfig.start.y + currentLine * lineHeight) * canvas.height,
      );
      consumed += lineConsumed;
    }
    generatedCanvas.appendChild(canvas);
    currentText = currentText.slice(consumed, currentText.length);
  }

  if (font === 'upload') {
    URL.revokeObjectURL(fontUrl);
  }
  document.querySelector('#preview').innerHTML = '';
  document.querySelector('#preview').append(...generatedCanvas.childNodes);
  document.querySelector('#downloadPDF').removeAttribute('disabled');
}

function downloadPDF() {
  // eslint-disable-next-line new-cap
  const pdf = new jsPDF({ format: currentConfig.target_foramt });
  document.querySelectorAll('#preview > canvas').forEach((canvas, index) => {
    if (index !== 0) {
      pdf.addPage();
    }
    pdf.addImage(canvas, 0, 0, currentConfig.width, currentConfig.height);
  });
  pdf.save('download.pdf');
}
