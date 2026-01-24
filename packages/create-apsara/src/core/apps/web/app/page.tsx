import { Suspense } from "react";
import { Spinner } from "@workspace/ui/components/spinner";

export default function HomePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-4">Welcome to Apsara</h1>
      <p className="text-muted-foreground mb-8">
        Generated with Apsara DevKit - Your modular web application starter
      </p>
      <Suspense fallback={<Spinner />}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Get Started</h2>
            <p className="text-muted-foreground">
              Check out the documentation to learn how to build your
              application.
            </p>
          </div>
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Features</h2>
            <p className="text-muted-foreground">
              Explore the features included in your project.
            </p>
          </div>
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Deploy</h2>
            <p className="text-muted-foreground">
              Ready to deploy? Follow our deployment guide.
            </p>
          </div>
        </div>
      </Suspense>
    </div>
  );
}
