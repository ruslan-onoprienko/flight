<template>
  <div class="validation-wrapper">
    <v-text-field
        :rules="requiredWrapper"
        v-model="valueWrapper"
    ></v-text-field>
  </div>
</template>

<script>
import { VTextField } from 'vuetify/components';
export default {
  name: 'Validation',
  components: {
    VTextField
  },
  props: {
    value: Number,
    requireMessage: String,
  },
  computed: {
    valueWrapper() {
      return this.value;
    },
    requiredWrapper() {
      return [
        value => {
          if (value) {
            return true;
          }

          return this.requireMessage;
        },
      ];
    }
  }
};
</script>

<style scoped lang="scss">
.validation-wrapper {
  :deep(.v-input__control) {
    display: none;
  }
}
</style>