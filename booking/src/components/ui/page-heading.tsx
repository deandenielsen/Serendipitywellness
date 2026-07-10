function PageHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="mb-10 text-center sm:mb-12">
      <p className="mb-3 flex items-center justify-center gap-3 text-eyebrow font-medium uppercase tracking-[0.3em] text-primary-strong">
        <span className="h-px w-8 bg-primary/60" aria-hidden />
        {eyebrow}
        <span className="h-px w-8 bg-primary/60" aria-hidden />
      </p>
      <h1 className="text-h2 font-semibold text-copy">{title}</h1>
      {intro && (
        <p className="mx-auto mt-3 max-w-md text-small text-copy/70">{intro}</p>
      )}
    </div>
  );
}

export { PageHeading };
