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
              <b-col
                sm="6"
                lg="12"
                xl="6"
                v-show="form.paper.includes('noline')"
              >
                <b-form-group :label="$t('label.line-count')">
                  <b-form-input
                    v-model="form.lineCount"
                    type="number"
                    min="2"
                  ></b-form-input>
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
                      v-model="form.charSpace"
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
        <!-- TODO Enter to configurate -->
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

import pdfjsLib from 'pdfjs-dist';
import jsPDF from 'jspdf';
import { fabric } from 'fabric';
import paperConfig from '../../public/papers/config';
import randomString from '../utils/random';
import '../utils/wrapper';
import PDFJSWorker from 'file-loader!pdfjs-dist/build/pdf.worker.min'; // eslint-disable-line
pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJSWorker;

export default {
  name: 'HomeBody',
  data() {
    return {
      paperConfig: null,
      form: {
        font: this.$t('font')[0].value,
        uploadFont: null,
        paper: this.$t('paper')[0].value,
        lineCount: 22,
        fontSize: 25,
        textColor: '#000000',
        charSpace: -0.2,
        shadowOffset: 1,
        shadowRadius: 1,
        shadowColor: '#666666',
        blur: 0.6,
        opacity: 75,
        paperRotation: 2,
        beginningOffset: 1.6,
        distortion: this.$t('in-developing'),
        horizontalOffset: 0.05,
        verticalOffset: 0.15,
      },
      fabricCanvas: [],
    };
  },
  mounted() {
    const canvasElem = document.createElement('canvas');
    document.querySelector('#display').appendChild(canvasElem);
    const canvas = new fabric.Canvas(canvasElem, {
      width: 800,
      height: 600,
    });
    const textBox = new fabric.Textbox(
      '配置完成后，双击这里直接编辑你的文字。',
      {
        top: 50,
        left: 50,
        width: 700,
        fontSize: 25,
        splitByGrapheme: true,
      },
    );
    canvas.add(textBox);
    this.fabricCanvas.push(canvas);
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

    configurate() {
      this.fabricCanvas.forEach((canvas) => {
        const textBox = canvas.item(0);
        textBox.set({ fontSize: parseInt(this.form.fontSize, 10) });
        canvas.renderAll();
      });
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
