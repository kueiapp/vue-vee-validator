<template>
  <div id="app">
    <img src="@/assets/logo.png" width="100" />
    <h1>sample 1</h1>
    <section>
      <input v-validate="'required|email'" name="email2" type="text" /><br />
      <span class="is-danger">{{ $validator.errors.first("email2") }}</span>
    </section>
    <h1>sample 2</h1>
    <section class="sample-2">
      <form @submit.prevent="validateBeforeSubmit">
        <section class="row">
          <div class="column">
            <div class="is-12">
              <label class="label">Email</label>
              <p class="control has-icon has-icon-right">
                <input
                  name="email"
                  v-model="email"
                  v-validate="'required|email'"
                  :class="{
                    input: true,
                    'is-danger': $validator.errors.has('email'),
                  }"
                  type="text"
                  placeholder="Email"
                /><br />
                <span
                  v-show="$validator.errors.has('email')"
                  class="help is-danger"
                  >{{ $validator.errors.first("email") }}</span
                >
              </p>
            </div>
            <div class="is-12">
              <label class="label">Name</label>
              <p class="control has-icon has-icon-right">
                <input
                  name="name"
                  v-model="name"
                  v-validate="'required|alpha'"
                  :class="{
                    input: true,
                    'is-danger': $validator.errors.has('name'),
                  }"
                  type="text"
                  placeholder="Name"
                /><br />
                <span
                  v-show="$validator.errors.has('name')"
                  class="help is-danger"
                  >{{ $validator.errors.first("name") }}</span
                >
              </p>
            </div>
          </div>
          <div class="column">
            <div class="is-12">
              <label class="label">Phone</label>
              <p class="control has-icon has-icon-right">
                <input
                  name="phone"
                  v-model="phone"
                  v-validate="'required|numeric'"
                  :class="{
                    input: true,
                    'is-danger': $validator.errors.has('phone'),
                  }"
                  type="text"
                  placeholder="Phone"
                /><br />
                <span
                  v-show="$validator.errors.has('phone')"
                  class="help is-danger"
                  >{{ $validator.errors.first("phone") }}</span
                >
              </p>
            </div>
            <div class="is-12">
              <label class="label">Website</label>
              <p class="control has-icon has-icon-right">
                <input
                  name="url"
                  v-model="url"
                  v-validate="'required|url'"
                  :class="{
                    input: true,
                    'is-danger': $validator.errors.has('url'),
                  }"
                  type="text"
                  placeholder="Website"
                /><br />
                <span
                  v-show="$validator.errors.has('url')"
                  class="help is-danger"
                  >{{ $validator.errors.first("url") }}</span
                >
              </p>
            </div>
          </div>
        </section>
        <div class="is-12">
          <p class="control">
            <button class="button is-primary" type="submit">Submit</button>
          </p>
        </div>
      </form>
    </section>
    <h1>sample 3 | ValidationObserver</h1>
    <ValidationObserver ref="observer" tag="article">
      <ValidationProvider
        v-slot="{ errors }"
        name="start"
        rules="required|date_format:HH:mm"
        tag="div"
      >
        <input
          v-model="startTime"
          placeholder="--:--"
          :class="{ isDanger: errors.length > 0 }"
        /><br />
        <span v-if="errors.length > 0" class="is-danger">{{ errors[0] }}</span>
      </ValidationProvider>
      ~
      <ValidationProvider
        v-slot="{ errors }"
        name="start"
        rules="required|date_format:HH:mm"
        tag="div"
      >
        <input
          v-model="endTime"
          placeholder="--:--"
          :class="{ isDanger: errors.length > 0 }"
        /><br />
        <span v-if="errors.length > 0" class="is-danger">{{ errors[0] }}</span>
      </ValidationProvider>
      <div v-if="checkBothTimes" class="is-danger">
        StartTime and EndTime cannot be the same
      </div>
    </ValidationObserver>
    <h1>sample 4 | ValidationObserver in child</h1>
    <ValidationObserver ref="observer2" tag="article">
      <StartTime v-model="startTime2" />
      ~
      <EndTime v-model="endTime2" />
      <div v-if="checkBothTimes2" class="is-danger">
        StartTime2 and EndTime2 cannot be the same
      </div>
    </ValidationObserver>
    <h1>sample 5 | ValidationObserver in child2</h1>
    <ValidationObserver ref="observer3" tag="article">
      <StartEndTime />
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import StartTime from "./components/start-time.vue";
import EndTime from "./components/end-time.vue";
import StartEndTime from "./components/start-end-time.vue";
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default Vue.extend({
  name: "App",
  components: {
    ValidationObserver,
    ValidationProvider,
    StartTime,
    EndTime,
    StartEndTime,
  },
  data: (): any => ({
    email: "",
    phone: "",
    url: "",
    name: "",
    startTime: "",
    endTime: "",
    startTime2: "",
    endTime2: "",
  }),
  watch: {
    startTime2(time: string) {
      console.log(`watch startTime2: ${time}`);
    },
    endTime2(time: string) {
      console.log(`watch endTime2: ${time}`);
    },
  },
  computed: {
    checkBothTimes() {
      return (
        this.startTime.length > 0 &&
        this.endTime.length > 0 &&
        this.startTime === this.endTime
      );
    },
    checkBothTimes2() {
      return (
        this.startTime2.length > 0 &&
        this.endTime2.length > 0 &&
        this.startTime2 === this.endTime2
      );
    },
  },
  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then((result: boolean) => {
        if (result) {
          // eslint-disable-next-line
          alert("Form Submitted!");
          return;
        }

        alert("Correct them errors!");
      });
    },
  },
});
</script>

<style lang="scss">
html,
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: rgb(247, 247, 247);
  padding: 60px 0;
  input {
    width: 120px;
    height: 44px;
    margin-bottom: 16px;
    border-radius: 8px;
    border: 1px solid gray;
    &:focus {
      border: 1px solid green;
      outline: none;
    }
    &.isDanger {
      border: 1px solid red;
    }
  }
  .is-danger {
    color: red;
  }

  div {
    display: inline-block;
    margin-right: 8px;
    &.invalid {
      border: 1px solid red;
    }
  }

  .sample-2 {
    form {
      display: flex;
      flex-direction: column;
      .row {
        display: flex;
        justify-content: center;
        .column {
          display: flex;
          flex-direction: column;
        }
      }
    }
  }

  article {
    display: flex;
    flex-direction: column;
  }

  article,
  section {
    padding: 16px;
    background: white;
    width: 70%;
    margin: 0 auto;
  }
}
</style>
