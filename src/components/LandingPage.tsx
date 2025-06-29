'use client';

import { Truck, Shield, Clock, Users, MapPin, Star, ArrowRight, Phone, Mail, Globe } from 'lucide-react';
import { companyInfo } from '@/lib/enhanced-demo-data';
import Link from 'next/link';
import Image from 'next/image';
import QuoteEstimator from '@/components/QuoteEstimator';

interface LandingPageProps {
  onSignIn: () => void;
}

export default function LandingPage({ onSignIn }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="mr-3">
                <Image
                  src="/Deluxe_logo.png"
                  alt="Deluxe Transport Logo"
                  width={48}
                  height={48}
                  className="h-12 w-auto"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{companyInfo.name}</h1>
                <p className="text-sm text-gray-600">{companyInfo.tagline}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/sign-up" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                Sign Up
              </Link>
              <button 
                onClick={onSignIn}
                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-20 overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/Deluxe_Hero.png"
            alt="Deluxe Transport Fleet"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/60"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <Image
                  src="/Deluxe_logo.png"
                  alt="Deluxe Transport Logo"
                  width={120}
                  height={120}
                  className="h-24 w-auto mb-4"
                />
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Reliable Transportation Solutions
              </h1>
              <p className="text-xl mb-8 text-gray-200 leading-relaxed">
                {companyInfo.mission}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={onSignIn}
                  className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Access Fleet Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Learn More
                </button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">{companyInfo.fleetSize}</div>
                    <div className="text-sm text-gray-200">Trucks in Fleet</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">{companyInfo.employees}</div>
                    <div className="text-sm text-gray-200">Team Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">{new Date().getFullYear() - companyInfo.established}</div>
                    <div className="text-sm text-gray-200">Years of Service</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">24/7</div>
                    <div className="text-sm text-gray-200">Support Available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive transportation and logistics solutions designed to meet your business needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companyInfo.specializations.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="bg-red-100 p-3 rounded-lg w-fit mb-4">
                  <Truck className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service}</h3>
                <p className="text-gray-600">
                  Professional {service.toLowerCase()} services with real-time tracking and dedicated support.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Deluxe Transport?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Safety First</h3>
              <p className="text-gray-600">Industry-leading safety standards and compliance protocols</p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">On-Time Delivery</h3>
              <p className="text-gray-600">91% on-time delivery rate with real-time tracking</p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Team</h3>
              <p className="text-gray-600">Experienced drivers and logistics professionals</p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Nationwide Coverage</h3>
              <p className="text-gray-600">Service across all 48 continental United States</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Deluxe Transport</h2>
              <p className="text-lg text-gray-600 mb-6">
                Established in {companyInfo.established}, Deluxe Transport has been a trusted leader in the transportation 
                and logistics industry for over {new Date().getFullYear() - companyInfo.established} years. We pride ourselves on delivering 
                exceptional service while maintaining the highest standards of safety and professionalism.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="text-2xl font-bold text-red-600">DOT #{companyInfo.dotNumber}</div>
                  <div className="text-sm text-gray-600">Department of Transportation</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">{companyInfo.mcNumber}</div>
                  <div className="text-sm text-gray-600">Motor Carrier Number</div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">Certifications:</h3>
                <div className="flex flex-wrap gap-2">
                  {companyInfo.certifications.map((cert, index) => (
                    <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-red-600 mr-3" />
                  <span className="text-gray-700">{companyInfo.headquarters}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-red-600 mr-3" />
                  <span className="text-gray-700">1-800-DELUXE-1</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-red-600 mr-3" />
                  <span className="text-gray-700">info@deluxetransport.com</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-red-600 mr-3" />
                  <span className="text-gray-700">www.deluxetransport.com</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Our Values</h4>
                <div className="space-y-2">
                  {companyInfo.values.map((value, index) => (
                    <div key={index} className="flex items-center">
                      <Star className="h-4 w-4 text-red-600 mr-2" />
                      <span className="text-sm text-gray-700">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Calculator Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get an Instant Quote</h2>
            <p className="text-lg text-gray-600">
              Calculate shipping costs instantly with our advanced pricing engine
            </p>
          </div>
          <QuoteEstimator />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-red-100 mb-8">
            Join our fleet management platform and experience the Deluxe Transport difference
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onSignIn}
              className="bg-white text-red-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
            >
              Access Dashboard
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-red-700 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="mr-3">
                  <Image
                    src="/Deluxe_logo.png"
                    alt="Deluxe Transport Logo"
                    width={40}
                    height={40}
                    className="h-10 w-auto"
                  />
                </div>
                <div>
                  <h3 className="font-bold">{companyInfo.name}</h3>
                  <p className="text-sm text-gray-400">{companyInfo.tagline}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Your trusted partner in transportation and logistics since {companyInfo.established}.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {companyInfo.specializations.slice(0, 3).map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Safety</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Compliance</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 {companyInfo.name}. All rights reserved. DOT #{companyInfo.dotNumber} | {companyInfo.mcNumber}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}