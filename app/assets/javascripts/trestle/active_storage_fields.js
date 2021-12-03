TRESTLE_ACTIVE_STORAGE = {}

TRESTLE_ACTIVE_STORAGE.init = () => {
    let fields = document.querySelectorAll(".active-storage__field")

    for (var i = 0; i < fields.length; i++) {
        attachEvents(fields[i])
    }
}

TRESTLE_ACTIVE_STORAGE.attachEvents = (field) => {
  let progressEl    = field.parentNode.querySelectorAll(".progress")[0]
  let progressBarEl = field.parentNode.querySelectorAll(".progress-bar")[0]

  field.addEventListener("direct-upload:start", (event) => {
    progressEl.style = "display: block"
  })

  field.addEventListener("direct-upload:progress", (event) => {
    let detail = event.detail
    progressBarEl.style = "width: " + detail.progress + "%"
  })
}

Trestle.ready(() => {
    console.log("Custom 'trestle-active_storage' loaded")
    window.TRESTLE_ACTIVE_STORAGE = TRESTLE_ACTIVE_STORAGE
    TRESTLE_ACTIVE_STORAGE.init()
})
