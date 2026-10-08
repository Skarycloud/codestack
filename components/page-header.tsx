interface PageHeaderProps {
  eyebrow: string
  title: React.ReactNode
  description: React.ReactNode
  children?: React.ReactNode
}

export function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <header className="relative isolate overflow-hidden pb-12 pt-32 sm:pt-40">
      <div
        aria-hidden
        className="absolute left-1/2 top-[-14rem] -z-10 h-[30rem] w-[56rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,hsl(var(--primary)/0.14),transparent)] blur-2xl"
      />
      <div className="shell text-center">
        {[
          <p key="e" className="text-eyebrow text-link">
            {eyebrow}
          </p>,
          <h1 key="t" className="text-headline mx-auto mt-5 max-w-[20ch] text-balance">
            {title}
          </h1>,
          <p key="d" className="text-lede mx-auto mt-5 max-w-2xl text-pretty text-muted-foreground">
            {description}
          </p>,
        ].map((node, i) => (
          <div key={i} className="rise" style={{ "--d": `${0.04 + i * 0.07}s` } as React.CSSProperties}>
            {node}
          </div>
        ))}
        {children && (
          <div className="rise mt-10" style={{ "--d": "0.25s" } as React.CSSProperties}>
            {children}
          </div>
        )}
      </div>
    </header>
  )
}
