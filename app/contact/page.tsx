import Image from "next/image";
import ContactForm from "./ContactForm";
import ContactIcon from "./ContactIcon";
import "./contact.css";

const methods = [
  { icon: "mail", title: "Email", description: "Hubungi kami melalui email", label: "hello@pethaven.com", href: "mailto:hello@pethaven.com" },
  { icon: "whatsapp", title: "WhatsApp", description: "Diskusikan kebutuhan hewan kesayanganmu.", label: "Chat via WhatsApp", href: "https://wa.me/6281234567890" },
  { icon: "pin", title: "Alamat", description: "Kunjungi toko kami secara langsung", label: "Jl. PetHaven No. 123, Jakarta" },
] as const;

export default function ContactPage() {
  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-photo">
          <Image src="/images/pethaven-contact-hero.webp" alt="" fill sizes="(max-width: 700px) 100vw, 55vw" preload />
        </div>
        <div className="contact-wrap contact-hero-content">
          <span className="contact-tag"><ContactIcon name="paw" /> GET IN TOUCH</span>
          <h1>Contact <em>PetHaven</em> <span aria-hidden="true">♡</span></h1>
          <p>Kami siap membantu menjawab pertanyaan<br className="contact-break" /> seputar kebutuhan hewanmu.</p>
        </div>
        <i className="contact-paw contact-paw-hero" aria-hidden="true"><ContactIcon name="paw" /></i>
      </section>

      <div className="contact-wrap contact-body">
        <section className="contact-methods" aria-label="Informasi kontak">
          {methods.map((method) => {
            const label = <><ContactIcon name={method.icon} /> {method.label}</>;
            return (
              <article className="contact-method" key={method.title}>
                <span className="contact-medallion"><ContactIcon name={method.icon} /></span>
                <div>
                  <h2>{method.title}</h2>
                  <p>{method.description}</p>
                  {"href" in method ? (
                    <a className="contact-pill" href={method.href} target={method.icon === "whatsapp" ? "_blank" : undefined} rel={method.icon === "whatsapp" ? "noreferrer" : undefined}>{label}</a>
                  ) : (
                    <span className="contact-pill">{label}</span>
                  )}
                </div>
              </article>
            );
          })}
        </section>

        <section className="contact-message" aria-labelledby="contact-message-title">
          <div className="contact-intro">
            <div className="contact-cat">
              <Image src="/images/pethaven-contact-kitten.webp" alt="" fill sizes="(max-width: 700px) 35vw, 24vw" />
            </div>
            <div className="contact-intro-copy">
              <span className="contact-tag"><ContactIcon name="paw" /> Kirim Pesan untuk Kami</span>
              <h2 id="contact-message-title">Ada Pertanyaan?<br /><em>Kami Siap Membantu!</em></h2>
              <p>Isi form di samping ini, dan tim kami akan segera menghubungi Anda.</p>
              <p className="contact-motto">Happy Pets,<br /> Happy You!</p>
            </div>
          </div>
          <ContactForm />
        </section>
        <i className="contact-paw contact-paw-side" aria-hidden="true"><ContactIcon name="paw" /></i>
      </div>
    </main>
  );
}
