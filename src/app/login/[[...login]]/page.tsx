import { SignIn } from "@clerk/nextjs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center py-16">
        <SignIn
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-lg border border-border rounded-2xl",
              headerTitle: "font-heading text-text-primary",
              headerSubtitle: "text-text-secondary",
              formButtonPrimary: "bg-cta hover:bg-cta-dark",
              footerActionLink: "text-primary hover:text-cta",
            },
          }}
        />
      </main>
      <Footer />
    </>
  );
}
