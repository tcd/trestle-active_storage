// Make a namespace
TRESTLE_ACTIVE_STORAGE = {}

// Kick things off
TRESTLE_ACTIVE_STORAGE.init = () => {
    let fields = document.querySelectorAll(".active-storage__field")

    for (var i = 0; i < fields.length; i++) {
        TRESTLE_ACTIVE_STORAGE.attachEvents(fields[i])
    }
}

// For each `.active-storage__field`
TRESTLE_ACTIVE_STORAGE.attachEvents = (field) => {
    let progressEl    = field.parentNode.querySelectorAll(".progress")[0]
    let progressBarEl = field.parentNode.querySelectorAll(".progress-bar")[0]

    // Reveal the progress bar
    field.addEventListener("direct-upload:start", (event) => {
        progressEl.style = "display: block"
    })
    
    // Increment the progress bar
    field.addEventListener("direct-upload:progress", (event) => {
        let detail = event.detail
        progressBarEl.style = "width: " + detail.progress + "%"
    })
    
    field.addEventListener("direct-upload:end", (event) => {
        debugger
    })
}

// Load the code
Trestle.ready(() => {
    console.log("Custom 'trestle-active_storage' loaded")
    window.TRESTLE_ACTIVE_STORAGE = TRESTLE_ACTIVE_STORAGE
    window.TRESTLE_ACTIVE_STORAGE.init()
})
