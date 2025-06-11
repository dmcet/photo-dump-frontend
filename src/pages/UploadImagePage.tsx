import {type ChangeEvent, useEffect, useState} from "react";


const UploadResult = {
    Success: 'Success',
    Error: 'Error'
} as const;

type UploadResult = typeof UploadResult[keyof typeof UploadResult];

export default function UploadImagePage() {
    const [files, setFiles] = useState<FileList | null>(null);
    // Add this state for storing preview URLs
    const [previews, setPreviews] = useState<string[]>([]);

    const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);

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



    const handleSubmitClick = async () => {
        if (!files) return;

        try {
            const results = await Promise.all(
                Array.from(files).map(file => {
                        const formData = new FormData();
                        formData.append('file', file);

                        return fetch('http://localhost:8080/api/v1/images/upload', {
                            method: 'POST',
                            body: formData
                        })
                    }
                )
            );


            if (results.find(result => !result.ok)) {
                setUploadResult(UploadResult.Error);
            } else {
                setUploadResult(UploadResult.Success);
            }

        } catch (error) {
            console.error("Error processing files", error);
        }
    }

    const determineButtonClass: () => string = () => {
        if (!uploadResult) return "btn btn-primary";

        return "btn " + (uploadResult === UploadResult.Success ? "btn-success" : "btn-danger");
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
            <button
                type="submit"
                className={determineButtonClass()}
                onClick={handleSubmitClick} disabled={isButtonDisabled}>Submit
            </button>
        </div>
    )
}