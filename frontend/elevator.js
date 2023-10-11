/*!
 * Elevator.js
 *
 * MIT licensed
 * Copyright (C) 2015 Tim Holman, http://tholman.com
 */

/*********************************************
 * Elevator.js
 *********************************************/

const Elevator = function (options) {
  'use strict'

  // Elements
  let body = null

  // Scroll vars
  let animation = null
  let duration = null // ms
  let customDuration = false
  let startTime = null
  let startPosition = null
  let endPosition = 0
  let targetElement = null
  let verticalPadding = null
  let elevating = false

  let startCallback
  let mainAudio
  let endAudio
  let endCallback

  const that = this

  /**
     * Utils
     */

  // Thanks Mr Penner - http://robertpenner.com/easing/
  function easeInOutQuad (t, b, c, d) {
    t /= d / 2
    if (t < 1) return c / 2 * t * t + b
    t--
    return -c / 2 * (t * (t - 2) - 1) + b
  }

  function extendParameters (options, defaults) {
    for (const option in defaults) {
      const t =
                 options[option] === undefined && typeof option !== 'function'
      if (t) {
        options[option] = defaults[option]
      }
    }
    return options
  }

  function getVerticalOffset (element) {
    let verticalOffset = 0
    while (element) {
      verticalOffset += element.offsetTop || 0
      element = element.offsetParent
    }

    if (verticalPadding) {
      verticalOffset = verticalOffset - verticalPadding
    }

    return verticalOffset
  }

  /**
     * Main
     */

  // Time is passed through requestAnimationFrame, what a world!
  function animateLoop (time) {
    if (!startTime) {
      startTime = time
    }

    const timeSoFar = time - startTime
    const easedPosition = easeInOutQuad(
      timeSoFar,
      startPosition,
      endPosition - startPosition,
      duration
    )

    window.scrollTo(0, easedPosition)

    if (timeSoFar < duration) {
      animation = requestAnimationFrame(animateLoop)
    } else {
      animationFinished()
    }
  }

  //            ELEVATE!
  //              /
  //         ____
  //       .'    '=====<0
  //       |======|
  //       |======|
  //       [IIIIII[\--()
  //       |_______|
  //       C O O O D
  //      C O  O  O D
  //     C  O  O  O  D
  //     C__O__O__O__D
  //    [_____________]
  this.elevate = function () {
    if (elevating) {
      return
    }

    elevating = true
    startPosition = document.documentElement.scrollTop || body.scrollTop
    updateEndPosition()

    // No custom duration set, so we travel at pixels per millisecond. (0.75px per ms)
    if (!customDuration) {
      duration = Math.abs(endPosition - startPosition) * 0.75
    }

    requestAnimationFrame(animateLoop)

    // Start music!
    if (mainAudio) {
      mainAudio.volume = 0.1
      mainAudio.play()
    }

    if (startCallback) {
      startCallback()
    }
  }

  function browserMeetsRequirements () {
    return (
      window.requestAnimationFrame &&
            window.Audio &&
            window.addEventListener
    )
  }

  function resetPositions () {
    startTime = null
    startPosition = null
    elevating = false
  }

  function updateEndPosition () {
    if (targetElement) {
      endPosition = getVerticalOffset(targetElement)
    }
  }

  function animationFinished () {
    resetPositions()

    // Stop music!
    if (mainAudio) {
      mainAudio.pause()
      mainAudio.currentTime = 0
    }

    if (endAudio) {
      endAudio.play()
    }

    if (endCallback) {
      endCallback()
    }
  }

  function onWindowBlur () {
    // If animating, go straight to the top. And play no more music.
    if (elevating) {
      cancelAnimationFrame(animation)
      resetPositions()

      if (mainAudio) {
        mainAudio.pause()
        mainAudio.currentTime = 0
      }

      updateEndPosition()
      window.scrollTo(0, endPosition)
    }
  }

  function bindElevateToElement (element) {
    if (element.addEventListener) {
      element.addEventListener('click', that.elevate, false)
    } else {
      // Older browsers
      element.attachEvent('onclick', function () {
        updateEndPosition()
        document.documentElement.scrollTop = endPosition
        document.body.scrollTop = endPosition
        window.scroll(0, endPosition)
      })
    }
  }

  function init (_options) {
    // Bind to element click event, if need be.
    body = document.body

    const defaults = {
      duration: undefined,
      mainAudio: false,
      endAudio: false,
      preloadAudio: true,
      loopAudio: true,
      startCallback: null,
      endCallback: null

    }

    _options = extendParameters(_options, defaults)

    if (_options.element) {
      bindElevateToElement(_options.element)
    }

    // Take the stairs instead
    if (!browserMeetsRequirements()) {
      return
    }

    if (_options.duration) {
      customDuration = true
      duration = _options.duration
    }

    if (_options.targetElement) {
      targetElement = _options.targetElement
    }

    if (_options.verticalPadding) {
      verticalPadding = _options.verticalPadding
    }

    window.addEventListener('blur', onWindowBlur, false)

    if (_options.mainAudio) {
      mainAudio = new Audio(_options.mainAudio)
      mainAudio.setAttribute('preload', _options.preloadAudio)
      mainAudio.setAttribute('loop', _options.loopAudio)
    }

    if (_options.endAudio) {
      endAudio = new Audio(_options.endAudio)
      endAudio.setAttribute('preload', 'true')
    }

    if (_options.endCallback) {
      endCallback = _options.endCallback
    }

    if (_options.startCallback) {
      startCallback = _options.startCallback
    }
  }

  init(options)
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Elevator
}
