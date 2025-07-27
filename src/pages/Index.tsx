import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  GraduationCap, 
  Users, 
  CheckCircle, 
  BarChart3, 
  Shield, 
  Smartphone, 
  Moon, 
  FileSpreadsheet,
  ArrowRight,
  Star,
  Zap,
  Globe,
  Clock
} from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: Users,
      title: "Student Management",
      description: "Easy enrollment and management of students across multiple colleges",
      color: "from-blue-500 to-blue-600",
      delay: "0s"
    },
    {
      icon: CheckCircle,
      title: "Smart Attendance",
      description: "Digital attendance tracking with Excel import/export capabilities",
      color: "from-green-500 to-green-600",
      delay: "0.2s"
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description: "Comprehensive analytics and reporting for informed decision making",
      color: "from-purple-500 to-purple-600",
      delay: "0.4s"
    }
  ];

  const highlights = [
    { icon: Smartphone, text: "Mobile-responsive" },
    { icon: Moon, text: "Dark mode" },
    { icon: FileSpreadsheet, text: "Excel integration" },
    { icon: Shield, text: "Secure authentication" }
  ];

  const stats = [
    { number: "10K+", label: "Students Managed", icon: Users },
    { number: "500+", label: "Institutions", icon: GraduationCap },
    { number: "99.9%", label: "Uptime", icon: Clock },
    { number: "24/7", label: "Support", icon: Globe }
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center gradient-hero">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            {/* Logo and Title */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="relative">
                <div className="h-20 w-20 gradient-primary rounded-2xl flex items-center justify-center animate-glow">
                  <GraduationCap className="h-12 w-12 text-primary-foreground" />
                </div>
              </div>
              <h1 className="text-6xl md:text-7xl font-bold gradient-text text-shadow">
                AttendanceHub
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Production-ready attendance management system for educational institutions. 
              Transform how you track and manage student attendance with our modern solution.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 gradient-primary hover:scale-105 transition-all duration-300 animate-glow"
                asChild
              >
                <a href="/auth">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 glass-effect hover-lift"
              >
                Watch Demo
                <Zap className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Highlights */}
            <div className="flex flex-wrap justify-center gap-6">
              {highlights.map((item, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="px-4 py-2 text-sm glass-effect hover-lift animate-fade-in"
                  style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.text}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card 
                key={index} 
                className="text-center glass-effect hover-lift animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                  <div className="text-3xl font-bold gradient-text mb-2">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Powerful Features for 
              <span className="gradient-text"> Modern Education</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to manage student attendance efficiently and effectively
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="relative overflow-hidden hover-lift gradient-card animate-slide-up"
                style={{ animationDelay: feature.delay }}
              >
                <CardContent className="p-8 text-center">
                  {/* Icon with gradient background */}
                  <div className="relative mb-6">
                    <div className={`h-16 w-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Decorative element */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your 
              <span className="gradient-text"> Attendance Management?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of educational institutions already using AttendanceHub to streamline their operations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 gradient-primary hover:scale-105 transition-all duration-300"
                asChild
              >
                <a href="/auth">
                  Start Free Trial
                  <Star className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 glass-effect hover-lift"
              >
                Contact Sales
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-8 w-8 gradient-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold gradient-text">AttendanceHub</span>
          </div>
          <p className="text-muted-foreground">
            © 2024 AttendanceHub. Transforming education through technology.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;