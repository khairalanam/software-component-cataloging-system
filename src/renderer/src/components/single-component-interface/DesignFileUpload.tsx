import { useState } from 'react'

const DesignFileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileChange = (event): void => {
    const file = event.target.files[0]
    setSelectedFile(file)
  }

  const handleUpload = (): void => {
    if (selectedFile) console.log('Selected file:', selectedFile)
    else console.log('No file selected')
  }

  return (
    <div>
      <input
        type="file"
        accept=".png, .jpg, .jpeg"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        ref={(fileInput) => fileInput && (fileInput.value = '')}
      />
      <button onClick={() => document.querySelector('input[type=file]')!.click()}>
        Choose File
      </button>
      {selectedFile && <p>Selected File: {selectedFile.name}</p>}
      <button onClick={handleUpload}>Upload</button>
    </div>
  )
}

export default DesignFileUpload
