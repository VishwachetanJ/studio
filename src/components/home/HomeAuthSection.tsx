
import { SignInForm } from "@/components/forms/SignInForm";
import { SignUpForm } from "@/components/forms/SignUpForm";

export function HomeAuthSection() {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-primary/5 via-background to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-headline text-primary">
                Join Our Community
            </h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto mt-4">
                Sign in to your account or create a new one to connect with Jagruthi, support our causes, and stay updated on our initiatives.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div>
            <SignInForm />
          </div>
          <div>
            <SignUpForm />
          </div>
        </div>
      </div>
    </section>
  );
}
