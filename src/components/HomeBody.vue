<template>
  <b-row>
    <b-col lg="4" class="mb-4">
      <b-form>
        <b-tabs content-class="mt-3" class="mb-2" fill>
          <b-tab :title="$t('tab.general')" active>
            <b-row>
              <b-col sm="6" lg="12" xl="6">
                <b-form-group :label="$t('label.paper')">
                  <b-form-select
                    v-model="form.paper"
                    :options="$t('paper')"
                  ></b-form-select>
                </b-form-group>
              </b-col>
              <b-col sm="6" lg="12" xl="6">
                <b-form-group :label="$t('label.font')">
                  <b-form-select
                    v-model="form.font"
                    :options="$t('font')"
                  ></b-form-select>
                </b-form-group>
              </b-col>
              <b-col sm="6" lg="12" xl="6" v-show="form.font === 'upload'">
                <b-form-group :label="$t('label.upload-font')">
                  <b-form-file
                    :placeholder="$t('placeholder.choose-font')"
                    :drop-placeholder="$t('placeholder.drop-font-here')"
                    v-model="form.uploadFont"
                  ></b-form-file>
                </b-form-group>
              </b-col>
              <b-col sm="6" lg="12" xl="6">
                <b-form-group :label="$t('label.scale')">
                  <b-input-group append="px">
                    <b-form-input
                      v-model="form.fontSize"
                      type="number"
                      min="1"
                    ></b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col sm="6" lg="12" xl="6">
                <b-form-group :label="$t('label.color')">
                  <b-form-input
                    v-model="form.textColor"
                    type="color"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="6" lg="12" xl="6">
                <b-form-group :label="$t('label.char-space')">
                  <b-input-group append="%">
                    <b-form-input
                      v-model="form.charSpacing"
                      type="number"
                      step="0.05"
                    ></b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>
          </b-tab>

          <b-tab :title="$t('tab.simulation')">
            <b-row>
              <b-col sm="6" lg="12" xl="6">
                <b-form-group :label="$t('label.shadow-offset')">
                  <b-input-group append="px">
                    <b-form-input
                      v-model="form.shadowOffset"
                      type="number"
                    ></b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col sm="6" lg="12" xl="6">
                <b-form-group :label="$t('label.shadow-radius')">
                  <b-input-group append="px">
                    <b-form-input
                      v-model="form.shadowRadius"
                      type="number"
                      min="0"
                    ></b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col sm="6" lg="12" xl="6">
                <b-form-group :label="$t('label.shadow-color')">
                  <b-form-input
                    v-model="form.shadowColor"
                    type="color"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="6" lg="12" xl="6">
                <b-form-group :label="$t('label.blur')">
                  <b-input-group append="px">
                    <b-form-input
                      v-model="form.blur"
                      type="number"
                      step="0.05"
                      min="0"
                    ></b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col sm="6" lg="12" xl="6">
                <b-form-group :label="$t('label.opacity')">
                  <b-input-group append="%">
                    <b-form-input
                      v-model="form.opacity"
                      type="number"
                      min="0"
                      max="100"
                    ></b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col sm="6" lg="12" xl="6">
                <b-form-group :label="$t('label.rotation')">
                  <b-input-group append="°">
                    <b-form-input
                      v-model="form.paperRotation"
                      type="number"
                      min="0"
                      max="89"
                    ></b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col sm="6" lg="12" xl="6">
                <b-form-group :label="$t('label.beginning-offset')">
                  <b-input-group append="%">
                    <b-form-input
                      v-model="form.beginningOffset"
                      type="number"
                      step="0.05"
                      min="0"
                    ></b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col sm="6" lg="12" xl="6">
                <b-form-group :label="$t('label.distortion')">
                  <b-input-group append="%">
                    <b-form-input
                      v-model="form.distortion"
                      :disabled="true"
                    ></b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col sm="6" lg="12" xl="6">
                <b-form-group :label="$t('label.horizontal-offset')">
                  <b-input-group append="%">
                    <b-form-input
                      v-model="form.horizontalOffset"
                      type="number"
                      step="0.05"
                      min="0"
                    ></b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col sm="6" lg="12" xl="6">
                <b-form-group :label="$t('label.vertical-offset')">
                  <b-input-group append="%">
                    <b-form-input
                      v-model="form.verticalOffset"
                      type="number"
                      step="0.05"
                      min="0"
                    ></b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>
          </b-tab>
        </b-tabs>
        <b-button size="lg" variant="primary" @click="configurate" class="mr-3">
          {{ $t('configurate') }}</b-button
        >
        <b-button size="lg" variant="outline-primary" @click="download">
          {{ $t('download-pdf') }}</b-button
        >
      </b-form>
    </b-col>
    <b-col lg="8">
      <div id="display"></div>
    </b-col>
  </b-row>
