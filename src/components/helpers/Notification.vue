<template>
  <v-alert
      v-if="opened"
      color="error"
      icon="$error"
      :title="title"
  ></v-alert>
</template>

<script>
import { VAlert } from 'vuetify/components';
export default {
  name: 'Notification',
  components: {
    VAlert
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    title: String,
    showTimeMls: {
      type: Number,
      default: 3000
    },
  },
  data: () => ({
    notificationTimerId: null,
  }),
  computed: {
    opened: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  },
  methods: {
    onClose() {
      this.opened = false;
    }
  },
  watch: {
    opened: {
      immediate: true,
      handler(value) {
        if (!value) {
          clearTimeout(this.notificationTimerId);
        } else {
          this.notificationTimerId = setTimeout(() => {
            this.onClose();
          }, this.showTimeMls);
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>