<template>
<div class="container flip-clock">
    <template v-for="data in timeData" v-show="show">
        <span v-bind:key="data.label" class="flip-clock__piece" :id="data.elementId" v-show="data.show">
            <span class="flip-clock__card flip-card" :style="countdownSize ? `font-size:${countdownSize}` : ''">
                <b class="flip-card__top">{{ data.current | twoDigits }}</b>
                <b class="flip-card__bottom" v-bind:data-value="data.current | twoDigits"></b>
                <b class="flip-card__back" v-bind:data-value="data.previous | twoDigits"></b>
                <b class="flip-card__back-bottom" v-bind:data-value="data.previous | twoDigits"></b>
            </span>
            <span class="flip-clock__slot" :style="labelSize ? `font-size:${labelSize}` : ''">{{ data.label }}</span>
        </span>
    </template>
</div>
</template>

<script>
const uuidv4 = require('uuid/v4');

export default {
    name: 'flipCountdown',
    props: {
        deadline: {
            type: String,
        },
        stop: {
            type: Boolean,
        },
        showDays: {
            type: Boolean,
            required: false,
            default: true,
        },
        showHours: {
            type: Boolean,
            required: false,
            default: true,
        },
        showMinutes: {
            type: Boolean,
            required: false,
            default: true,
        },
        showSeconds: {
            type: Boolean,
            required: false,
            default: true,
        },
        labels: {
            type: Object,
            required: false,
            default: function () {
                return {
                    days: 'Days',
                    hours: 'Hours',
                    minutes: 'Minutes',
                    seconds: 'Seconds',
                };
            },
        },
        countdownSize: {
            type: String,
            required: false,
        },
        labelSize: {
            type: String,
            required: false,
        },
    },
    data() {
        const uuid = uuidv4();
        return {
            now: Math.trunc(new Date().getTime() / 1000),
            date: null,
            interval: null,
            diff: 0,
            show: false,
            timeData: [{
                    current: 0,
                    previous: 0,
                    label: this.labels.days,
                    elementId: 'flip-card-days-' + uuid,
                    show: this.showDays,
                },
                {
                    current: 0,
                    previous: 0,
                    label: this.labels.hours,
                    elementId: 'flip-card-hours-' + uuid,
                    show: this.showHours,
                },
                {
                    current: 0,
                    previous: 0,
                    label: this.labels.minutes,
                    elementId: 'flip-card-minutes-' + uuid,
                    show: this.showMinutes,
                },
                {
                    current: 0,
                    previous: 0,
                    label: this.labels.seconds,
                    elementId: 'flip-card-seconds-' + uuid,
                    show: this.showSeconds,
                },
            ],
        };
    },
    created() {
        if (!this.deadline) {
            throw new Error("Missing props 'deadline'");
        }
        const endTime = this.deadline;
        this.date = Math.trunc(Date.parse(endTime.replace(/-/g, '/')) / 1000);
        if (!this.date) {
            throw new Error("Invalid props value, correct the 'deadline'");
        }
        this.interval = setInterval(() => {
            this.now = Math.trunc(new Date().getTime() / 1000);
        }, 1000);
    },
    mounted() {
        if (this.diff !== 0) {
            this.show = true;
        }
    },
    computed: {
        seconds() {
            return Math.trunc(this.diff) % 60;
        },
        minutes() {
            return Math.trunc(this.diff / 60) % 60;
        },
        hours() {
            return Math.trunc(this.diff / 60 / 60) % 24;
        },
        days() {
            return Math.trunc(this.diff / 60 / 60 / 24);
        },
    },
    watch: {
        deadline: function (newVal, oldVal) {
            const endTime = this.deadline;
            this.date = Math.trunc(Date.parse(endTime.replace(/-/g, '/')) / 1000);
            if (!this.date) {
                throw new Error("Invalid props value, correct the 'deadline'");
            }
        },
        now(value) {
            this.diff = this.date - this.now;
            if (this.diff <= 0 || this.stop) {
                this.diff = 0;
                this.updateTime(3, 0);
            } else {
                this.updateAllCards();
            }
        },
        diff(value) {
            if (value === 0) {
                this.$emit('timeElapsed');
                this.updateAllCards();
            }
        },
    },
    filters: {
        twoDigits(value) {
            if (value.toString().length <= 1) {
                return '0' + value.toString();
            }
            return value.toString();
        },
    },
    methods: {
        updateAllCards() {
            this.updateTime(0, this.days);
            this.updateTime(1, this.hours);
            this.updateTime(2, this.minutes);
            this.updateTime(3, this.seconds);
        },
        updateTime(idx, newValue) {
            if (idx >= this.timeData.length || newValue === undefined) {
                return;
            }

            if (window['requestAnimationFrame']) {
                this.frame = requestAnimationFrame(this.updateTime.bind(this));
            }

            const d = this.timeData[idx];
            const val = newValue < 0 ? 0 : newValue;
            const el = document.querySelector(`#${d.elementId}`);

            if (val !== d.current) {
                d.previous = d.current;
                d.current = val;

                if (el) {
                    el.classList.remove('flip');
                    void el.offsetWidth;
                    el.classList.add('flip');
                }

                if (idx === 0) {
                    const els = el.querySelectorAll('span b');
                    if (els) {
                        for (let e of els) {
                            const cls = e.classList[0];
                            if (newValue / 1000 >= 1) {
                                if (!cls.includes('-4digits')) {
                                    const newCls = cls + '-4digits';
                                    e.classList.add(newCls);
                                    e.classList.remove(cls);
                                }
                            } else {
                                if (cls.includes('-4digits')) {
                                    const newCls = cls.replace('-4digits', '');
                                    e.classList.add(newCls);
                                    e.classList.remove(cls);
                                }
                            }
                        }
                    }
                }
            }
        },
    },
    beforeDestroy() {
        if (window['cancelAnimationFrame']) {
            cancelAnimationFrame(this.frame);
        }
    },
    destroyed() {
        clearInterval(this.interval);
    },
};
</script>

