import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicyPage = () => {
    return (
        <div className="pt-[80px] md:pt-[90px] px-4 md:px-8 lg:px-10">
            <div className="xl:my-4 font-Quicksand">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb:1 md:mb-4 text-center animate__animated animate__bounceInDown">Privacy Policy</h1>
                <p className="text-gray-500 mb-4 text-center text-[10px] md:text-xs animate__animated animate__fadeInUp">By <Link to='/' className='text-idl-green'>!DealMart </Link><span className='text-gray-300'>•</span> 1 Aug 2024 <span className='text-gray-300'>•</span> 8 mins read</p>

                <section className="mb-4 md:mb-8 animate__animated animate__fadeInUp">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 md:mb-4">Welcome to !DealMart's Privacy Policy</h2>
                    <p className="text-gray-600 leading-relaxed text-xs md:text-sm">
                        !DealMart is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and
                        share information about you when you use our services. By using our app, you agree to this policy.
                    </p>
                </section>

                <section className="mb-4 md:mb-8 animate__animated animate__fadeInUp">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 md:mb-4">The Type of Personal Information We Collect</h2>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 text-xs md:text-sm">
                        <li><strong>Directly from you:</strong> Name, address, email, phone number, payment information, etc.</li>
                        <li><strong>Automatically:</strong> Usage details, IP address, device information, location data, cookies, etc.</li>
                        <li><strong>From third parties:</strong> Social media accounts, marketing partners, etc.</li>
                    </ul>
                </section>

                <section className="mb-4 md:mb-8 animate__animated animate__fadeInUp">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 md:mb-4">How We Use Personal Information</h2>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 text-xs md:text-sm">
                        <li>Provide, improve, and personalize our services</li>
                        <li>Process transactions and send notifications</li>
                        <li>Respond to inquiries and provide customer support</li>
                        <li>Conduct research and analysis</li>
                        <li>Send marketing communications (with your consent)</li>
                        <li>Ensure security and prevent fraud</li>
                    </ul>
                </section>

                <section className="mb-4 md:mb-8 animate__animated animate__fadeInUp">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 md:mb-4">How We Share Your Information</h2>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 text-xs md:text-sm">
                        <li>Subsidiaries and affiliates</li>
                        <li>Service providers and business partners</li>
                        <li>Legal authorities, if required</li>
                        <li>In the event of a business transfer (e.g., merger, sale)</li>
                    </ul>
                </section>

                <section className="mb-4 md:mb-8 animate__animated animate__fadeInUp">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 md:mb-4">Your Choices</h2>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 text-xs md:text-sm">
                        <li>Manage your communication preferences</li>
                        <li>Request deletion of your account and data</li>
                        <li>Access, update, or correct your information</li>
                    </ul>
                </section>

                <section className="mb-4 md:mb-8 animate__animated animate__fadeInUp">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 md:mb-4">Security</h2>
                    <p className="text-gray-600 leading-relaxed text-xs md:text-sm">
                        We use industry-standard measures to protect your information but cannot guarantee absolute security. You
                        are responsible for keeping your account credentials secure.
                    </p>
                </section>

                <section className="mb-4 md:mb-8 animate__animated animate__fadeInUp">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 md:mb-4">Changes to This Policy</h2>
                    <p className="text-gray-600 leading-relaxed text-xs md:text-sm">
                        We may update this policy periodically. Continued use of our services after changes indicates acceptance of
                        the new terms.
                    </p>
                </section>

                <section className="mb-4 md:mb-8 animate__animated animate__fadeInUp">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 md:mb-4">Contact Us</h2>
                    <p className="text-gray-600 leading-relaxed text-xs md:text-sm">
                        For questions or concerns, contact our Data Protection Officer (DPO) at <a href="mailto:privacy@idealmart.com"
                            className="text-idl-green underline">privacy@idealmart.com</a>.
                    </p>
                </section>
            </div>
        </div>

    );
}

export default PrivacyPolicyPage