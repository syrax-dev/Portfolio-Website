import { Cta } from "../components/Cta";

export default function NotFound() {
  return (
    <section className="pt-40 md:pt-56 pb-32 min-h-[70vh] flex items-center">
      <div className="container-edit">
        <p className="label uppercase mb-4">404</p>
        <h1 className="text-4xl md:text-6xl tracking-tight text-ink max-w-xl">
          This page doesn't exist.
        </h1>
        <p className="mt-4 text-muted max-w-sm">
          The page you're looking for was moved, renamed, or never here.
        </p>
        <div className="mt-10">
          <Cta to="/">Back to home</Cta>
        </div>
      </div>
    </section>
  );
}
