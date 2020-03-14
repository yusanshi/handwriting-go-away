<template>
  <b-form>
    <b-form-group>
      <b-form-textarea
        v-model="form.text"
        :placeholder="$t('placeholder.input-here')"
        rows="10"
        max-rows="16"
      ></b-form-textarea>
    </b-form-group>

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
          <b-col sm="6" lg="12" xl="6" v-show="form.paper.includes('noline')">
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
              <b-input-group append="%">
                <b-form-input
                  v-model="form.textScale"
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

    <b-button
      size="lg"
      variant="primary"
      @click="$emit('generate', form)"
      class="mr-3"
    >
      {{ $t('generate') }}</b-button
    >
    <b-button
      size="lg"
      variant="outline-primary"
      @click="$emit('download')"
      :disabled="downloadDisabled"
    >
      {{ $t('download-pdf') }}</b-button
    >
  </b-form>
</template>

<script>
export default {
  name: 'Control',
  data() {
    return {
      form: {
        text: '',
        font: this.$t('font')[0].value,
        uploadFont: null,
        paper: this.$t('paper')[0].value,
        lineCount: 22,
        textScale: 100,
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
    };
  },
  props: {
    downloadDisabled: Boolean,
  },
};
</script>
