// Make a namespace
TRESTLE_ACTIVE_STORAGE = {}

TRESTLE_ACTIVE_STORAGE.insertAfter = (existingElement, newElement) => {
    existingElement.parentNode.insertBefore(newElement, existingElement.nextSibling)
}

TRESTLE_ACTIVE_STORAGE.buildUploadPreview = (src) => {
    let preview = document.createElement("img")
    preview.src = src
    let previewContainer = document.createElement("div")
    previewContainer.classList.add("active-storage__preview")
    previewContainer.classList.add("active-storage__upload-preview")
    previewContainer.appendChild(preview) 
    return previewContainer
}

// For each `.active-storage__field`
TRESTLE_ACTIVE_STORAGE.attachEvents = (field) => {
    let progressEl    = field.parentNode.querySelectorAll(".progress")[0]
    let progressBarEl = field.parentNode.querySelectorAll(".progress-bar")[0]

    // Reveal the progress bar
    field.addEventListener("direct-upload:start", (event) => {
        console.log("direct-upload:start")
        progressEl.style = "display: block"
    })
    
    // Increment the progress bar
    field.addEventListener("direct-upload:progress", (event) => {
        console.log("direct-upload:progress")
        let detail = event.detail
        progressBarEl.style = "width: " + detail.progress + "%"
    })
    
    
    field.addEventListener("direct-upload:before-blob-request", (event) => {
        console.log("direct-upload:before-blob-request")
        console.log(event)
    })
    
    field.addEventListener("direct-upload:before-storage-request", (event) => {
        console.log("direct-upload:before-storage-request")
        console.log(event)
    })

    field.addEventListener("direct-upload:end", (event) => {
        console.log("direct-upload:end")
        console.log(event)
    })
}

// Kick things off
TRESTLE_ACTIVE_STORAGE.init = () => {
    let fields = document.querySelectorAll(".active-storage__field")
    // console.log(`fields.length:`, fields.length)
    if (fields.length) {
        fields.forEach((field, i) => {
            // let newClassName = `active-storage__field__${i}`
            // field.classList.add(newClassName)
            field.addEventListener("change", (event) => {
                if (event?.target?.files?.length == 1) {
                    let reader = new FileReader()
                    let file = event.target.files[0]
                    let fileName = file.name
                    reader.onload = (event, fileName) => {
                        debugger
                        let nextSibling = field.nextElementSibling
                        if (nextSibling && nextSibling.classList.contains("active-storage__upload-preview")) {
                            nextSibling.remove()
                        }
                        let fileContent = event.target.result
                        let preview = TRESTLE_ACTIVE_STORAGE.buildUploadPreview(fileContent)
                        TRESTLE_ACTIVE_STORAGE.insertAfter(field, preview)
                        // debugger
                    }
                    reader.onerror = (error) => { console.error(error) }
                    reader.readAsDataURL(file)
                }
            })
        })
    }

    for (var i = 0; i < fields.length; i++) {
        TRESTLE_ACTIVE_STORAGE.attachEvents(fields[i])
    }
}

// Load the code
Trestle.ready(() => {
    console.log("Custom 'trestle-active_storage' loaded")
    window.TRESTLE_ACTIVE_STORAGE = TRESTLE_ACTIVE_STORAGE
    window.TRESTLE_ACTIVE_STORAGE.init()
})
