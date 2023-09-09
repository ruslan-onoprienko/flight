<template>
  <div class="home-view">
    <FormSubmission />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

import FormSubmission from "../components/FormSubmission.vue";

export default defineComponent({
  name: 'HomeView',

  components: {
    FormSubmission,
  },
});
</script>

<style lang="scss" scoped>
.home-view {
  cursor: default;
  padding: 200px;
  height: 50vh;
  background-color: #FFE165;
}
</style>
