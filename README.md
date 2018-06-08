# vue2-flip-countdown

A simple flip countdown timer component for Vue 2.x

![screenshot](https://github.com/philipjkim/vue2-flip-countdown/blob/master/screenshot.png?raw=true)

[Demo](https://philipjkim.github.io/vue2-flip-countdown/index.html)

## Installation

```
npm i vue2-flip-countdown --save
```

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
