import { Search, Settings, Rocket } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      num: "1",
      title: "Browse & Subscribe",
      description: "Explore our curated marketplace of AI tools built specifically for real estate professionals.",
      icon: <Search className="w-7 h-7" />,
    },
    {
      num: "2",
      title: "Integrate & Configure",
      description: "Connect tools to your existing CRM, website, or workflow in minutes. No coding required.",
      icon: <Settings className="w-7 h-7" />,
    },
    {
      num: "3",
      title: "Close More Deals",
      description: "Let AI handle the repetitive work while you focus on relationships and closing deals.",
      icon: <Rocket className="w-7 h-7" />,
    },
  ];

  return (
    <section className="py-20 bg-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary mb-4">How It Works</h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Get up and running with AI-powered real estate tools in three simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.num} className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary-light/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:from-primary group-hover:to-primary-light group-hover:text-white transition-all duration-300">
                {step.icon}
              </div>
              <div className="text-xs font-bold text-primary mb-2 uppercase tracking-widest font-heading">Step {step.num}</div>
              <h3 className="text-xl font-heading font-semibold text-text-primary mb-3">{step.title}</h3>
              <p className="text-text-secondary leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
