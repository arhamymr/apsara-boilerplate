import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@workspace/ui/components/accordion"

interface FAQ {
  question: string
  answer: string
}

interface FAQAccordionProps {
  title: string
  description?: string
  faqs: FAQ[]
}

export function FAQAccordion({ title, description, faqs }: FAQAccordionProps) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-balance text-3xl font-bold tracking-tight lg:text-4xl mb-4">{title}</h2>
            {description && <p className="text-pretty text-lg text-muted-foreground">{description}</p>}
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
