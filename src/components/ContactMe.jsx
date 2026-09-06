import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import DrawnLines from "./DrawnLines";
import "./ContactMe.css";

gsap.registerPlugin(ScrollTrigger);

const details = [
  { label: "Email", value: "mumbantambo@gmail.com", href: "mailto:mumbantambo@gmail.com" },
  { label: "Phone", value: "+60 17 630 7134", href: "tel:+60176307134" },
  {
    label: "LinkedIn",
    value: "mumba-amos-ntambo",
    href: "https://www.linkedin.com/in/mumba-amos-ntambo-54a665214/",
  },
  { label: "Location", value: "Kuala Lumpur, Malaysia" },
];

const ContactMe = () => {
  const rootRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      gsap.from(".contact__field, .contact__detail", {
        y: 20,
        autoAlpha: 0,
        duration: 0.45,
        ease: "power2.out",
        stagger: 0.06,
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
      });
    },
    { scope: rootRef }
  );

  const change = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const { name, email, phone, message } = form;
    // No backend: this hands the message to the visitor's own mail client
    // with everything already filled in.
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone && `Phone: ${phone}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href =
      `mailto:mumbantambo@gmail.com` +
      `?subject=${encodeURIComponent(`Portfolio enquiry from ${name}`)}` +
      `&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contactSection" ref={rootRef} className="contact">
      <DrawnLines />
      <div className="container">
        <header className="contact__head">
          <span className="contact__kicker">Contact</span>
          <h2 className="contact__title">Get in touch</h2>
        </header>

        <div className="contact__grid">
          <div className="contact__details">
            {details.map(({ label, value, href }) => (
              <div className="contact__detail" key={label}>
                <span className="contact__detail-label">{label}</span>
                {href ? (
                  <a className="contact__detail-value" href={href}>
                    {value}
                  </a>
                ) : (
                  <span className="contact__detail-value">{value}</span>
                )}
              </div>
            ))}
          </div>

          <form className="contact__form" onSubmit={submit}>
            <div className="contact__field">
              <label className="contact__label" htmlFor="contact-name">
                Name
              </label>
              <input
                className="contact__input"
                id="contact-name"
                name="name"
                type="text"
                value={form.name}
                onChange={change}
                required
              />
            </div>

            <div className="contact__field">
              <label className="contact__label" htmlFor="contact-email">
                Email
              </label>
              <input
                className="contact__input"
                id="contact-email"
                name="email"
                type="email"
                value={form.email}
                onChange={change}
                required
              />
            </div>

            <div className="contact__field">
              <label className="contact__label" htmlFor="contact-phone">
                Phone <span className="contact__optional">optional</span>
              </label>
              <input
                className="contact__input"
                id="contact-phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={change}
              />
            </div>

            <div className="contact__field">
              <label className="contact__label" htmlFor="contact-message">
                Message
              </label>
              <textarea
                className="contact__input contact__input--area"
                id="contact-message"
                name="message"
                rows={5}
                value={form.message}
                onChange={change}
                required
              />
            </div>

            <button className="contact__send" type="submit">
              Send message
            </button>
            <p className="contact__hint">Opens in your mail app.</p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactMe;
