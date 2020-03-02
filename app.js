const paperConfig = {
  A4: {
    vertical: {
      width: 210,
      height: 297,
      line_count: 23,
      line_height: 0.03703,
      line_width: 0.88762,
      start: {
        x: 0.05611,
        y: 0.09289
      }
    },
    horizontal: {
      width: 297,
      height: 210
    }
  },
  A3: {
    vertical: {},
    horizontal: {}
  }
};

window.onload = () => {
  document.querySelector("#generatorForm").addEventListener("submit", e => {
    e.preventDefault();
    generate(
      e.target["text"].value,
      e.target["font"].value,
      e.target["fontSize"].value,
      e.target["paper"].value,
      e.target["direction"].value,
      e.target["wordsPerLine"].value,
      e.target["bgColor"].value
    );
  });

  document.querySelector("#downloadPDF").addEventListener("click", downloadPDF);
};

function generate(
  text,
  font,
  fontSize,
  paper,
  direction,
  wordsPerLine,
  bgColor
) {
  document.querySelector("#downloadPDF").setAttribute("disabled", "disabled");
  document.querySelector("#preview").innerHTML = "";
  const config = paperConfig[paper][direction];
  paperGlobal = paper;

  while (text.length != 0) {
    const consumed = Math.min(50, text.length);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.height = config["height"] * 10;
    canvas.width = config["width"] * 10;

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    };
    img.src = `./papers/${paper}-${direction}.svg`;

    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "green";
    ctx.fillText(
      text.slice(0, consumed),
      config["start"]["x"] * canvas.width,
      config["start"]["y"] * canvas.height
    );
    document.querySelector("#preview").appendChild(canvas);
    text = text.slice(consumed, text.length);
  }
  document.querySelector("#downloadPDF").removeAttribute("disabled");
}

function downloadPDF() {
  allCanvas = document.querySelectorAll("#preview > canvas");
  const pdf = new jsPDF();
  let isFirst = true;
  for (let canvas of allCanvas) {
    if (!isFirst) {
      pdf.addPage();
    } else {
      isFirst = false;
    }
    pdf.addImage(canvas, 0, 0);
  }
  pdf.save("download.pdf");
}
