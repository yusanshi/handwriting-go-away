<template>
  <b-form>
    <b-form-group>
      <b-form-textarea
        v-model="form.text"
        :placeholder="$t('placeholder.inputHere')"
        rows="10"
        max-rows="16"
      ></b-form-textarea>
    </b-form-group>

    <b-tabs content-class="mt-3" class="mb-2" fill>
      <b-tab :title="$t('tab.paper')" active>
        <b-row>
          <b-col sm="6" lg="12" xl="6">
            <b-form-group :label="$t('form.paper.source')">
              <b-form-select
                v-model="form.paper.source"
                :options="$t('paper.source')"
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col sm="6" lg="12" xl="6" v-show="form.paper.source !== 'upload'">
            <b-form-group :label="$t('form.paper.hasLine')">
              <b-form-select
                v-model="form.paper.hasLine"
                :options="$t('paper.hasLine')"
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col sm="6" lg="12" xl="6" v-show="form.paper.source === 'photo'">
            <b-form-group :label="$t('form.paper.paper')">
              <b-form-select
                v-model="form.paper.paper"
                :options="
                  form.paper.hasLine ? $t('paper.line') : $t('paper.noline')
                "
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col sm="6" lg="12" xl="6" v-show="form.paper.source === 'upload'">
            <b-form-group :label="$t('form.paper.upload')">
              <b-form-file
                :placeholder="$t('placeholder.choosePaper')"
                :drop-placeholder="$t('placeholder.dropHere')"
                v-model="form.paper.upload"
              ></b-form-file>
            </b-form-group>
          </b-col>
          <b-col sm="6" lg="12" xl="6">
            <b-form-group :label="$t('form.paper.size')">
              <b-form-select
                v-model="form.paper.size"
                :options="$t('paper.size')"
              ></b-form-select>
            </b-form-group>
          </b-col>

          <b-col
            sm="6"
            lg="12"
            xl="6"
            v-show="
              !(form.paper.source === 'photo' && form.paper.hasLine === true)
            "
          >
            <b-form-group :label="$t('form.paper.direction')">
              <b-form-select
                v-model="form.paper.direction"
                :options="$t('paper.direction')"
              ></b-form-select>
            </b-form-group>
          </b-col>

          <b-col
            sm="6"
            lg="12"
            xl="6"
            v-show="
              !(form.paper.source === 'photo' && form.paper.hasLine === true)
            "
          >
            <b-form-group :label="$t('form.paper.lineCount')">
              <b-form-input
                v-model="form.paper.lineCount"
                type="number"
                min="2"
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col
            sm="6"
            lg="12"
            xl="6"
            v-show="
              !(form.paper.source === 'photo' && form.paper.hasLine === true)
            "
          >
            <b-form-group
              :label="$t('form.paper.margin')"
              :description="$t('form.paper.marginDescription')"
            >
              <b-form-input v-model="form.paper.marginInText"></b-form-input>
            </b-form-group>
          </b-col>

          <b-col sm="6" lg="12" xl="6" v-show="form.paper.source === 'origin'">
            <b-form-group :label="$t('form.paper.backgroundColor')">
              <b-form-input
                v-model="form.paper.backgroundColor"
                type="color"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </b-tab>
      <b-tab :title="$t('tab.character')">
        <b-row>
          <b-col sm="6" lg="12" xl="6">
            <b-form-group :label="$t('form.character.font')">
              <b-form-select
                v-model="form.character.font"
                :options="$t('font')"
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col
            sm="6"
            lg="12"
            xl="6"
            v-show="form.character.font === 'upload'"
          >
            <b-form-group :label="$t('form.character.upload')">
              <b-form-file
                :placeholder="$t('placeholder.chooseFont')"
                :drop-placeholder="$t('placeholder.dropHere')"
                v-model="form.character.upload"
              ></b-form-file>
            </b-form-group>
          </b-col>
          <b-col sm="6" lg="12" xl="6">
            <b-form-group :label="$t('form.character.scale')">
              <b-input-group append="%">
                <b-form-input
                  v-model="form.character.scale"
                  type="number"
                  min="1"
                ></b-form-input>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col sm="6" lg="12" xl="6">
            <b-form-group :label="$t('form.character.color')">
              <b-form-input
                v-model="form.character.color"
                type="color"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="6" lg="12" xl="6">
            <b-form-group :label="$t('form.character.spacing')">
              <b-input-group append="%">
                <b-form-input
                  v-model="form.character.spacing"
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
            <b-form-group
              :label="$t('form.simulation.textEffect.shadow.offset.horizontal')"
            >
              <b-input-group append="px">
                <b-form-input
                  v-model="form.simulation.textEffect.shadow.offset.horizontal"
                  type="number"
                  step="0.5"
                ></b-form-input>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col sm="6" lg="12" xl="6">
            <b-form-group
              :label="$t('form.simulation.textEffect.shadow.offset.vertical')"
            >
              <b-input-group append="px">
                <b-form-input
                  v-model="form.simulation.textEffect.shadow.offset.vertical"
                  type="number"
                  step="0.5"
                ></b-form-input>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col sm="6" lg="12" xl="6">
            <b-form-group
              :label="$t('form.simulation.textEffect.shadow.radius')"
            >
              <b-input-group append="px">
                <b-form-input
                  v-model="form.simulation.textEffect.shadow.radius"
                  type="number"
                  step="0.5"
                  min="0"
                ></b-form-input>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col sm="6" lg="12" xl="6">
            <b-form-group
              :label="$t('form.simulation.textEffect.shadow.color')"
            >
              <b-form-input
                v-model="form.simulation.textEffect.shadow.color"
                type="color"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="6" lg="12" xl="6">
            <b-form-group :label="$t('form.simulation.textEffect.blurRadius')">
              <b-input-group append="px">
                <b-form-input
                  v-model="form.simulation.textEffect.blurRadius"
                  type="number"
                  step="0.05"
                  min="0"
                ></b-form-input>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col sm="6" lg="12" xl="6">
            <b-form-group :label="$t('form.simulation.textEffect.opacity')">
              <b-input-group append="%">
                <b-form-input
                  v-model="form.simulation.textEffect.opacity"
                  type="number"
                  min="0"
                  max="100"
                ></b-form-input>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col sm="6" lg="12" xl="6">
            <b-form-group :label="$t('form.simulation.paperRotation')">
              <b-input-group append="°">
                <b-form-input
                  v-model="form.simulation.paperRotation"
                  type="number"
                  step="0.1"
                  min="0"
                  max="89"
                ></b-form-input>
              </b-input-group>
            </b-form-group>
          </b-col>

          <b-col sm="6" lg="12" xl="6">
            <b-form-group
              :label="$t('form.simulation.randomOffset.lineBeginning')"
            >
              <b-input-group append="%">
                <b-form-input
                  v-model="form.simulation.randomOffset.lineBeginning"
                  type="number"
                  step="0.05"
                  min="0"
                ></b-form-input>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col sm="6" lg="12" xl="6">
            <b-form-group
              :label="$t('form.simulation.randomOffset.horizontal')"
            >
              <b-input-group append="%">
                <b-form-input
                  v-model="form.simulation.randomOffset.horizontal"
                  type="number"
                  step="0.05"
                  min="0"
                ></b-form-input>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col sm="6" lg="12" xl="6">
            <b-form-group :label="$t('form.simulation.randomOffset.vertical')">
              <b-input-group append="%">
                <b-form-input
                  v-model="form.simulation.randomOffset.vertical"
                  type="number"
                  step="0.05"
                  min="0"
                ></b-form-input>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col sm="6" lg="12" xl="6">
            <b-form-group :label="$t('form.simulation.textEffect.distortion')">
              <b-input-group append="%">
                <b-form-input
                  v-model="form.simulation.textEffect.distortion"
                  :disabled="true"
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
      {{ $t('downloadPdf') }}</b-button
    >
  </b-form>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Control',
  data() {
    return {
      form: {
        text: '',
        paper: {
          source: 'photo',
          hasLine: true,
          paper: '',
          upload: null,
          size: (this.$t('paper.size') as unknown as formSelectData)[1].value,
          direction: (this.$t(
            'paper.direction',
          ) as unknown as formSelectData)[0].value,
          lineCount: 22,
          marginInText: '10 10 10 10',
          backgroundColor: '#fafafa',
        },
        character: {
          font: (this.$t('font') as unknown as formSelectData)[0].value,
          upload: null,
          scale: 100,
          color: '#000000',
          spacing: -0.2,
        },
        simulation: {
          textEffect: {
            shadow: {
              color: '#666666',
              offset: {
                horizontal: 1.5,
                vertical: 1.5,
              },
              radius: 1.5,
            },
            blurRadius: 1.0,
            opacity: 85,
            distortion: this.$t('inDeveloping') as unknown as number,
          },
          randomOffset: {
            lineBeginning: 1.6,
            horizontal: 0.05,
            vertical: 0.15,
          },
          paperRotation: 1.5,
        },
      } as formType,
    };
  },
  methods: {
    updatePaperPaper(): void {
      this.form.paper.paper = this.form.paper.hasLine
        ? (this.$t('paper.line') as unknown as formSelectData)[0].value
        : (this.$t('paper.noline') as unknown as formSelectData)[0].value;
    },
  },
  props: {
    downloadDisabled: Boolean,
  },
  mounted() {
    this.updatePaperPaper();
  },
  watch: {
    'form.paper.hasLine': 'updatePaperPaper',
  },
});
</script>
