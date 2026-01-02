interface LogoCloudProps {
  title: string
  logos: { name: string; src: string }[]
}

export function LogoCloud({ title, logos }: LogoCloudProps) {
  return (
    <section className="py-12 border-y">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-muted-foreground mb-8">{title}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center max-w-5xl mx-auto">
          {logos.map((logo, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all"
            >
              <img src={logo.src || "/placeholder.svg"} alt={logo.name} className="h-8 object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
