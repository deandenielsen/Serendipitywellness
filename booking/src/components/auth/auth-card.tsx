import { Wordmark } from "@/components/wordmark";

function AuthCard({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-sm py-12 sm:py-16">
      <div className="mb-8 text-center">
        <Wordmark className="mb-6" />
        <h1 className="font-serif text-h3 font-semibold text-copy">{title}</h1>
        {intro && <p className="mt-2 text-small text-copy/60">{intro}</p>}
      </div>
      <div className="rounded-app border border-secondary bg-surface p-6 sm:p-8">
        {children}
      </div>
    </div>
  );
}

export { AuthCard };
