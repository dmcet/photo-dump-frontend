import {type ChangeEvent, useEffect, useState} from "react";

export default function UploadImagePage() {
    const [files, setFiles] = useState<FileList | null>(null);
    // Add this state for storing preview URLs
    const [previews, setPreviews] = useState<string[]>([]);

// Add this useEffect to generate previews when files change
    useEffect(() => {
        if (!files) return;

        // Create array of preview URLs
        const previewUrls = Array.from(files).map(file => URL.createObjectURL(file));
        setPreviews(previewUrls);

        // Cleanup function to revoke URLs when component unmounts or files change
        return () => {
            previewUrls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [files]);


    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFiles(event.target.files);
        }
    }

    const isButtonDisabled = !files?.length;

    const handleSubmitClick = () => {
        Array.from(files as FileList).map(file => {
                const formData = new FormData();
                formData.append('file', file);

                fetch('http://localhost:8080/api/v1/images/upload', {
                    method: 'POST',
                    body: formData
                })
                    .then(data => {
                        console.log(data)
                    })
                    .catch(error => {
                            console.error('Error:', error);
                        }
                    )
            }
        )
    }

    return (
        <div className="m-3">
            <label htmlFor="uploadForm" className="form-label">Select the images you want to upload</label>
            <input type="file" onChange={handleFileChange} accept={"image/*"} className="form-control" id="uploadForm"
                   multiple/>
            {files && (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                    gap: '10px',
                    margin: '10px 0 10px'
                }}>
                    {previews.map((preview, index) => (
                        <div key={index} style={{
                            width: '100px',
                            height: '100px',
                            position: 'relative'
                        }}>
                            <img
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '4px'
                                }}
                            />
                        </div>
                    ))}
                </div>

            )}
            <button className="btn-success" onClick={handleSubmitClick} disabled={isButtonDisabled}>Submit</button>
        </div>
    )
}