<template>
  <ValidationProvider
    v-slot="{ errors }"
    name="start-value"
    rules="required|date_format:HH:mm"
    tag="div"
    ref="startTimeProvider"
  >
    <input
      v-model="startTime"
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
  data: () => ({ startTime: "" }),
  watch: {
    value(time: string) {
      this.startTime = time;
    },
    startTime(time: string) {
      this.$emit("input", time);
    },
  },
  mounted() {
    this.startTime = this.value;
  },
});
</script>

<style scoped></style>
