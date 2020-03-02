window.onload = () => {
  document.querySelector("#generatorForm").addEventListener("submit", e => {
    e.preventDefault();
    generate(e.target["textArea"].value, "A4");
  });
};

function generate(text, paper) {
  const canvas = document.getElementById("preview");
  const ctx = canvas.getContext("2d");
  // TODO
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const img = new Image();
  img.onload = () => {
    ctx.drawImage(img, 0, 0);
  };
  img.src = `./papers/${paper}.svg`;

  fetch(`./papers/${paper}.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(json => {
      console.log(json);
      canvas.height = json["height"] * 10;
      canvas.width = json["width"] * 10;
      // do stuff
      ctx.font = "30px Comic Sans MS";
      ctx.fillStyle = "red";
      ctx.textAlign = "center";
      ctx.textBaseline ="bottom";
      ctx.fillText(
        "Hello, world",
        json["start"]["x"] * canvas.width,
        json["start"]["y"] * canvas.height
      );
    })
    .catch(error => {
      console.log("There has been a problem with your fetch operation:", error);
    });
}
