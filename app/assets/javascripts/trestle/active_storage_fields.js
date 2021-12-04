// Make a namespace
TrestleActiveStorage = {}

TrestleActiveStorage.data = {
    initalized:            false,
    currentFileInputField: null,
    currentFileName:       null,
    currentWrapperDiv:     null,
    existingPreview:       null,
}

TrestleActiveStorage.insertAfter = (existingElement, newElement) => {
    existingElement.parentNode.insertBefore(newElement, existingElement.nextSibling)
}

TrestleActiveStorage.attachEvents = (field) => {
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
}

TrestleActiveStorage.clearExistingPreview = () => {
    let ep = TrestleActiveStorage.existingPreview

    if (!ep)                 { return }
    if (!ep.children.length) { return }

    while (ep.firstChild) {
        ep.removeChild(ep.firstChild)
    }
}

TrestleActiveStorage.updateExistingPreview = (src, fileName) => {
    let target = TrestleActiveStorage.existingPreview

    if (!target.classList.length) {
        debugger
    }

    TrestleActiveStorage.clearExistingPreview()

    let imgElement = document.createElement("img")
    imgElement.src = src

    let nameElement = document.createElement("small")
    nameElement.innerText = fileName

    // let previewContainer = document.createElement("div")
    // previewContainer.classList.add("active-storage__upload-preview")
    target.classList.add("active-storage__upload-preview")
    target.appendChild(imgElement) 
    target.appendChild(nameElement) 
}

TrestleActiveStorage.createNewPreview = (src, fileName) => {
    let target = TrestleActiveStorage.currentWrapperDiv
    
    if (!target.classList.length) {
        debugger
    }

    let imgElement = document.createElement("img")
    imgElement.src = src

    let nameElement = document.createElement("small")
    nameElement.innerText = fileName

    let previewContainer = document.createElement("div")
    previewContainer.classList.add("active-storage__preview")
    previewContainer.classList.add("active-storage__upload-preview")
    previewContainer.appendChild(imgElement)
    previewContainer.appendChild(nameElement) 
    target.prepend(previewContainer)
}

TrestleActiveStorage.onFileInputChangeHandler = (event1) => {
    // debugger
    
    if (event1?.target?.files?.length != 1) {
        return
    }
    
    let file = event1.target.files[0]
    TrestleActiveStorage.currentFileName       = file.name
    TrestleActiveStorage.currentFileInputField = event1.target
    TrestleActiveStorage.currentWrapperDiv     = event1.target.parentElement
    TrestleActiveStorage.existingPreview       = event1.target.parentElement.querySelector(".active-storage__preview")

    let reader = new FileReader()

    reader.onload = (event2) => {
        let fileSrc = event2.target.result
        if (TrestleActiveStorage.existingPreview) {
            TrestleActiveStorage.updateExistingPreview(fileSrc, TrestleActiveStorage.currentFileName)
        } else {
            TrestleActiveStorage.createNewPreview(fileSrc, TrestleActiveStorage.currentFileName)
        }
        TrestleActiveStorage.existingPreview       = null
        TrestleActiveStorage.currentFileName       = null
        TrestleActiveStorage.currentFileInputField = null
        TrestleActiveStorage.currentWrapperDiv     = null
    }
    reader.onerror = (error) => { console.error(error) }
    reader.readAsDataURL(file)
}

// Kick things off
TrestleActiveStorage.attachEventHandlers = () => {
    let fields = document.querySelectorAll(".active-storage__field")
    if (fields.length) {
        fields.forEach((field) => {
            // if (existingPreview) {
            //     // field.parentElement.querySelector(".active-storage__preview").removeChild(field.parentElement.querySelector(".active-storage__preview").children[0])
            //     while (existingPreview.firstChild) {
            //         existingPreview.removeChild(existingPreview.firstChild)
            //     }
            // }
            field.addEventListener("change", TrestleActiveStorage.onFileInputChangeHandler)
            // field.addEventListener("change", (event1) => {
            //     TrestleActiveStorage.existingPreview = field.parentElement.querySelector(".active-storage__preview")
            //     if (event1?.target?.files?.length == 1) {
            //         let reader = new FileReader()
            //         let file   = event1.target.files[0]
            //         TrestleActiveStorage.currentFileName = file.name
            //         reader.onload = (event2) => {
            //             let fileSrc = event2.target.result
            //             if (TrestleActiveStorage.existingPreview) {
            //                 let ep = TrestleActiveStorage.existingPreview
            //                 while (ep.firstChild) {
            //                     ep.removeChild(ep.firstChild)
            //                 }
            //                 TrestleActiveStorage.addUploadPreview(ep, fileSrc, TrestleActiveStorage.currentFileName)
            //             } else {
            //                 TrestleActiveStorage.insertAfter(field, fileSrc, TrestleActiveStorage.currentFileName)
            //             }
            //             // debugger
            //             // let nextSibling = field.nextElementSibling
            //             // if (nextSibling && nextSibling.classList.contains("active-storage__upload-preview")) {
            //                 // nextSibling.remove()
            //             // }
            //             // TrestleActiveStorage.existingPreview = null
            //             TrestleActiveStorage.currentFileName = null
            //         }
            //         reader.onerror = (error) => { console.error(error) }
            //         reader.readAsDataURL(file)
            //     }
            // })
            
        })
    }

    // for (var i = 0; i < fields.length; i++) {
    //     TrestleActiveStorage.attachEvents(fields[i])
    // }
}

TrestleActiveStorage.init = () => {
    TrestleActiveStorage.initalized = true
}

// Load the code
Trestle.ready(() => {
    console.log("Trestle.ready()")
    console.log("Custom 'trestle-active_storage' loaded")
    // window.TrestleActiveStorage = TrestleActiveStorage
    // window.TrestleActiveStorage.init()
    // TrestleActiveStorage.attachEventHandlers()
})

Trestle.init(() => {
    console.log("Trestle.init()")

})

// When the page first loads or is manually refreshed.
$(function() {
    console.log("$(function() {})")
    // Collapse sidebar sections whenever the page reloads.
    // collapseAppNav()
})

// On navigation or any page refresh.
document.addEventListener("turbolinks:load", () => {
    console.log("turbolinks:load")
    // window.TrestleActiveStorage = TrestleActiveStorage
    // TrestleActiveStorage.attachEventHandlers()
})