import React, { useState, FormEvent } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Icon, { IconProps } from "@/components/common/AppIcon";

interface BenefitItem {
  icon: IconProps['name'];
  title: string;
  description: string;
}

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e?.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setIsSubscribed(true);
    setEmail("");
  };

  const benefits: BenefitItem[] = [
    {
      icon: "Tag",
      title: "Exclusive Deals",
      description: "Get first access to sales and special offers",
    },
    {
      icon: "Bell",
      title: "New Arrivals",
      description: "Be the first to know about new products",
    },
    {
      icon: "Gift",
      title: "Member Perks",
      description: "Enjoy subscriber-only benefits and rewards",
    },
  ];

  if (isSubscribed) {
    return (
      <section className="py-12 lg:py-16 bg-gradient-to-r from-accent to-accent/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <Icon name="CheckCircle" size={40} className="text-white" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Welcome to RWT HUB!
          </h2>
          <p className="text-white/90 text-lg mb-6">
            Thank you for subscribing! You'll receive our latest updates and
            exclusive offers.
          </p>
          <Button
            variant="outline"
            onClick={() => setIsSubscribed(false)}
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            Subscribe Another Email
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-r from-accent to-accent/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Stay in the Loop
            </h2>
            <p className="text-white/90 text-lg mb-6">
              Subscribe to our newsletter and never miss out on the latest
              deals, new arrivals, and exclusive member benefits.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              {benefits?.map((benefit) => (
                <div
                  key={benefit?.title}
                  className="flex items-start space-x-3 text-left"
                >
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon
                      name={benefit?.icon}
                      size={16}
                      className="text-white"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">
                      {benefit?.title}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {benefit?.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Signup Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 lg:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  label="Email Address"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e?.target?.value)}
                  error={error}
                  className="bg-white/20 border-white/30 text-white placeholder-white/70"
                  required
                />
              </div>

              <Button
                type="submit"
                loading={isLoading}
                fullWidth
                size="lg"
                iconName="Mail"
                iconPosition="left"
                className="bg-white text-accent hover:bg-white/90 font-semibold"
              >
                {isLoading ? "Subscribing..." : "Subscribe Now"}
              </Button>

              <p className="text-white/70 text-xs text-center">
                By subscribing, you agree to our{" "}
                <a
                  href="#"
                  className="underline hover:text-white transition-colors duration-200"
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="underline hover:text-white transition-colors duration-200"
                >
                  Terms of Service
                </a>
              </p>
            </form>

            {/* Social Proof */}
            <div className="mt-6 pt-6 border-t border-white/20">
              <div className="flex items-center justify-center space-x-4 text-white/80">
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={16} />
                  <span className="text-sm">50K+ subscribers</span>
                </div>
                <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                <div className="flex items-center space-x-2">
                  <Icon name="Star" size={16} className="fill-current" />
                  <span className="text-sm">4.8/5 rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
