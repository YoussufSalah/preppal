import React from "react";
import {
    Shield,
    FileText,
    Lock,
    Eye,
    Mail,
    Calendar,
    Users,
    Database,
} from "lucide-react";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-2xl mb-6">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Your privacy matters to us. Learn how we collect, use,
                        and protect your information when you use PrepPal.
                    </p>
                    <div className="mt-6 inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">
                            Effective Date: January 15, 2025
                        </span>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                    <div className="p-8 md:p-12">
                        <section className="mb-12">
                            <div className="flex items-center mb-6">
                                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                                    <FileText className="w-5 h-5 text-blue-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Our Commitment to Privacy
                                </h2>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                At{" "}
                                <strong className="text-blue-600">
                                    PrepPal
                                </strong>
                                , owned and operated by Youssuf, we value your
                                privacy. This Privacy Policy explains what
                                personal information we collect, how we use it,
                                and how we keep it safe.
                            </p>
                        </section>

                        <section className="mb-12">
                            <div className="flex items-center mb-6">
                                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                                    <Database className="w-5 h-5 text-green-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Information We Collect
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="border-l-4 border-blue-500 pl-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        Personal Information
                                    </h3>
                                    <ul className="text-gray-600 space-y-1">
                                        <li>
                                            • Name and email address for account
                                            setup
                                        </li>
                                        <li>• Login credentials (encrypted)</li>
                                        <li>
                                            • Account preferences and
                                            communication settings
                                        </li>
                                    </ul>
                                </div>

                                <div className="border-l-4 border-purple-500 pl-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        User-Generated Content
                                    </h3>
                                    <p className="text-gray-600 mb-3">
                                        You upload study content (PDFs, notes)
                                        to use our services. We process this
                                        data to create summaries, flashcards,
                                        and quizzes.
                                    </p>
                                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                                        <p className="text-sm text-blue-700">
                                            <strong>Note:</strong> We do not
                                            store original files long-term. They
                                            are used for processing only.
                                        </p>
                                    </div>
                                </div>

                                <div className="border-l-4 border-orange-500 pl-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        Usage Analytics
                                    </h3>
                                    <p className="text-gray-600 mb-3">
                                        To improve PrepPal, we collect
                                        anonymized technical data like:
                                    </p>
                                    <ul className="text-gray-600 space-y-1">
                                        <li>• Device/browser type</li>
                                        <li>• Pages visited and time spent</li>
                                        <li>• Crash/error logs</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section className="mb-12">
                            <div className="flex items-center mb-6">
                                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                                    <Users className="w-5 h-5 text-purple-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    How We Use Your Information
                                </h2>
                            </div>

                            <ul className="text-gray-700 space-y-2 pl-4 list-disc">
                                <li>
                                    Provide and personalize PrepPal features
                                </li>
                                <li>
                                    Improve system performance and AI results
                                </li>
                                <li>
                                    Send relevant updates (with your permission)
                                </li>
                                <li>Maintain security and prevent misuse</li>
                            </ul>
                        </section>

                        <section className="mb-12">
                            <div className="flex items-center mb-6">
                                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                                    <Lock className="w-5 h-5 text-red-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Data Security
                                </h2>
                            </div>

                            <p className="text-gray-700 mb-6">
                                We use encryption, access controls, and security
                                monitoring to protect your information. However,
                                no system is 100% secure, so we recommend
                                safeguarding your login credentials.
                            </p>
                        </section>

                        <section className="mb-12">
                            <div className="flex items-center mb-6">
                                <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center mr-4">
                                    <Eye className="w-5 h-5 text-yellow-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Your Rights
                                </h2>
                            </div>

                            <ul className="text-gray-700 pl-4 list-disc space-y-2">
                                <li>View or update your profile data</li>
                                <li>Request account deletion at any time</li>
                                <li>Export your study content</li>
                                <li>Control your communication preferences</li>
                            </ul>
                        </section>

                        <section className="mb-12">
                            <div className="flex items-center mb-6">
                                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center mr-4">
                                    <Calendar className="w-5 h-5 text-indigo-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Policy Updates
                                </h2>
                            </div>
                            <p className="text-gray-700">
                                We may revise this policy periodically. If
                                changes are significant, we will notify you by
                                email or platform notice.
                            </p>
                        </section>

                        <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-2xl">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                                    <Mail className="w-6 h-6 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold">
                                    Have Questions?
                                </h2>
                            </div>
                            <p className="text-blue-100 mb-6 leading-relaxed">
                                If you have questions about this Privacy Policy,
                                please contact us at:{" "}
                                <strong>support@preppal-ai.xyz</strong>
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                                    Email Us
                                </button>
                                <button className="border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                                    Help Center
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
