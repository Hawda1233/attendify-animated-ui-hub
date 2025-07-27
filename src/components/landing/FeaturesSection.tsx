import { Card, CardContent } from '@/components/ui/card';
import { 
  Users, 
  CheckCircle, 
  BarChart3,
  Smartphone,
  Cloud,
  FileSpreadsheet,
  Shield,
  Zap,
  Globe
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
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
  ];

  const highlights = [
    { icon: Shield, title: "Enterprise Security", desc: "Bank-level encryption" },
    { icon: Zap, title: "Lightning Fast", desc: "Sub-second response times" },
    { icon: Globe, title: "Global Access", desc: "Available worldwide" }
  ];

  return (
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
          {features.map((feature, index) => (
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
          {highlights.map((highlight, index) => (
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
  );
};

export default FeaturesSection;