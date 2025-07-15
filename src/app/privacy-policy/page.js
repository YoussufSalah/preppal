import React from 'react';
import { Shield, FileText, Lock, Eye, Mail, Calendar, Users, Database } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
  

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-2xl mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your privacy matters to us. Learn how we collect, use, and protect your information when you use PrepPal.
          </p>
          <div className="mt-6 inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Effective Date: January 15, 2025</span>
          </div>
        </div>

        {/* Privacy Policy Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="p-8 md:p-12">
            {/* Introduction */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <FileText className="w-5 h-5 text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Our Commitment to Privacy</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                At <strong className="text-blue-600">PrepPal</strong>, we are committed to protecting your privacy and ensuring transparency about how we handle your data. This Privacy Policy explains our practices regarding the collection, use, and protection of your information when you use our AI-powered study platform.
              </p>
            </div>

            {/* Information We Collect */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                  <Database className="w-5 h-5 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
              </div>
              
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Information</h3>
                  <p className="text-gray-600 mb-3">
                    When you create an account with PrepPal, we collect basic information necessary to provide our services:
                  </p>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Your name and email address for account creation</li>
                    <li>• Login credentials (securely encrypted)</li>
                    <li>• Profile preferences and settings</li>
                    <li>• Communication preferences</li>
                  </ul>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Content You Upload</h3>
                  <p className="text-gray-600 mb-3">
                    PrepPal processes the educational content you upload to generate AI-powered study materials:
                  </p>
                  <ul className="text-gray-600 space-y-1">
                    <li>• PDF documents and other study materials</li>
                    <li>• Text content for processing</li>
                    <li>• Generated summaries, flashcards, and quizzes</li>
                  </ul>
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>Important:</strong> We do not permanently store your original files. Our AI processes your content to generate study materials, but the original documents are not retained on our servers.
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-orange-500 pl-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Usage Analytics</h3>
                  <p className="text-gray-600 mb-3">
                    We collect non-personal information to improve our services and user experience:
                  </p>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Device type and operating system</li>
                    <li>• Browser information and version</li>
                    <li>• App usage patterns and feature interactions</li>
                    <li>• Performance metrics and error logs</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                  <Users className="w-5 h-5 text-purple-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Delivery</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Generate AI-powered summaries and study materials</li>
                    <li>• Create personalized flashcards and quizzes</li>
                    <li>• Provide account management and user support</li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Improvement</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Enhance AI algorithms and accuracy</li>
                    <li>• Improve user interface and experience</li>
                    <li>• Develop new features and capabilities</li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Communication</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Send important updates and announcements</li>
                    <li>• Respond to your inquiries and support requests</li>
                    <li>• Provide educational tips and best practices</li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Security & Compliance</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Prevent unauthorized access and misuse</li>
                    <li>• Ensure platform security and integrity</li>
                    <li>• Comply with legal requirements</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Protection */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                  <Lock className="w-5 h-5 text-red-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">How We Protect Your Information</h2>
              </div>
              
              <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-xl mb-6">
                <p className="text-gray-700 leading-relaxed">
                  We implement industry-standard security measures to protect your personal data from unauthorized access, disclosure, alteration, or destruction. Our security practices include:
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Data Encryption</h3>
                  <p className="text-sm text-gray-600">All data is encrypted in transit and at rest using advanced encryption protocols.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Access Controls</h3>
                  <p className="text-sm text-gray-600">Strict access controls ensure only authorized personnel can access your data.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Regular Monitoring</h3>
                  <p className="text-sm text-gray-600">Continuous monitoring and security audits to identify and address potential threats.</p>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center mr-4">
                  <Eye className="w-5 h-5 text-yellow-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Your Rights and Choices</h2>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl">
                <p className="text-gray-700 mb-4">
                  You have control over your personal information and how it&apos;s used. Your rights include:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Access & Portability</h3>
                    <p className="text-sm text-gray-600">Request access to your personal data and export your study materials at any time.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Correction & Updates</h3>
                    <p className="text-sm text-gray-600">Update or correct your account information and preferences through your profile settings.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Account Deletion</h3>
                    <p className="text-sm text-gray-600">Delete your account and associated data at any time from your account settings.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Communication Preferences</h3>
                    <p className="text-sm text-gray-600">Opt-out of non-essential communications while maintaining important security notifications.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Policy Updates */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center mr-4">
                  <Calendar className="w-5 h-5 text-indigo-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Changes to This Policy</h2>
              </div>
              
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl">
                <p className="text-gray-700 leading-relaxed">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. When we make significant changes, we will notify you through email or by posting a notice on our platform. We encourage you to review this policy periodically to stay informed about how we protect your information.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-2xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Questions or Concerns?</h2>
              </div>
              <p className="text-blue-100 mb-6 leading-relaxed">
                If you have any questions about this Privacy Policy, need assistance with your account, or want to exercise your privacy rights, we&apos;re here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  Contact Privacy Team
                </button>
                <button className="border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                  Support Center
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>

     
    </div>
  );
};

export default PrivacyPolicy;