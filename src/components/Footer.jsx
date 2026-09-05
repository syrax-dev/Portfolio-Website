import { profile } from "../data/profile";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="container-edit py-8 sm:py-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6 sm:gap-8">
        <div>
          <p className="text-sm font-semibold tracking-[0.08em] text-ink">SYRAX</p>
          <p className="mt-1 text-xs sm:text-sm text-muted">
            {profile.name} — {profile.role}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="label uppercase text-muted hover:text-accent transition-colors duration-200 py-1"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="label uppercase text-muted hover:text-accent transition-colors duration-200 py-1"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="label uppercase text-muted hover:text-accent transition-colors duration-200 py-1"
          >
            Email
          </a>
        </div>
      </div>

      <div className="container-edit pb-8 sm:pb-10">
        <p className="text-xs text-faint">
          © {year} {profile.name}
        </p>
      </div>
    </footer>
  );
}
