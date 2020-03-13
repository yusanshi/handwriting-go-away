<template>
  <b-container fluid>
    <b-row>
      <b-col lg="5" class="mb-4"
        ><Control
          @generate="generate"
          @download="download"
          :downloadDisabled="state !== State.FINISH"
        />
      </b-col>
      <b-col lg="7"
        ><Preview
          :state="state"
          :loadingPrompt="loadingPrompt"
          :allCanvas="generatedCanvas"
      /></b-col>
    </b-row>
  </b-container>
</template>

<script>
import pdfjsLib from 'pdfjs-dist';
import jsPDF from 'jspdf';
import Control from './Control.vue';
import Preview from './Preview.vue';
import State from '../utils/state';
import paperConfig from '../../public/papers/config';
import randomString from '../utils/random';
import '../utils/wrapper';
// eslint-disable-next-line
import PDFJSWorker from 'file-loader!pdfjs-dist/build/pdf.worker.min.js';
pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJSWorker;

export default {
  name: 'HomeBody',
  components: { Control, Preview },
  data() {
    return {
      state: State.BEGIN,
      loadingPrompt: '',
      State,
      generatedCanvas: [],
      currentConfig: null,
    };
  },
  methods: {
    customAlert(message) {
      this.$bvToast.toast(message, {
        title: 'Error',
        variant: 'warning',
        solid: true,
        autoHideDelay: 1500,
      });
    },
    async generate(form) {
      if (form.text === '') {
        this.customAlert(this.$t('alert.no-text-input'));
        return;
      }
      if (form.font === 'upload' && form.uploadFont === null) {
        this.customAlert(this.$t('alert.no-font-uploaded'));
        return;
      }

      this.state = State.LOADING;
      this.generatedCanvas = [];
      this.currentConfig = paperConfig[form.paper];
      const realLineCount = form.paper.includes('noline')
        ? form.lineCount
        : this.currentConfig.line_count;
      const lineWidth = this.currentConfig.end.x - this.currentConfig.start.x;
      const lineHeight = (this.currentConfig.end.y - this.currentConfig.start.y)
        / (realLineCount - 1);

      this.loadingPrompt = this.$t('prompt.loading-font');
      let fontUrl;
      if (form.font === 'upload') {
        fontUrl = URL.createObjectURL(form.uploadFont);
      } else {
        fontUrl = `./fonts/${form.font}`;
      }
      const fontName = randomString(6);

      const fontRep = `${parseInt(
        (this.currentConfig.default_font_size * form.textScale) / 100,
        10,
      )}px "${fontName}"`;

      try {
        const fontLoaded = await new FontFace(
          fontName,
          `url("${fontUrl}")`,
        ).load();
        document.fonts.add(fontLoaded);
      } catch (err) {
        this.state = State.BEGIN;
        this.customAlert(this.$t('alert.not-a-font-file'));
        return;
      }
      if (!document.fonts.check(fontRep)) {
        this.state = State.BEGIN;
        this.customAlert(this.$t('alert.text-not-supported'));
        return;
      }

      this.loadingPrompt = this.$t('prompt.loading-paper');
      const loadingTask = pdfjsLib.getDocument(`./papers/${form.paper}.pdf`);
      const page = await loadingTask.promise.then((pdf) => pdf.getPage(1));

      this.loadingPrompt = this.$t('prompt.typesetting');
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      tempCanvas.width = this.currentConfig.width * 10;
      tempCanvas.height = this.currentConfig.height * 10;
      tempCtx.font = fontRep;
      const textLines = tempCtx.typesetText(
        form.text,
        form.charSpace,
        lineWidth,
      );

      for (let i = 0, j = 1; i < textLines.length; i += realLineCount, j += 1) {
        this.loadingPrompt = this.$t('prompt.generating', { count: j });

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = this.currentConfig.width * 10;
        canvas.height = this.currentConfig.height * 10;
        ctx.translate(canvas.width / 2, canvas.height / 2);
        const radian = ((Math.random() - 0.5) * 2 * form.paperRotation * Math.PI) / 180;
        ctx.rotate(radian);
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
        ctx.fillStyle = form.textColor;
        ctx.textBaseline = 'bottom';
        ctx.filter = `blur(${form.blur}px) opacity(${form.opacity}%) drop-shadow(${form.shadowOffset}px ${form.shadowOffset}px ${form.shadowRadius}px ${form.shadowColor})`;

        textLines.slice(i, i + realLineCount).forEach((lineString, index) => {
          ctx.fillTextExtended(
            lineString,
            (this.currentConfig.start.x
              + (Math.random() * form.beginningOffset) / 100)
              * canvas.width,
            (this.currentConfig.start.y + index * lineHeight) * canvas.height,
            form.charSpace,
            form.distortion,
            form.horizontalOffset,
            form.verticalOffset,
          );
        });
        this.generatedCanvas.push(canvas);
      }

      if (form.font === 'upload') {
        URL.revokeObjectURL(fontUrl);
      }
      this.state = State.FINISH;
    },

    download() {
      // eslint-disable-next-line new-cap
      const pdf = new jsPDF({ format: this.currentConfig.target_foramt });
      this.generatedCanvas.forEach((canvas, index) => {
        if (index !== 0) {
          pdf.addPage();
        }
        pdf.addImage(
          canvas,
          0,
          0,
          this.currentConfig.width,
          this.currentConfig.height,
        );
      });
      pdf.save('download.pdf');
    },
  },
};
</script>
