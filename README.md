# vue2-flip-countdown

[![npm version](https://badge.fury.io/js/vue2-flip-countdown.svg)](https://badge.fury.io/js/vue2-flip-countdown) [![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

A simple flip countdown timer component for Vue 2.x

![screenshot](https://github.com/philipjkim/vue2-flip-countdown/blob/master/screenshot.png?raw=true)

[Demo](https://philipjkim.github.io/vue2-flip-countdown/index.html)

## Installation

```
npm i vue2-flip-countdown --save
```

### Running Demo on Local Machine

```
cd demo
npm i
npm run serve
```

Then open <http://localhost:8080> on a browser.

## Usage

```vue
<template>
  <div>
    <flip-countdown deadline="2018-12-25 00:00:00"></flip-countdown>
  </div>
</template>

<script>
  import FlipCountdown from 'vue2-flip-countdown'

  export default {
    components: { FlipCountdown }
  }
</script>
```

- If you want to remove days section, set `showDays` prop to `false` (available since v0.10.0)
- If you want to remove hours/minutes/seconds section, set `showHours`/`showMinutes`/`showSeconds` prop to `false` (available since v0.11.0)

    ```vue
    <flip-countdown deadline="2018-12-25 00:00:00" :showDays="false"></flip-countdown>
    ```

- To notify if timer has elapsed, bind a handler to `timeElapsed` event emitted by component

    ```vue
    <flip-countdown deadline="2018-12-25 00:00:00" @timeElapsed="timeElapsedHandler"></flip-countdown>
    ```

Please refer to `/demo` directory for examples.

If you're using [Nuxt.js](https://nuxtjs.org/), use [`<no-ssr>`](https://nuxtjs.org/api/components-no-ssr#the-lt-no-ssr-gt-component) to avoid server-side rendering. (You will get error if you don't use `<no-ssr>`)

```vue
<template>
  <div>
    <no-ssr>
      <flip-countdown deadline="2018-12-25 00:00:00"></flip-countdown>
    </no-ssr>
  </div>
</template>
```

# References

- [vuejs-countdown](https://github.com/getanwar/vuejs-countdown)
- [Demo for 'Flip clock & countdown, Vue'](https://codepen.io/shshaw/pen/BzObXp)
