TrestleActiveStorage = {}

TrestleActiveStorage.functions = {}

TrestleActiveStorage.data = {
    initalized:            false,
    currentFileInputField: null,
    currentFileName:       null,
    currentWrapperDiv:     null,
    existingPreview:       null,
}

TrestleActiveStorage.functions.clearExistingPreview = () => {
    let ep = TrestleActiveStorage.data.existingPreview

    if (!ep)                 { return }
    if (!ep.children.length) { return }

    while (ep.firstChild) {
        ep.removeChild(ep.firstChild)
    }
}

TrestleActiveStorage.functions.updateExistingPreview = (src, fileName) => {
    let target = TrestleActiveStorage.data.existingPreview

    if (!target.classList.length) { debugger }

    TrestleActiveStorage.functions.clearExistingPreview()

    let imgElement = document.createElement("img")
    imgElement.src = src

    let nameElement = document.createElement("small")
    nameElement.innerText = fileName

    target.classList.add("active-storage__upload-preview")
    target.appendChild(imgElement) 
    target.appendChild(nameElement) 
}

TrestleActiveStorage.functions.createNewPreview = (src, fileName) => {
    let target = TrestleActiveStorage.data.currentWrapperDiv
    
    if (!target.classList.length) { debugger }

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
    if (event1?.target?.files?.length != 1) { return }
    
    let file = event1.target.files[0]
    TrestleActiveStorage.data.currentFileName       = file.name
    TrestleActiveStorage.data.currentFileInputField = event1.target
    TrestleActiveStorage.data.currentWrapperDiv     = event1.target.parentElement
    TrestleActiveStorage.data.existingPreview       = event1.target.parentElement.querySelector(".active-storage__preview")

    let reader = new FileReader()

    reader.onload = (event2) => {
        let fileSrc  = event2.target.result
        let fileName = TrestleActiveStorage.data.currentFileName

        if (TrestleActiveStorage.data.existingPreview) {
            TrestleActiveStorage.functions.updateExistingPreview(fileSrc, fileName)
        } else {
            TrestleActiveStorage.functions.createNewPreview(fileSrc, fileName)
        }

        TrestleActiveStorage.data.existingPreview       = null
        TrestleActiveStorage.data.currentFileName       = null
        TrestleActiveStorage.data.currentFileInputField = null
        TrestleActiveStorage.data.currentWrapperDiv     = null
    }

    reader.onerror = (error) => { 
        console.error(error) 
    }

    reader.readAsDataURL(file)
}

// TrestleActiveStorage.functions.attachEventHandlers = () => {
//     let fields = document.querySelectorAll(".active-storage__field")

//     if (!fields.length) { return }

//     fields.forEach((field) => {
//         field.addEventListener("change", TrestleActiveStorage.onFileInputChangeHandler)
//     })
// }

// TrestleActiveStorage.attachEvents = (field) => {
//     let progressEl    = field.parentNode.querySelectorAll(".progress")[0]
//     let progressBarEl = field.parentNode.querySelectorAll(".progress-bar")[0]
// 
//     // Reveal the progress bar
//     field.addEventListener("direct-upload:start", (event) => {
//         console.log("direct-upload:start")
//         progressEl.style = "display: block"
//     })
// 
//     // Increment the progress bar
//     field.addEventListener("direct-upload:progress", (event) => {
//         console.log("direct-upload:progress")
//         let detail = event.detail
//         progressBarEl.style = "width: " + detail.progress + "%"
//     })
// }


// Trestle.init(() => {
//     TrestleActiveStorage.functions.attachEventHandlers()
// })
