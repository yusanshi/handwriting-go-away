<template>
  <div>
    <div v-if="state === State.BEGIN">
      <!-- eslint-disable -->
      <div class="preview-placeholder">
        <svg
          version="1.1"
          width="200"
          height="200"
          viewBox="0 0 187.9 187.9"
          style="fill:gray;"
        >
          <g>
            <path
              d="M141.7,165.2c-43,1.4-85.9-2.8-128.9-2.1c11.6-7.9,28.8-16.8,35-28.6c15.6-13.9,26.3-31.5,37.1-49.3
                c8.2-13.4,20-27.5,21.9-43.6c2.5-21-8.6-39.7-30-24.9c-0.5,0.3-0.8,0.7-1.1,1.2C62.3,26,52.3,42.2,43.4,54.6
                c-10.4,14.5-21.5,30-28.2,46.6c-0.6,0.2-1.2,0.7-1.3,1.5C9.3,123.4,2.7,143.9,0,164.9c-0.1,0.6,0,1.1,0.2,1.6
                c-0.2,2,1,4.2,3.7,4.5c34.5,3.7,69.7,4.6,104.4,4.6c3.9,0,61.6-3,62.5-1c1.5,3.3,6.3,2,7.2-0.9C182.3,159.9,147.2,165,141.7,165.2
                z M80.1,23c0.1-0.1,0.2-0.1,0.3-0.1c15.7-9.3,19.6,2.8,19,15.2c-0.2,3.5-1,6.7-2.1,9.7c-8.2-5.3-16.2-10.9-24.4-16.3
                C75.3,28.7,77.7,25.9,80.1,23z M69.9,35.1c7.9,6.7,16,13.1,24.7,18.6c-0.5,1-1.1,2-1.7,2.9C84,50.7,74.7,46,66.3,39.3
                C67.5,37.9,68.7,36.5,69.9,35.1z M18.1,111.5c5.6,0.7,10,4.4,8,10.8c-0.7,2.1,1.1,4,3.1,4.1c4.4,0.1,7.6,1.3,9.8,4.9
                c-5.1,5.2-10.5,9.7-16.2,14c-0.4-0.5-0.8-0.9-1.5-1.2c-1-0.4-1.9-0.9-2.7-1.5c-0.4-0.4-0.8-0.7-1.1-1.1c-0.3-0.3-0.7-0.6-1.1-0.7
                c-0.1-0.1-0.1-0.1-0.2-0.2c-1-0.9-1.8-1.6-2.8-1.9C15.5,129.7,17.6,120.7,18.1,111.5z"
            />
            <path
              d="M183.1,144.5c-42.7-4.2-88.5-8-130.8,1.1c-4.5,1-3.5,8.4,1.1,8.1c41.6-3.1,82-1.7,123.5,0.6c0.5,0.3,1.1,0.4,1.8,0.4
                c1.5-0.1,2.9-0.1,4.4-0.1C189.7,154.5,189.4,145.1,183.1,144.5z"
            />
          </g>
        </svg>
        <p class="text-muted my-3">
          {{
            $t('randomPrompt')[
              Math.floor(Math.random() * $t('randomPrompt').length)
            ]
          }}
        </p>
      </div>
      <!-- eslint-enable -->
    </div>
    <div v-else-if="state === State.LOADING">
      <div class="preview-placeholder">
        <div class="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <p class="text-muted my-3">{{ loadingPrompt }}</p>
      </div>
    </div>
    <div v-show="state === State.FINISH">
      <div id="preview"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import State from '../utils/state';

export default Vue.extend({
  name: 'Preview',
  props: {
    state: Symbol,
    loadingPrompt: String,
    allCanvas: Array as () => HTMLCanvasElement[],
  },
  data() {
    return {
      State,
    };
  },
  watch: {
    state(val: symbol) {
      if (val === State.FINISH) {
        document.querySelector('#preview')!.innerHTML = '';
        document.querySelector('#preview')!.append(...this.allCanvas);
      }
    },
  },
});
</script>

<style>
canvas {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
}
</style>

<style scoped>
.preview-placeholder {
  text-align: center;
  margin-top: 8rem;
  margin-bottom: 8rem;
}

@media (min-width: 992px) {
  .preview-placeholder {
    margin-top: 15rem;
  }
}

.lds-ring {
  margin: 1rem auto;
  position: relative;
  width: 120px;
  height: 120px;
}

.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 100px;
  height: 100px;
  margin: 12px;
  border: 12px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: gray transparent transparent transparent;
}

.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}

@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
