<template>
  <div id="app">

    <h3>Deadline1: {{ deadline1 }} (showDays = false)</h3>
    <flip-countdown
      :deadline="deadline1"
      :showDays="false"
      @timeElapsed="timeElapsedHandler"
    ></flip-countdown>
    <button v-on:click="deadline1ts += 10000">Extend Deadline1</button>

    <h3>Deadline2: {{ deadline2 }}</h3>
    <flip-countdown :deadline="deadline2"></flip-countdown>

    <h3>Deadline3: {{ deadline3 }}</h3>
    <flip-countdown :deadline="deadline3"></flip-countdown>
    <button v-on:click="deadline3 = '2018-12-25 00:00:00'">Set Deadline3 to previous date</button>

    <h3>Deadline4: {{ deadline4 }} (showDays = false, showHours = false)</h3>
    <flip-countdown
      :deadline="deadline4"
      :showDays="false"
      :showHours="false"
      @timeElapsed="timeElapsedHandler"
    ></flip-countdown>

    <h3>Deadline5: {{ deadline5 }} (showDays = false, showSeconds = false)</h3>
    <flip-countdown
      :deadline="deadline5"
      :showDays="false"
      :showSeconds="false"
      @timeElapsed="timeElapsedHandler"
    ></flip-countdown>

    <div class="more">
      <a href="https://github.com/philipjkim/vue2-flip-countdown">Click here to view more on vue2-flip-countdown</a>
    </div>
  </div>
</template>

<script>
import FlipCountdown from "vue2-flip-countdown";
import moment from "moment";

const fmt = "YYYY-MM-DD HH:mm:ss";

export default {
  name: "app",
  components: {
    FlipCountdown,
  },
  data() {
    return {
      deadline1ts: moment().valueOf(),
      deadline2: moment()
        .add(30, "s")
        .format(fmt),
      deadline3: moment()
        .add(1000, "d")
        .add(10, "s")
        .format(fmt),
      deadline4: moment()
        .add(2, "h")
        .format(fmt),
      deadline5: moment()
        .add(24, "h")
        .format(fmt),
    };
  },
  computed: {
    deadline1: function () {
      return moment(this.deadline1ts).format(fmt);
    },
  },
  methods: {
    timeElapsedHandler: function () {
      // console.warn('Count Down Elapsed!!!')
    }
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.more {
  margin: 30px 0;
}

button {
  margin: 10px;
}
</style>
