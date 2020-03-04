import paperConfig from "./papers/config.js";

// current paper config
let currentConfig;

window.onload = () => {
  document.querySelector("#generatorForm").addEventListener("submit", e => {
    e.preventDefault();
    generate(
      e.target["text"].value,
      e.target["paper"].value,
      e.target["textScale"].value,
      e.target["textColor"].value,
      e.target["charSpace"].value,
      e.target["font"].value,
      e.target["uploadFont"].files[0],
      e.target["shadowOffset"].value,
      e.target["shadowRadius"].value,
      e.target["shadowColor"].value,
      e.target["blur"].value,
      e.target["opacity"].value,
      e.target["paperRotation"].value,
      e.target["beginningOffset"].value,
      e.target["distortion"].value,
      e.target["horizontalOffset"].value,
      e.target["verticalOffset"].value
    );
  });

  document.querySelector("#downloadPDF").addEventListener("click", downloadPDF);

  document.querySelector("[name='font']").addEventListener("change", e => {
    if (e.target.value === "upload") {
      document.querySelector("#uploadFontArea").style.display = "";
    } else {
      document.querySelector("#uploadFontArea").style.display = "none";
    }
  });

  $("#textColorGroup, #shadowColorGroup").colorpicker();

  i18next
    .use(i18nextXHRBackend)
    .use(i18nextBrowserLanguageDetector)
    .init({
      load: "languageOnly",
      fallbackLng: "zh",
      backend: {
        loadPath: "lang/{{lng}}.json"
      }
    })
    .then(() => {
      jqueryI18next.init(i18next, $);
      $("body").localize();
    });
};

async function generate(
  text,
  paper,
  textScale,
  textColor,
  charSpace,
  font,
  uploadFont,
  shadowOffset,
  shadowRadius,
  shadowColor,
  blur,
  opacity,
  paperRotation,
  beginningOffset,
  distortion,
  horizontalOffset,
  verticalOffset
) {
  if (text === "") {
    alert(i18next.t("alert-no-text-input"));
    return;
  }

  if (font === "upload" && typeof uploadFont === "undefined") {
    alert(i18next.t("alert-no-font-uploaded"));
    return;
  }

  document.querySelector("#downloadPDF").setAttribute("disabled", "disabled");
  document.querySelector(
    "#preview"
  ).innerHTML = `<div class="preview-placeholder"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>`;
  const generatedCanvas = document.createElement("div");

  currentConfig = paperConfig[paper];

  const line_width = currentConfig["end"]["x"] - currentConfig["start"]["x"];
  const line_height =
    (currentConfig["end"]["y"] - currentConfig["start"]["y"]) /
    (currentConfig["line_count"] - 1);

  let fontName;
  let fontUrl;

  if (font === "upload") {
    fontName = uploadFont.name;
    fontUrl = URL.createObjectURL(uploadFont);
  } else {
    fontName = font;
    fontUrl = `fonts/${font}`;
  }

  const fontRep = `${parseInt(
    (currentConfig["default_font_size"] * textScale) / 100
  )}px "${fontName}"`;

  if (!document.fonts.check(fontRep)) {
    const fontLoaded = await new FontFace(fontName, `url("${fontUrl}")`).load();
    document.fonts.add(fontLoaded);
    if (!document.fonts.check(fontRep)) {
      alert(i18next.t("alert-text-size-not-supported"));
      return;
    }
  }

  while (text.length != 0) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = currentConfig["width"] * 10;
    canvas.height = currentConfig["height"] * 10;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    const radian = ((Math.random() - 0.5) * 2 * paperRotation * Math.PI) / 180;
    ctx.rotate(radian);
    // How to get scale factor such that after rotation, no blank area exist?
    // wolframalpha: Solve[{y - b/2*cos(θ) == (x - b/2*sin(θ))*(-tan(θ)), y==b/a*x},{x,y}]
    // Let x denote its nontrivial solution, then factor equals to (a/2)/x, i.e., factor = (tan(θ)/k + 1)cos(θ)
    // Also, abs() is needed i.e. it works for both clockwise and anti-clockwise rotation
    const radianAbs = Math.abs(radian);
    let k = canvas.height / canvas.width;
    if (k > 1) {
      k = 1 / k;
    }
    const factor = (Math.tan(radianAbs) / k + 1) * Math.cos(radianAbs);
    ctx.scale(factor, factor);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);

    // render background
    const loadingTask = pdfjsLib.getDocument(`./papers/${paper}.pdf`);
    const page = await loadingTask.promise.then(pdf => pdf.getPage(1));
    const viewport = page.getViewport({ scale: 1 });
    const scale = canvas.width / viewport.width;
    const scaledViewport = page.getViewport({ scale: scale });
    const renderContext = {
      canvasContext: ctx,
      viewport: scaledViewport
    };
    await page.render(renderContext).promise;

    ctx.font = fontRep;
    ctx.fillStyle = textColor;
    ctx.textBaseline = "bottom";
    ctx.filter = `blur(${blur}px) opacity(${opacity}%) drop-shadow(${shadowOffset}px ${shadowOffset}px ${shadowRadius}px ${shadowColor})`;

    let consumed = 0;
    for (
      let currentLine = 0;
      currentLine < currentConfig["line_count"] && consumed < text.length;
      currentLine++
    ) {
      // calc lineConsumed
      let lineConsumed = 0;
      while (true) {
        if (
          ctx.measureText(text.slice(consumed, consumed + lineConsumed + 1))
            .width >
            line_width * canvas.width ||
          consumed + lineConsumed >= text.length
        ) {
          const newLinePostion = text
            .slice(consumed, consumed + lineConsumed)
            .indexOf("\n");
          if (newLinePostion != -1) {
            lineConsumed = newLinePostion + 1;
          }
          break;
        } else {
          lineConsumed++;
        }
      }

      ctx.fillText(
        text.slice(consumed, consumed + lineConsumed),
        (currentConfig["start"]["x"] +
          (Math.random() * beginningOffset) / 100) *
          canvas.width,
        (currentConfig["start"]["y"] + currentLine * line_height) *
          canvas.height
      );
      consumed += lineConsumed;
    }
    generatedCanvas.appendChild(canvas);

    text = text.slice(consumed, text.length);
  }

  if (font === "upload") {
    URL.revokeObjectURL(fontUrl);
  }
  document.querySelector("#preview").innerHTML = "";
  document.querySelector("#preview").append(...generatedCanvas.childNodes);
  document.querySelector("#downloadPDF").removeAttribute("disabled");
}

function downloadPDF() {
  const allCanvas = document.querySelectorAll("#preview > canvas");
  const pdf = new jsPDF({
    format: currentConfig["target_foramt"]
  });
  let isFirst = true;
  for (let canvas of allCanvas) {
    if (!isFirst) {
      pdf.addPage();
    } else {
      isFirst = false;
    }
    pdf.addImage(canvas, 0, 0, currentConfig["width"], currentConfig["height"]);
  }
  pdf.save("download.pdf");
}
