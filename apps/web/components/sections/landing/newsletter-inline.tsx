import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Mail } from "lucide-react"

interface NewsletterInlineProps {
  title: string
  description: string
  placeholder?: string
  buttonText?: string
}

export function NewsletterInline({
  title,
  description,
  placeholder = "Enter your email",
  buttonText = "Subscribe",
}: NewsletterInlineProps) {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-balance text-3xl font-bold tracking-tight mb-4">{title}</h2>
          <p className="text-pretty text-muted-foreground mb-8">{description}</p>
          <form className="flex flex-col sm:flex-row gap-3">
            <Input type="email" placeholder={placeholder} className="flex-1" required />
            <Button type="submit">{buttonText}</Button>
          </form>
        </div>
      </div>
    </section>
  )
}
