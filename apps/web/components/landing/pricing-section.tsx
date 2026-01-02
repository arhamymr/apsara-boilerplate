export function PricingSection() {
  const plans = [
    {
      name: "Starter",
      price: "$0",
      description: "Perfect for trying out the devkit",
      features: [
        "Basic components library",
        "Authentication setup",
        "Single app deployment",
        "Community support",
        "MIT License",
      ],
    },
    {
      name: "Professional",
      price: "$49",
      description: "For professional developers",
      features: [
        "Everything in Starter",
        "Advanced components",
        "Multi-app monorepo",
        "Priority support",
        "Advanced templates",
        "Lifetime updates",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For teams and organizations",
      features: [
        "Everything in Professional",
        "Custom components",
        "Dedicated support",
        "Training sessions",
        "Custom integrations",
        "SLA guarantee",
      ],
    },
  ]

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <h2 className="text-4xl font-bold">Pricing Plans</h2>
            <span className="inline-flex items-center rounded-full bg-yellow-100 dark:bg-yellow-900 px-3 py-1 text-sm font-medium text-yellow-800 dark:text-yellow-200">
              Coming Soon
            </span>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose the perfect plan for your needs. Pricing details will be available soon.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-lg border bg-card p-8 shadow-sm transition-all hover:shadow-md ${
                plan.popular ? "border-primary ring-2 ring-primary ring-offset-2" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
                </div>
                <p className="text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <svg
                      className="h-5 w-5 text-primary mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                disabled
                className={`w-full rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  plan.popular
                    ? "bg-primary text-primary-foreground opacity-60 cursor-not-allowed"
                    : "bg-secondary text-secondary-foreground opacity-60 cursor-not-allowed"
                }`}
              >
                Coming Soon
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            All plans include access to the core devkit features. Enterprise plans can be customized to your needs.
          </p>
        </div>
      </div>
    </section>
  )
}
