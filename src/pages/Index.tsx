
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, Calendar, Clock, User, Star, ArrowRight, Shield, Smartphone, Zap } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Assign jobs to crews with drag-and-drop simplicity. Never double-book again.",
      color: "text-blue-600"
    },
    {
      icon: Clock,
      title: "Time Tracking",
      description: "Clock in/out per job with GPS verification. Accurate payroll every time.",
      color: "text-green-600"
    },
    {
      icon: Users,
      title: "Team Management",
      description: "Manage roles, permissions, and crew assignments all in one place.",
      color: "text-purple-600"
    },
    {
      icon: User,
      title: "Customer Portal",
      description: "Customers can view job progress, history, and communicate directly.",
      color: "text-orange-600"
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Built for contractors on the go. Works perfectly on phones and tablets.",
      color: "text-pink-600"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with automatic backups and 99.9% uptime.",
      color: "text-indigo-600"
    }
  ];

  const testimonials = [
    {
      name: "Mike Rodriguez",
      company: "Rodriguez Electrical",
      content: "Easy Contractor saved me 10 hours a week on scheduling and paperwork. My crews love the mobile app!",
      rating: 5
    },
    {
      name: "Sarah Chen",
      company: "Chen Plumbing Solutions",
      content: "The time tracking feature alone paid for itself in the first month. No more guessing on job costs.",
      rating: 5
    },
    {
      name: "David Thompson",
      company: "Thompson HVAC",
      content: "Finally, a system that actually works for contractors. Simple, powerful, and my team actually uses it.",
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$29",
      period: "per month",
      description: "Perfect for solo contractors",
      features: [
        "Up to 5 active jobs",
        "Basic scheduling",
        "Time tracking",
        "Customer portal",
        "Mobile app access"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$59",
      period: "per month",
      description: "For growing contractor businesses",
      features: [
        "Unlimited jobs",
        "Advanced scheduling",
        "Team management",
        "Custom reports",
        "Priority support",
        "API access"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "per month",
      description: "For large contractor companies",
      features: [
        "Everything in Professional",
        "Advanced analytics",
        "Custom integrations",
        "Dedicated support",
        "White-label options",
        "Advanced security"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <Users className="h-6 w-6" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Easy Contractor</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">MVP Beta</Badge>
              <Link to="/auth">
                <Button variant="outline">Sign In</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Hero Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                Run Your Contracting Business 
                <span className="text-blue-600"> Without the Chaos</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Organize jobs, schedule crews, track time, and manage customers — all from one simple, mobile-friendly platform built specifically for contractors.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                <Badge className="bg-blue-100 text-blue-800">No More Spreadsheets</Badge>
                <Badge className="bg-green-100 text-green-800">Mobile First</Badge>
                <Badge className="bg-purple-100 text-purple-800">Team Friendly</Badge>
                <Badge className="bg-orange-100 text-orange-800">14-Day Free Trial</Badge>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative">
            <div className="bg-white rounded-xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
                <h3 className="text-2xl font-bold mb-4">Today's Schedule</h3>
                <div className="space-y-3">
                  <div className="bg-white/20 rounded p-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Kitchen Remodel - Johnson</span>
                      <Badge className="bg-green-500">In Progress</Badge>
                    </div>
                    <p className="text-sm mt-1">Team: Mike, Sarah | 9:00 AM - 5:00 PM</p>
                  </div>
                  <div className="bg-white/20 rounded p-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Bathroom Plumbing - Davis</span>
                      <Badge className="bg-yellow-500">Scheduled</Badge>
                    </div>
                    <p className="text-sm mt-1">Team: David | 2:00 PM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need to Run Your Business
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From scheduling to invoicing, we've got all the tools contractors need to streamline their operations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4`}>
                      <Icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Contractors Nationwide
            </h2>
            <p className="text-xl text-gray-600">
              See what contractors are saying about Easy Contractor
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that fits your business size. All plans include a 14-day free trial.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`border-2 ${plan.popular ? 'border-blue-500 shadow-xl' : 'border-gray-200'} relative`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white px-4 py-1">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-gray-900 mt-4">
                    {plan.price}
                    <span className="text-lg font-normal text-gray-500">/{plan.period}</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/auth" className="block">
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Streamline Your Contracting Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of contractors who are already saving time and growing their business with Easy Contractor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3">
              Schedule a Demo
            </Button>
          </div>
          <p className="text-sm text-blue-200 mt-4">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-blue-600 text-white p-2 rounded-lg">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold">Easy Contractor</h3>
              </div>
              <p className="text-gray-400">
                The complete business management solution for contractors.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Demo</a></li>
                <li><a href="#" className="hover:text-white">Mobile App</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Training</a></li>
                <li><a href="#" className="hover:text-white">API Docs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Easy Contractor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
