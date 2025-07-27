import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Sparkles } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 gradient-hero"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          {/* Main Heading */}
          <div className="mb-8 sm:mb-12">
            <div className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm sm:text-base font-medium mb-6 backdrop-blur-sm animate-glow">
              <Sparkles className="h-4 w-4 mr-2 fill-current" />
              Ready in Under 2 Minutes
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
              Ready to Transform Your 
              <span className="gradient-text block lg:inline"> Attendance Management?</span>
            </h2>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Join thousands of educational institutions already using AttendanceHub to streamline their operations.
              <span className="block mt-2 text-primary font-medium">Start managing attendance like a pro today.</span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-6 sm:space-y-8 mb-12">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <Button 
                size="lg" 
                className="w-full sm:w-auto text-lg sm:text-xl px-8 sm:px-12 py-6 sm:py-8 h-auto gradient-primary hover:scale-105 transition-all duration-300 shadow-2xl animate-glow"
                asChild
              >
                <a href="/dashboard" className="flex items-center justify-center">
                  Start Using Now - 100% Free
                  <ArrowRight className="ml-3 h-5 w-5 sm:h-6 sm:w-6" />
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto text-lg sm:text-xl px-8 sm:px-12 py-6 sm:py-8 h-auto glass-effect hover-lift border-primary/20 hover:border-primary/40"
              >
                <Star className="mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                See Live Demo
              </Button>
            </div>

            {/* Trust Messaging */}
            <div className="space-y-4">
              <p className="text-sm sm:text-base text-muted-foreground">
                <span className="font-semibold text-green-600">✓ No registration required</span> • 
                <span className="font-semibold text-blue-600"> Instant access</span> • 
                <span className="font-semibold text-purple-600"> Always free</span> • 
                <span className="font-semibold text-orange-600"> No hidden costs</span>
              </p>
              
              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Used by 1,000+ institutions</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <span>99.9% uptime guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <span>24/7 support included</span>
                </div>
              </div>
            </div>
          </div>

          {/* Final Assurance */}
          <div className="p-6 sm:p-8 rounded-2xl glass-effect border border-primary/10 max-w-2xl mx-auto">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-foreground">
              🚀 Get Started in Seconds
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              No complicated setup, no learning curve. Click "Start Using Now" and begin tracking attendance immediately. 
              Our intuitive interface makes attendance management effortless from day one.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;