export default function UploadImagePage() {
    return (
        <div className="m-3">
            <label htmlFor="uploadForm" className="form-label">Select the images you want to upload</label>
            <input type="file" className="form-control" id="uploadForm" multiple/>
        </div>
    )
}