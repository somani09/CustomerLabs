import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  cn,
  shadowDepthSoft,
  shadowDepthMedium,
  shadowDepthPrimary,
} from "@/lib/utils";

export default function StyleGuide() {
  const colors = [
    { label: "Heading", class: "bg-heading" },
    { label: "Subheading", class: "bg-subheading" },
    { label: "Text", class: "bg-text" },
    { label: "Muted", class: "bg-muted" },
    { label: "Accent", class: "bg-accent" },
    { label: "Accent Hover", class: "bg-accent-hover" },
    { label: "Accent Secondary", class: "bg-accent-secondary" },
    { label: "Accent Secondary Hover", class: "bg-accent-secondary-hover" },
    { label: "Border", class: "bg-border" },
    { label: "Surface", class: "bg-surface" },
    { label: "Surface Alt", class: "bg-surface-alt" },
    { label: "Glass", class: "bg-glass" },
  ];

  return (
    <div className="space-y-16 px-8 py-16 sm:px-16 lg:px-32">
      {/* Typography */}
      <section>
        <h2 className="text-heading mb-6 text-3xl font-bold">Typography</h2>

        <div className="space-y-4">
          <h1 className="text-heading text-6xl leading-tight font-bold">
            Heading 1
          </h1>
          <h2 className="text-heading text-4xl leading-snug font-semibold">
            Heading 2
          </h2>
          <h3 className="text-subheading text-2xl font-semibold">Heading 3</h3>
          <p className="text-text text-base leading-relaxed">
            Body text – this is your default paragraph styling. It uses the text
            color token and relaxed line height for readability.
          </p>
          <p className="text-muted text-sm leading-normal">
            Muted text – for helper notes, labels, or secondary info.
          </p>
        </div>
      </section>

      {/* Spacing */}
      <section>
        <h2 className="text-heading mb-6 text-3xl font-bold">Spacing Scale</h2>
        <div className="flex flex-wrap gap-4">
          {[4, 8, 12, 16, 24, 32, 48, 64].map((px) => (
            <div key={px} className="flex flex-col items-center text-sm">
              <div
                className="bg-accent rounded-md"
                style={{ width: `${px}px`, height: "12px" }}
              ></div>
              <span className="text-muted mt-1">{px}px</span>
            </div>
          ))}
        </div>
      </section>

      {/* Buttons */}
      <section>
        <h2 className="text-heading mb-6 text-3xl font-bold">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      {/* Inputs */}
      <section>
        <h2 className="text-heading mb-6 text-3xl font-bold">Inputs</h2>
        <div className="max-w-sm space-y-4">
          <div>
            <label className="text-text mb-1 block text-sm font-medium">
              Label
            </label>
            <Input type="text" placeholder="Input field" />
          </div>
          <div>
            <label className="text-text mb-1 block text-sm font-medium">
              Disabled
            </label>
            <Input type="text" placeholder="Disabled input" disabled />
          </div>
          <div>
            <label className="text-text mb-1 block text-sm font-medium">
              Invalid
            </label>
            <Input type="text" placeholder="Invalid input" aria-invalid />
          </div>
        </div>
      </section>

      {/* Shadows */}
      <section>
        <h2 className="text-heading mb-6 text-3xl font-bold">Shadows</h2>
        <div className="flex gap-8">
          <div
            className={cn(
              "rounded-xl bg-white/60 p-6 backdrop-blur-md",
              shadowDepthSoft,
            )}
          >
            Soft Shadow
          </div>
          <div
            className={cn(
              "rounded-xl bg-white/60 p-6 backdrop-blur-md",
              shadowDepthMedium,
            )}
          >
            Medium Shadow
          </div>
          <div
            className={cn(
              "rounded-xl bg-white/60 p-6 backdrop-blur-md",
              shadowDepthPrimary,
            )}
          >
            Primary Shadow
          </div>
        </div>
      </section>

      {/* Color Tokens */}
      <section>
        <h2 className="text-heading mb-6 text-3xl font-bold">Color Tokens</h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {colors.map(({ label, class: bgClass }) => (
            <div key={label} className="flex flex-col items-center">
              <div className={cn("h-16 w-16 rounded-lg border", bgClass)} />
              <span className="text-text mt-2 text-sm">{label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
