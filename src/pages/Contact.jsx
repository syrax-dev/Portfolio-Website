import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle, ArrowUpRight } from "lucide-react";
import Reveal from "../components/Reveal";
import { InlineLink } from "../components/Cta";
import { profile } from "../data/profile";

const EMAIL_LOCAL_RE = /^[A-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Z0-9!#$%&'*+/=?^_`{|}~-]+)*$/i;
const EMAIL_DOMAIN_LABEL_RE = /^[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?$/i;
const NAME_RE = /^[\p{L}\p{M}][\p{L}\p{M}\s'’-]*$/u;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MIN_MESSAGE_LENGTH = 10;
const MAX_MESSAGE_LENGTH = 5000;

function isValidEmail(email) {
  if (email.length > MAX_EMAIL_LENGTH) return false;

  const at = email.lastIndexOf("@");
  if (at <= 0 || at !== email.indexOf("@")) return false;

  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  if (local.length > 64 || !EMAIL_LOCAL_RE.test(local)) return false;

  const labels = domain.split(".");
  if (labels.length < 2 || labels.some((label) => !EMAIL_DOMAIN_LABEL_RE.test(label))) {
    return false;
  }

  const topLevelDomain = labels[labels.length - 1];
  return /^[A-Z]{2,63}$/i.test(topLevelDomain);
}

function validate(values) {
  const errors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) {
    errors.name = "Name is required.";
  } else if (!NAME_RE.test(name)) {
    errors.name = "Name can contain letters, spaces, apostrophes, and hyphens only.";
  } else if (name.length > MAX_NAME_LENGTH) {
    errors.name = `Name must be ${MAX_NAME_LENGTH} characters or fewer.`;
  }
  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!message) {
    errors.message = "Message is required.";
  } else if (message.length < MIN_MESSAGE_LENGTH) {
    errors.message = `Message must be at least ${MIN_MESSAGE_LENGTH} characters.`;
  } else if (message.length > MAX_MESSAGE_LENGTH) {
    errors.message = `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer.`;
  }
  return errors;
}

async function submitContactForm(values) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    throw new Error("Contact form isn't configured yet. Please try again later.");
  }

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: accessKey,
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
      subject: `Portfolio contact from ${values.name.trim()}`,
      from_name: "SYRAX Portfolio",
      botcheck: "",
    }),
  });

  const result = await response.json();
  if (!response.ok || !result.success) {
    throw new Error(result.message || "Message could not be sent. Please try again.");
  }
}

export default function Contact() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [submitError, setSubmitError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e2) => ({ ...e2, [name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("loading");
    setSubmitError("");
    try {
      await submitContactForm(values);
      setStatus("success");
      setValues({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("error");
      setSubmitError(error.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <section className="min-h-[75vh] flex items-center pt-24 sm:pt-28 md:pt-32 pb-14 sm:pb-16 md:pb-20">
      <div className="container-edit w-full">
        <div className="grid md:grid-cols-2 gap-10 sm:gap-14 md:gap-24">
          <div>
            <Reveal>
              <p className="label uppercase mb-3 sm:mb-4">Contact</p>
              <h1 className="text-3xl sm:text-4xl md:text-6xl tracking-tight text-ink">
                Let's <span className="text-accent font-bold">build.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="mt-8 sm:mt-12 md:mt-14 flex flex-col gap-5 sm:gap-6">
                <div>
                  <dt className="label uppercase mb-1">Email</dt>
                  <dd>
                    <InlineLink href={`mailto:${profile.email}`}>{profile.email}</InlineLink>
                  </dd>
                </div>
                <div>
                  <dt className="label uppercase mb-1">Phone</dt>
                  <dd>
                    <a href={profile.phoneHref} className="text-sm sm:text-base text-ink hover:text-accent transition-colors duration-200">
                      {profile.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="label uppercase mb-1">Digital Trails</dt>
                  <dd className="flex flex-col gap-2 mt-1">
                    <InlineLink href={profile.github}>GitHub</InlineLink>
                    <InlineLink href={profile.instagram}>Instagram</InlineLink>
                    <InlineLink href={profile.linkedin}>LinkedIn</InlineLink>
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.05}>
            <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
              <Field
                label="Name"
                name="name"
                maxLength={MAX_NAME_LENGTH}
                value={values.name}
                onChange={handleChange}
                error={errors.name}
                autoComplete="name"
              />
              <Field
                label="Email"
                name="email"
                type="email"
                maxLength={MAX_EMAIL_LENGTH}
                value={values.email}
                onChange={handleChange}
                error={errors.email}
                autoComplete="email"
              />
              <Field
                label="Message"
                name="message"
                as="textarea"
                rows={4}
                maxLength={MAX_MESSAGE_LENGTH}
                value={values.message}
                onChange={handleChange}
                error={errors.message}
              />

              <div className="flex flex-wrap items-center gap-4 mt-2">
                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm tracking-tight rounded-none bg-accent text-white hover:bg-[#7700d9] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending
                    </>
                  ) : (
                    <>
                      <span>Send message</span>
                      <ArrowUpRight
                        size={16}
                        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </>
                  )}
                </motion.button>

                {status === "success" && (
                  <span role="status" className="inline-flex items-center gap-1.5 text-sm text-accent">
                    <CheckCircle2 size={16} />
                    Message sent
                  </span>
                )}
                {status === "error" && (
                  <span role="alert" className="inline-flex items-center gap-1.5 text-sm text-red-400">
                    <AlertCircle size={16} />
                    {submitError}
                  </span>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, error, as = "input", ...props }) {
  const Comp = as;
  const id = `field-${name}`;
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="label uppercase block mb-1.5 sm:mb-2">
        {label}
      </label>
      <Comp
        id={id}
        name={name}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className="w-full bg-transparent border border-line rounded-md px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm text-ink placeholder:text-faint focus:border-accent transition-colors duration-200 outline-none resize-none"
        {...props}
      />
      {error && (
        <p id={errorId} className="mt-1.5 text-xs sm:text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
