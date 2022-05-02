<template>
  <ValidationProvider
    v-slot="{ errors }"
    name="end-value"
    rules="required|date_format:HH:mm"
    tag="div"
    ref="endTimeProvider"
  >
    <input
      v-model="endTime"
      placeholder="--:--"
      :class="{ isDanger: errors.length > 0 }"
    /><br />
    <span v-if="errors.length > 0" class="is-danger">{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script lang="ts">
import Vue from "vue";
import { ValidationProvider } from "vee-validate";

export default Vue.extend({
  components: { ValidationProvider },
  props: {
    value: String,
  },
  model: {
    prop: "value",
    event: "input",
  },
  // ValidationProvider needs v-model
  data: () => ({ endTime: "" }),
  watch: {
    value(time: string) {
      this.endTime = time;
    },
    endTime(time: string) {
      this.$emit("input", time);
    },
  },
  mounted() {
    this.endTime = this.value;
  },
});
</script>

<style scoped></style>
