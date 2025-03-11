"use client";
import React, { useState } from "react";
import Image from "next/image";

const UploadForm = () => {
    const [file, setFile] = useState<File | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      alert("Por favor selecciona un archivo");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setUploadedUrl(data.url);
        alert("Archivo subido con éxito");
      } else {
        alert("Error al subir el archivo: " + data.error);
      }
    } catch (error) {
        console.log(error)
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Subir Archivo</button>
      </form>
      {uploadedUrl && (
        <p>
          Archivo subido: <a href={uploadedUrl} target="_blank">{uploadedUrl}</a>
        </p>
      )}
      {uploadedUrl && (
          <Image src={uploadedUrl} width={200} height={200} alt="Archivo subido" />
      )}

    </div>
  );
};

export default UploadForm;
