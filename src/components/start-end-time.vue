<template>
  <div>
    <StartTime v-model="startTime3" />
    ~
    <EndTime v-model="endTime3" /><br />
    <div v-if="checkBothTimes3" class="is-danger">
      StartTime3 and EndTime3 cannot be the same
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import EndTime from "./end-time.vue";
import StartTime from "./start-time.vue";

export default Vue.extend({
  components: { StartTime, EndTime },
  data: () => ({
    startTime3: "",
    endTime3: "",
  }),
  watch: {
    endTime3(time: string) {
      console.log(`watch endTime3 in start-end-time: ${time}`);
    },
    startTime3(time: string) {
      console.log(`watch startTime3 in start-end-time: ${time}`);
    },
  },
  computed: {
    checkBothTimes3() {
      return (
        this.startTime3.length > 0 &&
        this.endTime3.length > 0 &&
        this.startTime3 === this.endTime3
      );
    },
  },
});
</script>

<style scoped></style>
