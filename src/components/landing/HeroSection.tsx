import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  GraduationCap, 
  ArrowRight,
  Star,
  Zap,
  Smartphone, 
  Moon, 
  FileSpreadsheet,
  Shield
} from 'lucide-react';

const HeroSection = () => {
  const highlights = [
    { icon: Smartphone, text: "Mobile-first" },
    { icon: Moon, text: "Dark mode" },
    { icon: FileSpreadsheet, text: "Excel sync" },
    { icon: Shield, text: "Secure" }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 gradient-hero"></div>
        <div className="absolute -top-96 -right-96 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-96 -left-96 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        {/* Mobile optimized particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/20 rounded-full animate-float hidden sm:block"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-primary/10 rounded-full animate-float hidden sm:block" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center animate-fade-in">
          {/* Logo and Brand */}
          <div className="flex flex-col items-center gap-6 mb-8 sm:mb-12">
            <div className="relative">
              <div className="h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 gradient-primary rounded-3xl flex items-center justify-center animate-glow shadow-2xl">
                <GraduationCap className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 text-primary-foreground" />
              </div>
              {/* Floating ring effect */}
              <div className="absolute inset-0 rounded-3xl border-2 border-primary/20 animate-pulse"></div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold gradient-text leading-tight">
                AttendanceHub
              </h1>
              <div className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm sm:text-base font-medium animate-fade-in backdrop-blur-sm">
                <Star className="h-4 w-4 mr-2 fill-current" />
                100% Free Forever • No Sign-up Required
              </div>
            </div>
          </div>

          {/* Value Proposition */}
          <div className="mb-12 sm:mb-16 space-y-6">
            <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
              The most advanced attendance management system for educational institutions.
              <span className="block mt-2 text-primary font-medium">Start tracking attendance instantly.</span>
            </p>
          </div>

          {/* CTA Section */}
          <div className="space-y-8 mb-16">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <Button 
                size="lg" 
                className="w-full sm:w-auto text-lg px-8 py-6 h-auto gradient-primary hover:scale-105 transition-all duration-300 animate-glow shadow-2xl"
                asChild
              >
                <a href="/dashboard" className="flex items-center justify-center">
                  Start Using Now - It's Free!
                  <ArrowRight className="ml-3 h-5 w-5" />
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto text-lg px-8 py-6 h-auto glass-effect hover-lift border-primary/20 hover:border-primary/40"
              >
                <Zap className="mr-3 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {highlights.map((item, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="px-4 py-2 text-sm glass-effect hover-lift animate-fade-in border border-primary/10"
                  style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.text}
                </Badge>
              ))}
            </div>

            {/* Additional Trust Message */}
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Join 10,000+ institutions worldwide • No credit card required • Setup in under 2 minutes
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;