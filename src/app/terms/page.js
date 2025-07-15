import React from "react";
import {
    FileText,
    Scale,
    Shield,
    AlertTriangle,
    Users,
    Gavel,
    CheckCircle,
    XCircle,
    Mail,
    Calendar,
} from "lucide-react";

const TermsOfUse = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-2xl mb-6">
                        <Scale className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Terms and Conditions
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        These Terms and Conditions govern your use of PrepPal.
                        By using our platform, you agree to these terms.
                    </p>
                    <div className="mt-6 inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">
                            Effective Date: January 15, 2025
                        </span>
                    </div>
                </div>

                {/* Terms Content */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                    <div className="p-8 md:p-12">
                        {/* Introduction */}
                        <div className="mb-12">
                            <div className="flex items-center mb-6">
                                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                                    <CheckCircle className="w-5 h-5 text-blue-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Agreement to Terms
                                </h2>
                            </div>
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
                                <p className="text-gray-700 leading-relaxed">
                                    These Terms of Use constitute a legally
                                    binding agreement between you (the
                                    &quot;User&quot;) and PrepPal (owned and
                                    operated by Youssuf).
                                </p>
                            </div>
                        </div>

                        {/* Service Description */}
                        <section className="mb-12">
                            <div className="flex items-center mb-6">
                                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                                    <FileText className="w-5 h-5 text-green-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Use of the Service
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="border-l-4 border-green-500 pl-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        What PrepPal Offers
                                    </h3>
                                    <p className="text-gray-600 mb-3">
                                        PrepPal is an AI-powered educational
                                        platform that transforms your study
                                        materials into interactive learning
                                        tools:
                                    </p>
                                    <ul className="text-gray-600 space-y-1">
                                        <li>
                                            • AI-generated summaries from
                                            uploaded PDFs and documents
                                        </li>
                                        <li>
                                            • Personalized flashcards based on
                                            your content
                                        </li>
                                        <li>
                                            • Interactive quizzes and practice
                                            tests
                                        </li>
                                        <li>
                                            • Study progress tracking and
                                            analytics
                                        </li>
                                        <li>
                                            • Cross-platform synchronization
                                        </li>
                                    </ul>
                                </div>

                                <div className="border-l-4 border-blue-500 pl-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        Your Responsibilities
                                    </h3>
                                    <p className="text-gray-600 mb-3">
                                        When using PrepPal, you agree to:
                                    </p>
                                    <ul className="text-gray-600 space-y-1">
                                        <li>
                                            • Use the service lawfully and in
                                            accordance with these terms
                                        </li>
                                        <li>
                                            • Provide accurate account
                                            information and keep it updated
                                        </li>
                                        <li>
                                            • Respect intellectual property
                                            rights of others
                                        </li>
                                        <li>
                                            • Use the platform for educational
                                            purposes only
                                        </li>
                                        <li>
                                            • Maintain the confidentiality of
                                            your account credentials
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* User Content */}
                        <section className="mb-12">
                            <div className="flex items-center mb-6">
                                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                                    <Users className="w-5 h-5 text-purple-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    User Content and Ownership
                                </h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                        Your Content Rights
                                    </h3>
                                    <ul className="text-gray-600 space-y-2">
                                        <li>
                                            • You retain full ownership of all
                                            materials you upload
                                        </li>
                                        <li>
                                            • PrepPal does not claim ownership
                                            of your content
                                        </li>
                                        <li>
                                            • You can delete your content at any
                                            time
                                        </li>
                                        <li>
                                            • Export your generated study
                                            materials anytime
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                        License to Process
                                    </h3>
                                    <ul className="text-gray-600 space-y-2">
                                        <li>
                                            • You grant us permission to process
                                            your content
                                        </li>
                                        <li>
                                            • Processing is limited to providing
                                            our services
                                        </li>
                                        <li>
                                            • We use your content to generate
                                            summaries and quizzes
                                        </li>
                                        <li>
                                            • Original files are not permanently
                                            stored
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <div className="flex items-center">
                                    <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
                                    <p className="text-sm text-yellow-800">
                                        <strong>Important:</strong> You are
                                        responsible for ensuring you have the
                                        right to upload and process any content
                                        you submit to PrepPal. Do not upload
                                        copyrighted materials without proper
                                        authorization.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Restrictions */}
                        <section className="mb-12">
                            <div className="flex items-center mb-6">
                                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                                    <XCircle className="w-5 h-5 text-red-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Prohibited Activities
                                </h2>
                            </div>

                            <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-xl mb-6">
                                <p className="text-gray-700 mb-4">
                                    To maintain a safe and productive
                                    environment for all users, you agree not to
                                    engage in the following activities:
                                </p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="border border-red-200 rounded-lg p-6">
                                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                                        <AlertTriangle className="w-5 h-5 text-red-500" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">
                                        Harmful Content
                                    </h3>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        <li>
                                            • Illegal, offensive, or harmful
                                            materials
                                        </li>
                                        <li>• Malicious software or viruses</li>
                                        <li>
                                            • Hate speech or discriminatory
                                            content
                                        </li>
                                        <li>
                                            • Content that violates others&apos;
                                            rights
                                        </li>
                                    </ul>
                                </div>

                                <div className="border border-orange-200 rounded-lg p-6">
                                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                                        <Shield className="w-5 h-5 text-orange-500" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">
                                        System Interference
                                    </h3>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        <li>
                                            • Hacking or unauthorized access
                                            attempts
                                        </li>
                                        <li>
                                            • Disrupting service functionality
                                        </li>
                                        <li>
                                            • Reverse engineering our technology
                                        </li>
                                        <li>
                                            • Automated data collection
                                            (scraping)
                                        </li>
                                    </ul>
                                </div>

                                <div className="border border-purple-200 rounded-lg p-6">
                                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                        <Users className="w-5 h-5 text-purple-500" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">
                                        Account Misuse
                                    </h3>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        <li>
                                            • Creating multiple accounts to
                                            circumvent limits
                                        </li>
                                        <li>• Sharing account credentials</li>
                                        <li>• Impersonating others</li>
                                        <li>
                                            • Commercial use without
                                            authorization
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Disclaimer */}
                        <section className="mb-12">
                            <div className="flex items-center mb-6">
                                <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center mr-4">
                                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Service Disclaimer
                                </h2>
                            </div>

                            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-2">
                                            AI-Generated Content
                                        </h3>
                                        <p className="text-gray-700">
                                            PrepPal uses artificial intelligence
                                            to generate study materials. While
                                            we strive for accuracy, AI-generated
                                            content may contain errors,
                                            omissions, or inaccuracies. You
                                            should always verify important
                                            information and use our materials as
                                            supplementary study aids.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-2">
                                            Educational Purpose
                                        </h3>
                                        <p className="text-gray-700">
                                            Our service is designed for
                                            educational purposes only. PrepPal
                                            does not guarantee academic success,
                                            test performance, or educational
                                            outcomes. Your learning success
                                            depends on various factors beyond
                                            our control.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-2">
                                            Service Availability
                                        </h3>
                                        <p className="text-gray-700">
                                            We strive to maintain high service
                                            availability but cannot guarantee
                                            uninterrupted access. PrepPal may
                                            experience downtime for maintenance,
                                            updates, or technical issues.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Limitation of Liability */}
                        <section className="mb-12">
                            <div className="flex items-center mb-6">
                                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center mr-4">
                                    <Scale className="w-5 h-5 text-indigo-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Limitation of Liability
                                </h2>
                            </div>

                            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl">
                                <div className="space-y-4">
                                    <p className="text-gray-700">
                                        To the fullest extent permitted by law,
                                        PrepPal and its affiliates shall not be
                                        liable for any indirect, incidental,
                                        special, consequential, or punitive
                                        damages arising from or related to your
                                        use of our service, including but not
                                        limited to:
                                    </p>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <ul className="text-gray-700 space-y-2">
                                            <li>
                                                • Loss of data or study
                                                materials
                                            </li>
                                            <li>
                                                • Academic or professional
                                                consequences
                                            </li>
                                            <li>
                                                • Business interruption or lost
                                                profits
                                            </li>
                                            <li>
                                                • Emotional distress or
                                                reputational harm
                                            </li>
                                        </ul>
                                        <ul className="text-gray-700 space-y-2">
                                            <li>
                                                • Technical malfunctions or
                                                errors
                                            </li>
                                            <li>
                                                • Unauthorized access to your
                                                account
                                            </li>
                                            <li>
                                                • Third-party actions or content
                                            </li>
                                            <li>
                                                • Service interruptions or
                                                downtime
                                            </li>
                                        </ul>
                                    </div>

                                    <p className="text-gray-700">
                                        Our total liability for any claims
                                        arising from these terms or your use of
                                        PrepPal shall not exceed the amount you
                                        paid for our service in the 12 months
                                        preceding the claim.
                                    </p>
                                </div>
                            </div>
                        </section>
                        {/* Refund Policy */}
                        <section className="mb-12">
                            <div className="flex items-center mb-6">
                                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center mr-4">
                                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Refund Policy
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl">
                                    <p className="text-blue-500 mb-6 leading-relaxed">
                                        We offer a 14 day refund window for all purchases. 
                                        Refunds are handled by Paddle, our payment provider.
                                        Refunds are granted at Paddle&apos;s sole discretion and may be refused in cases of fraud,
                                        abuse, or manipulative behavior. Paddle may also counterclaim a refund if misuse is detected.
                                        For refund requests, please refer to your Paddle receipt or contact us 
                                    </p>
                                </div>
                                {/* Existing refund policy content remains unchanged */}
                            </div>
                        </section>

                        <section className="mb-12">
                            <div className="flex items-center mb-6">
                                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                                    <Scale className="w-5 h-5 text-blue-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Payment Processor
                                </h2>
                            </div>
                            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl">
                                <p className="text-gray-700 leading-relaxed">
                                    All purchases and subscriptions on PrepPal
                                    are processed by Paddle.com, our Merchant of
                                    Record. Paddle handles payment processing,
                                    billing, taxes, and compliance.
                                </p>
                            </div>
                        </section>

                        {/* Termination */}
                        <section className="mb-12">
                            <div className="flex items-center mb-6">
                                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mr-4">
                                    <Gavel className="w-5 h-5 text-gray-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Account Termination
                                </h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                        Your Rights
                                    </h3>
                                    <ul className="text-gray-600 space-y-2">
                                        <li>
                                            • You may terminate your account at
                                            any time
                                        </li>
                                        <li>
                                            • Export your data before account
                                            deletion
                                        </li>
                                        <li>
                                            • Cancel subscriptions through
                                            account settings
                                        </li>
                                        <li>
                                            • Request account deletion via
                                            support
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                        Our Rights
                                    </h3>
                                    <ul className="text-gray-600 space-y-2">
                                        <li>
                                            • Suspend accounts for terms
                                            violations
                                        </li>
                                        <li>
                                            • Terminate accounts for repeated
                                            violations
                                        </li>
                                        <li>
                                            • Remove content that violates our
                                            policies
                                        </li>
                                        <li>
                                            • Discontinue service with
                                            reasonable notice
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                                <p className="text-sm text-orange-800">
                                    <strong>Effect of Termination:</strong> Upon
                                    termination, your access to PrepPal will
                                    cease immediately. You remain liable for any
                                    charges incurred before termination, and
                                    certain provisions of these terms will
                                    survive termination.
                                </p>
                            </div>
                        </section>

                        {/* Updates and Changes */}
                        <section className="mb-12">
                            <div className="flex items-center mb-6">
                                <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center mr-4">
                                    <Calendar className="w-5 h-5 text-teal-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Changes to Terms
                                </h2>
                            </div>

                            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-xl">
                                <p className="text-gray-700 leading-relaxed">
                                    We may update these Terms of Use from time
                                    to time to reflect changes in our service,
                                    legal requirements, or business practices.
                                    When we make material changes, we will
                                    notify you by email or through our platform
                                    at least 30 days before the changes take
                                    effect. Your continued use of PrepPal after
                                    the effective date constitutes acceptance of
                                    the updated terms.
                                </p>
                            </div>
                        </section>

                        {/* Contact Information */}
                        <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-2xl">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                                    <Mail className="w-6 h-6 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold">
                                    Questions About These Terms?
                                </h2>
                            </div>
                            <p className="text-blue-100 mb-6 leading-relaxed">
                                If you have any questions about these Terms of
                                Use, need clarification on any provisions, or
                                want to report a violation, please don&apos;t
                                hesitate to contact us.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                                    Contact Legal Team
                                </button>
                                <button className="border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                                    Report Violation
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TermsOfUse;
