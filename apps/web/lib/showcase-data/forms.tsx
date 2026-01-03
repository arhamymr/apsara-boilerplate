import type * as React from "react"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Textarea } from "@workspace/ui/components/textarea"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { Switch } from "@workspace/ui/components/switch"
import { Slider } from "@workspace/ui/components/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import {
  RadioGroup,
  RadioGroupItem,
} from "@workspace/ui/components/radio-group"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@workspace/ui/components/input-otp"
import { CalendarIcon } from "lucide-react"
import type { ComponentShowcase } from "../types"

export const formsData: ComponentShowcase[] = [
  {
    id: "text-input",
    category: "forms",
    title: "Text Input",
    description: "Basic text input field with label",
    component: (
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="Enter your email" />
      </div>
    ),
  },
  {
    id: "textarea",
    category: "forms",
    title: "Textarea",
    description: "Multi-line text input",
    component: (
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" placeholder="Type your message here" />
      </div>
    ),
  },
  {
    id: "checkbox",
    category: "forms",
    title: "Checkbox",
    description: "Checkbox input with label",
    component: (
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    ),
  },
  {
    id: "switch",
    category: "forms",
    title: "Switch",
    description: "Toggle switch component",
    component: (
      <div className="flex items-center space-x-2">
        <Switch id="airplane-mode" />
        <Label htmlFor="airplane-mode">Airplane Mode</Label>
      </div>
    ),
  },
  {
    id: "slider",
    category: "forms",
    title: "Slider",
    description: "Range slider input",
    component: (
      <Slider defaultValue={[50]} max={100} step={1} className="w-[60%]" />
    ),
  },
  {
    id: "select",
    category: "forms",
    title: "Select",
    description: "Dropdown select menu",
    component: (
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
    ),
  },
  {
    id: "radio-group",
    category: "forms",
    title: "Radio Group",
    description: "Radio button group for single selection",
    component: (
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
    ),
  },
  {
    id: "input-otp",
    category: "forms",
    title: "Input OTP",
    description: "One-time password input",
    component: (
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
    ),
  },
  {
    id: "calendar",
    category: "forms",
    title: "Calendar",
    description: "Date picker calendar component",
    component: <CalendarIcon mode="single" className="rounded-md border" />,
  },
]
