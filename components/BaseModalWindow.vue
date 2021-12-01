<template>
  <transition name="slide-up">
    <div v-if="show" class="modal-window modal-wrapper">
      <div class="modal-container">
        <div :class="['modal-header', headerClasses]">
          <div v-if="!isWideLeft" class="modal-header-left">
            <slot name="header-left">
              <button
                type="button"
                class="btn btn-header"
                @click="closeModal">
                <img src="~static/icons/arrow-left-solid.png" class="header-icon" alt="Back"  />
              </button>
            </slot>
          </div>

          <div class="modal-header-middle" :class="{ 'is-wide': isWide, 'm-3': isWideLeft }">
            <slot name="header-middle" />
          </div>

          <div v-if="!isWide" class="modal-header-right">
            <slot name="header-right" />
          </div>
        </div>

        <div class="modal-content">
          <slot />
        </div>

        <transition name="slide-up">
          <div v-if="show && $slots.footer" class="modal-footer">
            <slot name="footer">
              <button
                class="btn btn-primary btn-block"
                type="button"
                @click="closeModal">
                {{ $t('general.close') }}
              </button>
            </slot>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
// import Common from '~/mixins/Common';

export default {
  name: 'BaseModalWindow',

  // mixins: [Common],

  props: {
    isWide: {
      type: Boolean,
      default: false,
    },

    isWideLeft: {
      type: Boolean,
      default: false,
    },

    transparent: {
      type: Boolean,
      required: false,
      default: false,
    },

    isTwoBtn: {
      type: Boolean,
      required: false,
      default: false,
    },

    isSolid: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      show: false,
    };
  },

  computed: {
    headerClasses() {
      return {
        transparent: this.transparent,
      };
    },
  },

  created() {
    setTimeout(() => {
      this.show = !this.show;
    }, 150);
  },

  mounted() {
    document.body.classList.add('overflow-hidden');
    document.addEventListener('keydown', this.triggerKey);
  },

  beforeDestroy() {
    document.body.classList.remove('overflow-hidden');
    document.removeEventListener('keydown', this.triggerKey);
    this.show = !this.show;
  },

  methods: {
    closeModal() {
      this.show = !this.show;

      setTimeout(() => {
        this.$emit('close');
      }, 150);
    },

    triggerKey(event) {
      if (event.keyCode !== 27) return;
      this.closeModal();
    },
  },
};
</script>

<style lang="scss" scoped>
  .modal-window {
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.35);
    z-index: 1200;

    .modal-container {
      width: 100vw;
      background-color: #FFFFFF;
    }

    .transparent {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1100;
      background-color: rgba(0,0,0,0) !important;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 !important;
      height: 100%;
      width: 100%;
      height: 56px;
      background-color: #E5E5E5;
      border-bottom: 2px solid #eee;
      color: #FFFFFF;
      border-radius: 0 !important;

      .modal-header-left,
      .modal-header-right {
        min-width: 4rem;
        width: auto;

        .btn-header {
          min-width: 0;
          width: 100%;
          padding: 1rem;
        }

        .header-icons {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-right: 0.5rem;
        }
      }

      .modal-header-right-2 {
        width: auto;
      }

      .modal-header-middle {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: center;
        font-size: 20px;
        font-weight: 500;
        color: #424242;

        &.is-wide {
          margin-right: 0.75rem;
          text-align: left;
        }

        h1 {
          margin-bottom: 0;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 1.25rem;
          line-height: 56px;
        }
      }
    }

    .modal-content {
      top: -1px;
      height: calc(100vh - #{56px});
      width: 100vw;
      overflow-y: auto;
      border: none !important;
      border-radius: 0 !important;
    }

    .modal-footer {
      position: fixed;
      left: 0;
      bottom: 0;
      display: flex;
      flex-wrap: wrap;
      padding: 0.5rem 1rem;
      width: 100vw;
      z-index: 1030;
      background-color: #FFFFFF;
    }
  }
</style>
