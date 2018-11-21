<template>
  <div id="app">
    <p>Deadline1: {{ deadline1 }}</p>
    <flip-countdown :deadline="deadline1"></flip-countdown>
    <p>Deadline2: {{ deadline2 }}</p>
    <flip-countdown :deadline="deadline2"></flip-countdown>
    <p>Deadline3: {{ deadline3 }}</p>
    <flip-countdown :deadline="deadline3"></flip-countdown>
    <div class="more">
      <a href="https://github.com/philipjkim/vue2-flip-countdown">Click here to view more on vue2-flip-countdown</a>
    </div>
  </div>
</template>

<script>
import FlipCountdown from 'vue2-flip-countdown'
import moment from 'moment'

export default {
  name: 'app',
  components: {
    FlipCountdown
  },
  data () {
    const now = moment()
    const fmt = 'YYYY-MM-DD HH:mm:ss'
    return {
      deadline1: now.add(10, 's').format(fmt),
      deadline2: now.add(10, 's').format(fmt),
      deadline3: now.add(10, 's').format(fmt)
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
