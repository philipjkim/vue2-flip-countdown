<template>
  <div id="app">
    <p>Deadline: {{ deadline }}</p>
    <flip-countdown :deadline="deadline"></flip-countdown>
    <p>Another deadline: {{ deadline2 }}</p>
    <flip-countdown :deadline="deadline2"></flip-countdown>
    <div class="more">
      <a href="https://github.com/philipjkim/vue2-flip-countdown">Click here to view more on vue2-flip-countdown</a>
    </div>
  </div>
</template>

<script>
import FlipCountdown from 'vue2-flip-countdown'

export default {
  name: 'app',
  components: {
    FlipCountdown
  },
  data () {
    return {
      deadline: '2019-12-25 00:00:00',
      deadline2: '2019-12-31 11:11:11',
    }
  }
}
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
</style>
