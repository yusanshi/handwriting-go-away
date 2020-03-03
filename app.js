import paperConfig from "./papers/config.js";

// current paper config
let currentConfig;

window.onload = () => {
  document.querySelector("#generatorForm").addEventListener("submit", e => {
    e.preventDefault();
    if (e.target["text"].value.length == 0) {
      alert("Please input the text!");
    } else {
      generate(
        e.target["text"].value,
        e.target["font"].value,
        e.target["fontScale"].value,
        e.target["paper"].value,
        e.target["letterSpace"].value,
        e.target["leftBias"].value,
        e.target["paperSlope"].value
      );
    }
  });

  document.querySelector("#downloadPDF").addEventListener("click", downloadPDF);
};

async function generate(
  text,
  font,
  fontScale,
  paper,
  letterSpace,
  leftBias,
  paperSlope
) {
  document.querySelector("#downloadPDF").setAttribute("disabled", "disabled");
  document.querySelector("#preview").innerHTML = "";
  currentConfig = paperConfig[paper];

  while (text.length != 0) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = currentConfig["width"] * 10;
    canvas.height = currentConfig["height"] * 10;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    const radian = ((Math.random() - 0.5) * 2 * paperSlope * Math.PI) / 180;
    ctx.rotate(radian);
    // How to get scale factor such that after rotate, no blank area exist
    // wolframalpha: Solve[{y - b/2*cos(θ) == (x - b/2*sin(θ))*(-tan(θ)), y==b/a*x},{x,y}]
    // get x than factor equals to a/2/x, i.e., factor = (tan(θ)/k + 1)cos(θ)
    // Also, abs() is needed i.e. it works for both clockwise and anti-clockwise rotatation
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

    // render font
    const line_width = currentConfig["end"]["x"] - currentConfig["start"]["x"];
    const line_height =
      (currentConfig["end"]["y"] - currentConfig["start"]["y"]) /
      (currentConfig["line_count"] - 1);

    const fontRep = `${parseInt(
      currentConfig["default_font_size"] * fontScale
    )}px ${font}`;

    if (!document.fonts.check(fontRep)) {
      const fontLoaded = await new FontFace(
        font,
        `url(fonts/${font}.TTF)`
      ).load();
      document.fonts.add(fontLoaded);
    }

    ctx.font = fontRep;
    ctx.fillStyle = "black";
    ctx.textBaseline = "bottom";

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
        (currentConfig["start"]["x"] + Math.random() * leftBias) * canvas.width,
        (currentConfig["start"]["y"] + currentLine * line_height) *
          canvas.height
      );
      consumed += lineConsumed;
    }

    document.querySelector("#preview").appendChild(canvas);
    text = text.slice(consumed, text.length);
  }
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
