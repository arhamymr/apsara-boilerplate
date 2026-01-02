import { Card, CardContent } from "@workspace/ui/components/card"
import { Check, X } from "lucide-react"

interface Feature {
  name: string
  us: boolean
  competitor1: boolean
  competitor2: boolean
}

interface ComparisonTableProps {
  title?: string
  description?: string
  ourProduct: string
  competitors: [string, string]
  features: Feature[]
}

export function ComparisonTable({
  title = "See How We Compare",
  description,
  ourProduct,
  competitors,
  features,
}: ComparisonTableProps) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-balance text-3xl font-bold tracking-tight lg:text-4xl mb-4">{title}</h2>
          {description && <p className="text-pretty text-lg text-muted-foreground max-w-2xl mx-auto">{description}</p>}
        </div>
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="p-4 text-left font-semibold">Features</th>
                    <th className="p-4 text-center font-semibold bg-primary/5">{ourProduct}</th>
                    <th className="p-4 text-center font-semibold text-muted-foreground">{competitors[0]}</th>
                    <th className="p-4 text-center font-semibold text-muted-foreground">{competitors[1]}</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, idx) => (
                    <tr key={idx} className="border-b last:border-b-0">
                      <td className="p-4">{feature.name}</td>
                      <td className="p-4 text-center bg-primary/5">
                        {feature.us ? (
                          <Check className="h-5 w-5 text-primary mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground mx-auto" />
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {feature.competitor1 ? (
                          <Check className="h-5 w-5 text-muted-foreground mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground mx-auto" />
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {feature.competitor2 ? (
                          <Check className="h-5 w-5 text-muted-foreground mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
