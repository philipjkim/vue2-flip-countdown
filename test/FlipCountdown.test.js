import { mount } from '@vue/test-utils'
import FlipCountdown from '@/FlipCountdown'
import dateFormat from 'dateformat'

const defaultLabels = {
  days: 'Days',
  hours: 'Hours',
  minutes: 'Minutes',
  seconds: 'Seconds'
}

const customLabels = {
  days: 'Dagen',
  hours: 'Uren',
  minutes: 'Minuten',
  seconds: 'Seconden'
}

function getDeadline () {
  const days = 5
  let result = new Date()
  result.setDate(result.getDate() + days)
  return dateFormat(result, 'yyyy-mm-dd 00:00:00')
}

describe('FlipCountdown', () => {
  let cmp

  describe('Use default labels', () => {
    beforeAll(() => {
      cmp = mount(FlipCountdown, {
        // Be aware that props is overridden using `propsData`
        propsData: {
          deadline: getDeadline()
        }
      })
    })

    it('Default labels are used', () => {
      expect(cmp.vm.labels).toEqual(defaultLabels)
    })

    it('Renders the correct markup', () => {
      Object.keys(defaultLabels).forEach(function (key) {
        const contains = '<span class="flip-clock__slot">' + defaultLabels[key] + '</span>'
        expect(cmp.html()).toEqual(
          expect.stringContaining(contains)
        )
      })
    })
  })

  describe('Use custom labels', () => {
    beforeAll(() => {
      cmp = mount(FlipCountdown, {
        // Be aware that props is overridden using `propsData`
        propsData: {
          deadline: getDeadline(),
          labels: customLabels
        }
      })
    })

    it('Has received the custom labels', () => {
      expect(cmp.vm.labels).toEqual(customLabels)
    })

    it('Renders the correct markup', () => {
      Object.keys(customLabels).forEach(function (key) {
        const contains = '<span class="flip-clock__slot">' + customLabels[key] + '</span>'
        expect(cmp.html()).toEqual(
          expect.stringContaining(contains)
        )
      })
    })
  })
})