</template>

<script>
/* eslint-disable no-unused-vars */
// TODO

// TODO press Enter to configurate

import pdfjsLib from 'pdfjs-dist';
import jsPDF from 'jspdf';
import { fabric } from 'fabric';
import photoPaperConfig from '../../public/papers/photos';
import paperSizeTable from '../../public/papers/size';
import randomString from '../utils/random';
import PDFJSWorker from 'file-loader!pdfjs-dist/build/pdf.worker.min'; // eslint-disable-line
pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJSWorker;

const FACTOR = 4;

export default {
  name: 'HomeBody',
  data() {
    return {
      fabricCanvas: [],
      text: '直接在这里编辑文字...',
      fontFamily: '',
      paperImage: null,
      form: {
        font: {
          name: this.$t('font')[0].value,
          uploadFont: null,
          size: 22,
          color: '#000000',
          weight: 'normal',
        },
        charSpacing: -0.2,
        textEffect: {
          shadow: {
            color: '#666666',
            offset: {
              horizontal: 1,
              vertical: 1,
            },
            blurSize: 1,
          },
          opacity: 0.9,
          distortion: this.$t('in-developing'),
        },
        paper: {
          isPhoto: false,
          rotation: 2, // angle
          // if true
          name: this.$t('paper')[0].value,
          // if false
          size: 'a4',
          direction: 'vertical',
          withLine: true,
          margin: {
            // percent
            top: 0.05,
            right: 0.05,
            bottom: 0.05,
            left: 0.05,
          },
          lineHeight: 1.5,
          backgoundColor: '#ffffff',
        },
        randomOffset: {
          lineBeginning: 1.6,
          horizontal: 0.05,
          vertical: 0.15,
        },
        paperSize: null, // used for generating pdf
      },
    };
  },
  mounted() {
    const canvasElem = document.createElement('canvas');
    document.querySelector('#display').appendChild(canvasElem);
    const canvas = new fabric.Canvas(canvasElem);
    const textBox = new fabric.Textbox('');
    canvas.add(textBox);
    this.fabricCanvas.push(canvas);

    this.syncConfig();
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

    syncConfig() {
      this.paperSize = this.form.paper.isPhoto
        ? photoPaperConfig[this.form.paper.name].size
        : this.form.paper.size;
      const { shadow } = this.form.textEffect;
      const { margin } = this.form.paper.isPhoto
        ? photoPaperConfig[this.form.paper.name].margin
        : this.form.paper;
      this.fabricCanvas.forEach((canvas) => {
        canvas.setWidth(paperSizeTable[this.paperSize].width * FACTOR);
        canvas.setHeight(paperSizeTable[this.paperSize].height * FACTOR);
        const textBox = canvas.item(0);
        textBox.set({
          text: this.text,
          left: margin.left * canvas.width,
          top: margin.top * canvas.height,
          width: (1 - margin.left - margin.right) * canvas.width,
          height: (1 - margin.top - margin.bottom) * canvas.height,
          fontSize: this.form.font.size,
          fontFamily: this.fontFamily,
          opacity: this.form.textEffect.opacity,
          shadow: `${shadow.color} ${shadow.offset.horizontal}px ${shadow.offset.vertical}px ${shadow.offset.blurSize}px`,
        });

        // update image : paperImage
        canvas.renderAll();
      });
    },

    configurate() {
      // get paper -> paperImage
      // get font -> fontFamily
      this.syncConfig();
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


<style>
canvas {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
}
</style>
