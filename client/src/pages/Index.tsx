import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  GraduationCap,
  ArrowRight,
  BookOpen,
  Users,
  Calendar,
  ClipboardCheck,
  BarChart3,
  Building2,
  Shield,
  Clock,
  FileText,
  MessageSquare,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Index = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeInOut"
      }
    })
  };

  const features = [
    {
      title: "Admission Management",
      description: "Streamline student enrollment with digital applications and document processing.",
      icon: ClipboardCheck
    },
    {
      title: "Academic Records",
      description: "Comprehensive student academic history and performance tracking.",
      icon: FileText
    },
    {
      title: "Faculty Portal",
      description: "Dedicated workspace for faculty to manage courses and assessments.",
      icon: Users
    },
    {
      title: "Attendance System",
      description: "Digital attendance tracking with automated reports and analytics.",
      icon: Clock
    },
    {
      title: "Financial Management",
      description: "Handle fees, payroll, and institutional expenses efficiently.",
      icon: BarChart3
    },
    {
      title: "Campus Resources",
      description: "Manage facilities, equipment, and resource allocation.",
      icon: Building2
    },
    {
      title: "Communication Hub",
      description: "Centralized platform for announcements and discussions.",
      icon: MessageSquare
    },
    {
      title: "Security & Access",
      description: "Role-based access control and data protection measures.",
      icon: Shield
    }
  ];

  const stats = [
    { value: "98%", label: "Student Satisfaction" },
    { value: "45+", label: "Partner Institutions" },
    { value: "24/7", label: "System Uptime" },
    { value: "500K+", label: "Users" }
  ];

  const modules = [
    {
      title: "Student Information System",
      features: ["Digital Student Profiles", "Academic Progress Tracking", "Attendance Management"]
    },
    {
      title: "Academic Management",
      features: ["Course Planning", "Grade Management", "Academic Calendar"]
    },
    {
      title: "Administrative Tools",
      features: ["Staff Management", "Resource Allocation", "Financial Planning"]
    },
    {
      title: "Communication Platform",
      features: ["Announcements", "Discussion Forums", "Parent Portal"]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full py-4 px-6 bg-background/95 backdrop-blur-sm border-b fixed top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl">SCMS</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="nav-link">Features</a>
            <a href="#modules" className="nav-link">Modules</a>
            <a href="#demo" className="nav-link">Request Demo</a>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/login" className="nav-link">
              <Button className=" bg-violet-600" size="sm">Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-violet-50 via-white to-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-8"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              custom={0}
            >
              <div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
                  Modern College <br />
                  <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                    Management System
                  </span>
                </h1>
                <p className="mt-6 text-xl text-muted-foreground max-w-md leading-relaxed">
                  Streamline your institution's operations with our comprehensive management solution.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Button size="lg" className="bg-violet-600 hover:bg-violet-700">
                  Schedule Demo
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button size="lg" variant="outline">
                  View Features
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white rounded-xl shadow-sm">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center"
                    variants={fadeIn}
                    custom={index + 1}
                  >
                    <div className="text-2xl font-bold text-violet-600">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              custom={1}
              className="relative"
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=1200"
                  alt="College management dashboard"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/20 to-transparent" />
              </div>
              <div className="absolute -bottom-8 -right-8 h-28 w-28 bg-violet-600 rounded-2xl rotate-6 flex items-center justify-center">
                <Building2 className="h-12 w-12 text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              custom={0}
            >
              <h2 className="text-4xl font-bold mb-4">Comprehensive Features</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to manage your educational institution effectively.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                custom={index + 1}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="pt-6">
                    <div className="h-12 w-12 rounded-lg bg-violet-100 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-violet-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section id="modules" className="py-20 px-6 bg-violet-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              custom={0}
            >
              <h2 className="text-4xl font-bold mb-4">Core Modules</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Integrated modules designed for educational excellence
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {modules.map((module, index) => (
              <motion.div
                key={module.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                custom={index + 1}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-4">{module.title}</h3>
                    <ul className="space-y-2">
                      {module.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="demo" className="py-20 px-6 bg-violet-600 text-white">
        <div className="container mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Institution?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8 opacity-90">
              Join leading educational institutions using SCMS to streamline their operations.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/demo">Request Demo</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                Contact Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-background border-t">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-muted-foreground hover:text-violet-600">Features</a></li>
                <li><a href="#modules" className="text-muted-foreground hover:text-violet-600">Modules</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-violet-600">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-violet-600">About</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-violet-600">Contact</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-violet-600">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-violet-600">Documentation</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-violet-600">Help Center</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-violet-600">Updates</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-violet-600">Privacy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-violet-600">Terms</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-violet-600">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <GraduationCap className="h-6 w-6 text-violet-600" />
              <span className="font-bold text-lg">SCMS</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 SCMS. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;