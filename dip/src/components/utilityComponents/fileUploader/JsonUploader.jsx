import { useRef } from "react"


const JsonUploader = ({returnParsedJson}) => {

    const refInput = useRef()


    const handleUploading = () => {
        refInput.current.click()
    }

    const handleJsonUploaded = (e) => {
        const fileReader = new FileReader()
        fileReader.readAsText(e.target.files[0])
        fileReader.onload = e => returnParsedJson(JSON.parse(e.target.result))
        refInput.current.value = null;
    }

    return (
        <>
            <button onClick={handleUploading}>Import from JSON</button>
            <input onChange={handleJsonUploaded} ref={refInput} type='file' style={{display: 'none'}} />
        </>
    )
}

export default JsonUploader