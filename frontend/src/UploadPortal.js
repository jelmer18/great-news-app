import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload } from "lucide-react";
import { Loader2 } from "lucide-react";

export default function UploadPortal() {
  const [files, setFiles] = useState([]);
  const [agreed, setAgreed] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [artistName, setArtistName] = useState("");
  const [releaseTitle, setReleaseTitle"] = useState("");

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    setFiles(uploadedFiles);
  };

  const handleSubmit = () => {
    if (!agreed || !artistName || !releaseTitle) {
      alert("Vul alle velden in en ga akkoord met de voorwaarden.");
      return;
    }
    setUploading(true);

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    formData.append("artistName", artistName);
    formData.append("releaseTitle", releaseTitle);

    fetch("/api/upload", { method: "POST", body: formData })
      .then(() => {
        alert("Bestanden succesvol geüpload!");
        setFiles([]);
        setAgreed(false);
        setArtistName("");
        setReleaseTitle("");
        setUploading(false);
      })
      .catch(() => {
        alert("Er is iets misgegaan bij het uploaden.");
        setUploading(false);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <Card className="w-full max-w-lg p-6 text-center border shadow-lg bg-white">
        <h2 className="text-xl font-semibold mb-4">Upload je muziek en artwork</h2>
        <input type="file" multiple className="hidden" id="file-upload" onChange={handleFileUpload} />
        <Button onClick={handleSubmit} disabled={files.length === 0 || !agreed || uploading}>
          {uploading ? <Loader2 className="animate-spin mr-2" size={20} /> : "Upload bestanden"}
        </Button>
      </Card>
    </div>
  );
}
