"use client";

import { useState } from "react";

export default function PetShareButton() {
  const [status, setStatus] = useState("");

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setStatus("Tautan disalin");
    } catch {
      setStatus("Salin alamat dari bilah browser.");
    }
  }

  return (
    <>
      <button className="pet-detail-share" type="button" onClick={copyLink}>Salin tautan</button>
      <span className="pet-detail-share-status" role="status">{status}</span>
    </>
  );
}
