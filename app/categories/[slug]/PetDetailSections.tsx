"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { petCategories } from "../../pet-categories";
import { petContactUrl } from "../pet-links";

const sections = ["Deskripsi", "Perawatan", "Galeri"] as const;
const careTopics = [
  { key: "food", label: "Pakan dan Minum" },
  { key: "habitat", label: "Tempat Tinggal" },
  { key: "routine", label: "Perawatan Rutin" },
] as const;

export default function PetDetailSections({ pet }: { pet: (typeof petCategories)[number] }) {
  const [activeSection, setActiveSection] = useState<(typeof sections)[number]>("Deskripsi");
  const photoPreview = useRef<HTMLDialogElement>(null);

  return (
    <section className="pet-detail-sections" aria-label={`Informasi ${pet.name}`}>
      <div className="pet-detail-section-buttons" role="group" aria-label="Bagian informasi">
        {sections.map((section) => (
          <button key={section} type="button" aria-pressed={activeSection === section} aria-controls="pet-detail-section-content" onClick={() => setActiveSection(section)}>
            {section}
          </button>
        ))}
      </div>
      <div className="pet-detail-section-content" id="pet-detail-section-content" role="region" aria-label={activeSection} aria-live="polite">
        {activeSection === "Deskripsi" && (
          <p>{pet.description}</p>
        )}
        {activeSection === "Perawatan" && (
          <>
            <dl className="pet-detail-care">
              {careTopics.map(({ key, label }) => (
                <div key={key}>
                  <dt>{label}</dt>
                  <dd>{pet.care[key]}</dd>
                </div>
              ))}
            </dl>
            <p><a href={petContactUrl(pet.name)} target="_blank" rel="noreferrer">Tanya PetHaven melalui WhatsApp</a></p>
          </>
        )}
        {activeSection === "Galeri" && (
          <>
            <button className="pet-detail-gallery-card" type="button" aria-haspopup="dialog" onClick={() => photoPreview.current?.showModal()}>
              <span className="pet-detail-gallery-image">
                <Image src={pet.image} alt="" fill sizes="(max-width: 400px) 92vw, 360px" />
              </span>
              <span className="pet-detail-gallery-caption">
                <strong>{pet.name}</strong>
                <span>Perbesar foto</span>
              </span>
            </button>
            <dialog className="pet-detail-gallery-dialog" ref={photoPreview} aria-labelledby="pet-detail-gallery-title">
              <div className="pet-detail-gallery-header">
                <h2 id="pet-detail-gallery-title">{pet.name}</h2>
                <form method="dialog">
                  <button type="submit" aria-label="Tutup pratinjau">×</button>
                </form>
              </div>
              <div className="pet-detail-gallery-preview">
                <Image src={pet.image} alt={pet.name} fill sizes="(max-width: 955px) 92vw, 880px" />
              </div>
              <a className="pet-detail-gallery-original" href={pet.image} target="_blank" rel="noreferrer">Buka foto asli <span aria-hidden="true">↗</span></a>
            </dialog>
          </>
        )}
      </div>
    </section>
  );
}
