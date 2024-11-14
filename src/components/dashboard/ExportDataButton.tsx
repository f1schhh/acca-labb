"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";

const ExportDataButton = ({ email }: { email: string }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const linkRef = useRef<HTMLAnchorElement | null>(null);

  const downloadCSV = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/exportdata", {
        method: "GET",
        headers: {
          "Content-Type": "text/csv",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch the CSV file");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (error) {
      alert("Download failed. Please try again." + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (downloadUrl && linkRef.current) {
      linkRef.current.click();

      setDownloadUrl(null);
    }
  }, [downloadUrl]);

  useEffect(() => {
    return () => {
      if (downloadUrl) window.URL.revokeObjectURL(downloadUrl);
    };
  }, [downloadUrl]);

  return (
    <>
      <Button
        onClick={downloadCSV}
        variant="contained"
        disabled={loading}
      >
        {loading ? "Loading..." : "Export data"}
      </Button>
      {downloadUrl && (
        <a
          ref={linkRef}
          href={downloadUrl}
          download={`${email}.csv`}
          style={{ display: "none" }}
        >
          Download
        </a>
      )}
    </>
  );
};

export default ExportDataButton;
