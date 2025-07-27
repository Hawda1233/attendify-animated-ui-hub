import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  GraduationCap, 
  Users, 
  CheckCircle, 
  BarChart3,
  Smartphone,
  Cloud,
  FileSpreadsheet,
  Shield,
  Zap,
  Globe,
  TrendingUp,
  Clock,
  ArrowRight,
  Star,
  Sparkles,
  Heart
} from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
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
                <div className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm sm:text-base font-medium animate-fade-in backdrop-blur-sm">
                  <Star className="h-4 w-4 mr-2 fill-current" />
                  Secure Login • Quick Setup
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
                  <a href="/auth" className="flex items-center justify-center">
                    Get Started Now
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </a>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                {[
                  { icon: Smartphone, text: "Mobile-first" },
                  { icon: Shield, text: "Secure" },
                  { icon: FileSpreadsheet, text: "Excel sync" },
                  { icon: Cloud, text: "Cloud sync" }
                ].map((item, index) => (
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
                Join 10,000+ institutions worldwide • Quick registration • Setup in under 2 minutes
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

      {/* Stats Section */}
      <section className="py-16 sm:py-24 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Trusted by Institutions 
              <span className="gradient-text block sm:inline"> Worldwide</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform powers attendance management for educational institutions across the globe
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8">
            {[
              { number: "50K+", label: "Students Managed", icon: Users, color: "text-blue-500" },
              { number: "1,000+", label: "Institutions", icon: GraduationCap, color: "text-purple-500" },
              { number: "99.9%", label: "Uptime", icon: TrendingUp, color: "text-green-500" },
              { number: "24/7", label: "Support", icon: Globe, color: "text-orange-500" },
              { number: "<2min", label: "Setup Time", icon: Clock, color: "text-indigo-500" },
              { number: "100%", label: "Satisfaction", icon: CheckCircle, color: "text-emerald-500" }
            ].map((stat, index) => (
              <Card 
                key={index} 
                className="text-center glass-effect hover-lift animate-slide-up border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  <div className="space-y-3 sm:space-y-4">
                    <div className={`mx-auto w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-current to-current/70 ${stat.color} flex items-center justify-center opacity-20`}>
                      <stat.icon className={`h-6 w-6 sm:h-8 sm:w-8 ${stat.color} opacity-100`} />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text">
                        {stat.number}
                      </div>
                      <div className="text-xs sm:text-sm lg:text-base text-muted-foreground font-medium">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Trust Elements */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-8 text-muted-foreground text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Real-time sync</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <span>Enterprise ready</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <span>GDPR compliant</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 sm:mb-20 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Everything You Need for
              <span className="gradient-text block sm:inline"> Modern Attendance</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              A complete attendance management solution designed for the modern educational institution. 
              Powerful features that scale with your needs.
            </p>
          </div>

          {/* Main Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
            {[
              {
                icon: Users,
                title: "Smart Student Management",
                description: "Effortless enrollment, organization, and tracking across multiple institutions with intelligent categorization.",
                color: "from-blue-500 to-blue-600",
                delay: "0s"
              },
              {
                icon: CheckCircle,
                title: "Instant Attendance Tracking",
                description: "Real-time attendance capture with multiple input methods including bulk import and manual entry.",
                color: "from-green-500 to-green-600",
                delay: "0.1s"
              },
              {
                icon: BarChart3,
                title: "Advanced Analytics",
                description: "Comprehensive reports and insights to make data-driven decisions about student engagement.",
                color: "from-purple-500 to-purple-600",
                delay: "0.2s"
              },
              {
                icon: Smartphone,
                title: "Mobile-First Design",
                description: "Optimized for all devices with responsive design that works perfectly on phones, tablets, and desktops.",
                color: "from-pink-500 to-pink-600",
                delay: "0.3s"
              },
              {
                icon: Cloud,
                title: "Cloud Synchronization",
                description: "Your data is automatically synced and backed up with enterprise-grade security and reliability.",
                color: "from-indigo-500 to-indigo-600",
                delay: "0.4s"
              },
              {
                icon: FileSpreadsheet,
                title: "Excel Integration",
                description: "Seamlessly import and export data with Excel, making migration and reporting effortless.",
                color: "from-emerald-500 to-emerald-600",
                delay: "0.5s"
              }
            ].map((feature, index) => (
              <Card 
                key={index} 
                className="relative overflow-hidden hover-lift gradient-card animate-slide-up border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group"
                style={{ animationDelay: feature.delay }}
              >
                <CardContent className="p-6 sm:p-8 lg:p-10">
                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div className={`h-16 w-16 sm:h-20 sm:w-20 bg-gradient-to-br ${feature.color} rounded-3xl flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                    </div>
                    {/* Glow effect */}
                    <div className={`absolute inset-0 h-16 w-16 sm:h-20 sm:w-20 bg-gradient-to-br ${feature.color} rounded-3xl mx-auto opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300`}></div>
                  </div>

                  <div className="text-center space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                      {feature.description}
                    </p>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-primary/3 to-transparent rounded-tr-3xl"></div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Secondary Highlights */}
          <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
            {[
              { icon: Shield, title: "Enterprise Security", desc: "Bank-level encryption" },
              { icon: Zap, title: "Lightning Fast", desc: "Sub-second response times" },
              { icon: Globe, title: "Global Access", desc: "Available worldwide" }
            ].map((highlight, index) => (
              <div 
                key={index}
                className="text-center p-6 sm:p-8 rounded-2xl glass-effect hover-lift animate-fade-in"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 text-primary mb-4">
                  <highlight.icon className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
                <h4 className="text-lg sm:text-xl font-semibold mb-2">{highlight.title}</h4>
                <p className="text-sm sm:text-base text-muted-foreground">{highlight.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
                  <a href="/auth" className="flex items-center justify-center">
                    Get Started Now
                    <ArrowRight className="ml-3 h-5 w-5 sm:h-6 sm:w-6" />
                  </a>
                </Button>
              </div>

              {/* Trust Messaging */}
              <div className="space-y-4">
                <p className="text-sm sm:text-base text-muted-foreground">
                  <span className="font-semibold text-green-600">✓ Quick registration</span> • 
                  <span className="font-semibold text-blue-600"> Secure access</span> • 
                  <span className="font-semibold text-purple-600"> Always available</span> • 
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
                Create your account in seconds and begin tracking attendance immediately. 
                Our intuitive interface makes attendance management effortless from day one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 sm:py-16 border-t bg-muted/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            {/* Logo and Brand */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-8 w-8 sm:h-10 sm:w-10 gradient-primary rounded-xl flex items-center justify-center">
                <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
              </div>
              <span className="text-xl sm:text-2xl font-bold gradient-text">
                AttendanceHub
              </span>
            </div>

            {/* Mission Statement */}
            <div className="max-w-md mx-auto space-y-3">
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Transforming education through innovative attendance management
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <span>Made with</span>
                <Heart className="h-4 w-4 text-red-500 fill-current animate-pulse" />
                <span>for educators worldwide</span>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-sm sm:text-base">
              <a href="/auth" className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:underline">
                Sign In
              </a>
              <a href="/students" className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:underline">
                Students
              </a>
              <a href="/attendance" className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:underline">
                Attendance
              </a>
              <a href="/analytics" className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:underline">
                Analytics
              </a>
            </div>

            {/* Copyright */}
            <div className="pt-6 border-t border-border/50">
              <p className="text-xs sm:text-sm text-muted-foreground">
                © 2025 AttendanceHub. Empowering education through technology • Always improving
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;