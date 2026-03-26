import { Bot, Zap, BarChart3, Megaphone, Target, Home } from "lucide-react";

export const categoryIcons: Record<string, React.ReactNode> = {
  "ai-agent": <Bot className="w-6 h-6" />,
  "automation": <Zap className="w-6 h-6" />,
  "analytics": <BarChart3 className="w-6 h-6" />,
  "marketing": <Megaphone className="w-6 h-6" />,
  "lead-gen": <Target className="w-6 h-6" />,
  "property-mgmt": <Home className="w-6 h-6" />,
};

export const categoryIconsLarge: Record<string, React.ReactNode> = {
  "ai-agent": <Bot className="w-10 h-10" />,
  "automation": <Zap className="w-10 h-10" />,
  "analytics": <BarChart3 className="w-10 h-10" />,
  "marketing": <Megaphone className="w-10 h-10" />,
  "lead-gen": <Target className="w-10 h-10" />,
  "property-mgmt": <Home className="w-10 h-10" />,
};

export const categoryIconsHero: Record<string, React.ReactNode> = {
  "ai-agent": <Bot className="w-16 h-16" />,
  "automation": <Zap className="w-16 h-16" />,
  "analytics": <BarChart3 className="w-16 h-16" />,
  "marketing": <Megaphone className="w-16 h-16" />,
  "lead-gen": <Target className="w-16 h-16" />,
  "property-mgmt": <Home className="w-16 h-16" />,
};
