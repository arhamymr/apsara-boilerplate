export const codeSnippets: Record<string, string> = {
  "hero-section": `import { HeroSectionComponent } from "@/components/sections/hero-section-component"
import { Play } from "lucide-react"

export default function Hero() {
  return (
    <HeroSectionComponent
      badge={{
        text: "New Release",
        animated: true,
      }}
      title="Build beautiful interfaces"
      accentText="at scale"
      description="A comprehensive UI template system with everything you need."
      buttons={[
        {
          label: "Get Started",
          href: "/get-started",
        },
        {
          label: "View Demo",
          href: "/demo",
          icon: Play,
          variant: "outline",
        },
      ]}
      stats={[
        { value: "50+", label: "Components" },
        { value: "10+", label: "Templates" },
        { value: "100%", label: "Customizable" },
        { value: "Dark/Light", label: "Theme Support" },
      ]}
      showGrid={true}
    />
  )
}`,

  "features-section": `import { FeaturesSectionComponent } from "@/components/sections/features-section-component"
import { Palette, Layers, Zap, Shield, Code2, Smartphone } from "lucide-react"

export default function Features() {
  return (
    <FeaturesSectionComponent
      heading="Everything you need to build"
      subheading="A complete toolkit for modern web applications."
      features={[
        {
          icon: Palette,
          title: "Flexible Theming",
          description: "Dark and light modes with customizable design tokens.",
        },
        {
          icon: Layers,
          title: "Component Library",
          description: "50+ production-ready components.",
        },
      ]}
    />
  )
}`,

  "showcase-section": `import { ShowcaseSectionComponent } from "@/components/sections/showcase-section-component"

export default function Showcase() {
  return (
    <ShowcaseSectionComponent
      heading="Explore our templates"
      items={[
        {
          title: "Dashboard Template",
          description: "Modern admin dashboard with analytics and charts.",
          image: "/modern-dashboard.png",
          href: "/dashboard",
        },
      ]}
    />
  )
}`,

  "cta-section": `import { CTASectionComponent } from "@/components/sections/cta-section-component"
import { ArrowRight } from "lucide-react"

export default function CTA() {
  return (
    <CTASectionComponent
      title="Ready to get started?"
      description="Join thousands of developers building with our template."
      primaryButton={{
        label: "Start Building",
        href: "/get-started",
        icon: ArrowRight,
      }}
      secondaryButton={{
        label: "View Pricing",
        href: "/pricing",
      }}
    />
  )
}`,

  "primary-button": `import { Button } from "@workspace/ui/components/button"

export default function PrimaryButton() {
  return <Button>Click me</Button>
}`,

  "secondary-button": `import { Button } from "@workspace/ui/components/button"

export default function SecondaryButton() {
  return <Button variant="secondary">Secondary</Button>
}`,

  "destructive-button": `import { Button } from "@workspace/ui/components/button"

export default function DestructiveButton() {
  return <Button variant="destructive">Delete</Button>
}`,

  "outline-button": `import { Button } from "@workspace/ui/components/button"

export default function OutlineButton() {
  return <Button variant="outline">Outline</Button>
}`,

  "ghost-button": `import { Button } from "@workspace/ui/components/button"

export default function GhostButton() {
  return <Button variant="ghost">Ghost</Button>
}`,

  "link-button": `import { Button } from "@workspace/ui/components/button"

export default function LinkButton() {
  return <Button variant="link">Link</Button>
}`,

  "icon-button": `import { Button } from "@workspace/ui/components/button"
import { Mail } from "lucide-react"

export default function IconButton() {
  return (
    <Button>
      <Mail className="mr-2 h-4 w-4" />
      Login with Email
    </Button>
  )
}`,

  "loading-button": `import { Button } from "@workspace/ui/components/button"
import { Loader2 } from "lucide-react"

export default function LoadingButton() {
  return (
    <Button disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  )
}`,

  "text-input": `import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"

export default function TextInput() {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="Enter your email" />
    </div>
  )
}`,

  textarea: `import { Textarea } from "@workspace/ui/components/textarea"
import { Label } from "@workspace/ui/components/label"

export default function TextareaDemo() {
  return (
    <div className="space-y-2">
      <Label htmlFor="message">Message</Label>
      <Textarea id="message" placeholder="Type your message here" />
    </div>
  )
}`,

  checkbox: `import { Checkbox } from "@workspace/ui/components/checkbox"
import { Label } from "@workspace/ui/components/label"

export default function CheckboxDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  )
}`,

  switch: `import { Switch } from "@workspace/ui/components/switch"
import { Label } from "@workspace/ui/components/label"

export default function SwitchDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  )
}`,

  slider: `import { Slider } from "@workspace/ui/components/slider"

export default function SliderDemo() {
  return <Slider defaultValue={[50]} max={100} step={1} className="w-[60%]" />
}`,

  select: `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"

export default function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
      </SelectContent>
    </Select>
  )
}`,

  "radio-group": `import {
  RadioGroup,
  RadioGroupItem,
} from "@workspace/ui/components/radio-group"
import { Label } from "@workspace/ui/components/label"

export default function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  )
}`,

  "input-otp": `import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@workspace/ui/components/input-otp"

export default function InputOTPDemo() {
  return (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}`,

  calendar: `import * as React from "react"
import { Calendar } from "@workspace/ui/components/calendar"

export default function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  )
}`,
};
