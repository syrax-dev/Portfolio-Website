import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";

export function Cta({ to, href, children, variant = "primary" }) {
  const isExternal = Boolean(href);
  const Comp = isExternal ? "a" : Link;
  const extraProps = isExternal
    ? { href, target: href.startsWith("http") ? "_blank" : undefined, rel: "noreferrer" }
    : { to };

  const base =
    "group inline-flex items-center gap-2 px-6 py-3.5 text-sm tracking-tight transition-colors duration-200";
  const styles =
    variant === "primary"
      ? `${base} bg-ink text-black hover:bg-accent hover:text-white rounded-md`
      : `${base} border border-line text-ink hover:border-accent hover:text-accent rounded-md`;

  return (
    <Comp className={styles} {...extraProps}>
      {children}
      <ArrowRight
        size={16}
        className="transition-transform duration-200 group-hover:translate-x-1"
      />
    </Comp>
  );
}

export function InlineLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-1.5 text-ink hover:text-accent transition-colors duration-200"
    >
      {children}
      <ArrowUpRight
        size={14}
        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
}