<style lang="less" scoped>
.flip-clock {
    text-align: center;
    perspective: 600px;
    margin: 0 auto;

    *,
    *:before,
    *:after {
        box-sizing: border-box;
    }
}

.flip-clock__piece {
    display: inline-block;
    margin: 0 0.2vw;

    @media (min-width: 1000px) {
        margin: 0 5px;
    }
}

.flip-clock__slot {
    font-size: 1rem;
    line-height: 1.5;
    display: block;
}

@halfHeight: 0.72em;
@borderRadius: 0.15em;

.flip-card {
    display: block;
    position: relative;
    padding-bottom: @halfHeight;
    font-size: 2.25rem;
    line-height: 0.95;
}

@media (min-width: 1000px) {
    .flip-clock__slot {
        font-size: 1.2rem;
    }

    .flip-card {
        font-size: 3rem;
    }
}

.flip-card__top,
.flip-card__bottom,
.flip-card__back-bottom,
.flip-card__back::before,
.flip-card__back::after {
    display: block;
    height: @halfHeight;
    color: #cca900;
    background: #222;
    padding: 0.23em 0.15em 0.4em;
    border-radius: @borderRadius @borderRadius 0 0;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    transform-style: preserve-3d;
    width: 2.1em;
    height: @halfHeight;
}

.flip-card__top-4digits,
.flip-card__bottom-4digits,
.flip-card__back-bottom-4digits,
.flip-card__back-4digits::before,
.flip-card__back-4digits::after {
    display: block;
    height: @halfHeight;
    color: #cca900;
    background: #222;
    padding: 0.23em 0.15em 0.4em;
    border-radius: @borderRadius @borderRadius 0 0;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    transform-style: preserve-3d;
    width: 2.65em;
    height: @halfHeight;
}

.flip-card__bottom,
.flip-card__back-bottom,
.flip-card__bottom-4digits,
.flip-card__back-bottom-4digits {
    color: #ffdc00;
    position: absolute;
    top: 50%;
    left: 0;
    border-top: solid 1px #000;
    background: #393939;
    border-radius: 0 0 @borderRadius @borderRadius;
    pointer-events: none;
    overflow: hidden;
    z-index: 2;
}

.flip-card__back-bottom,
.flip-card__back-bottom-4digits {
    z-index: 1;
}

.flip-card__bottom::after,
.flip-card__back-bottom::after,
.flip-card__bottom-4digits::after,
.flip-card__back-bottom-4digits::after {
    display: block;
    margin-top: -@halfHeight;
}

.flip-card__back::before,
.flip-card__bottom::after,
.flip-card__back-bottom::after,
.flip-card__back-4digits::before,
.flip-card__bottom-4digits::after,
.flip-card__back-bottom-4digits::after {
    content: attr(data-value);
}

.flip-card__back,
.flip-card__back-4digits {
    position: absolute;
    top: 0;
    height: 100%;
    left: 0%;
    pointer-events: none;
}

.flip-card__back::before,
.flip-card__back-4digits::before {
    position: relative;
    overflow: hidden;
    z-index: -1;
}

.flip .flip-card__back::before,
.flip .flip-card__back-4digits::before {
    z-index: 1;
    animation: flipTop 0.3s cubic-bezier(0.37, 0.01, 0.94, 0.35);
    animation-fill-mode: both;
    transform-origin: center bottom;
}

.flip .flip-card__bottom,
.flip .flip-card__bottom-4digits {
    transform-origin: center top;
    animation-fill-mode: both;
    animation: flipBottom 0.6s cubic-bezier(0.15, 0.45, 0.28, 1);
}

@keyframes flipTop {
    0% {
        transform: rotateX(0deg);
        z-index: 2;
    }

    0%,
    99% {
        opacity: 1;
    }

    100% {
        transform: rotateX(-90deg);
        opacity: 0;
    }
}

@keyframes flipBottom {

    0%,
    50% {
        z-index: -1;
        transform: rotateX(90deg);
        opacity: 0;
    }

    51% {
        opacity: 1;
    }

    100% {
        opacity: 1;
        transform: rotateX(0deg);
        z-index: 5;
    }
}
</style>
