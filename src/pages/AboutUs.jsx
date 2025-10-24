import React from 'react';
import AboutImg from '@/assets/about-img/l1.png';
import TeamMember1 from '@/assets/about-img/shailendra-mann-ceo.jpg';
// import TeamMember2 from '@/assets/team/member2.png';
// import TeamMember3 from '@/assets/team/member3.png';
// import TeamMember4 from '@/assets/team/member4.png';
// import TeamMember5 from '@/assets/team/member5.png';

import { FaLinkedin, FaInstagram, FaEnvelope, FaTwitter } from "react-icons/fa6";

const CardData = [
    {
        heading: 'Who we are',
        body: 'At !DealMart, we are tech entrepreneurs with a mission to make grocery shopping more affordable for Canadians, particularly in the South Asian community. We understand that small desi businesses struggle to compete with the marketing power and digital reach of big-box retailers like Walmart. That’s why we created !DealMart—to empower these stores with a platform that connects them with customers seeking quality, culturally relevant products at the best prices. Our goal is to level the playing field, driving value for both shoppers and small businesses.'
    },
    {
        heading: 'Our Vision',
        body: 'We strive to save you money on groceries, a necessity that has become increasingly expensive. By making groceries more affordable, we aim to enhance the quality of life for our customers across Canada.'
    },
    {
        heading: 'Our mission',
        body: 'At !DealMart, we are dedicated to bringing you the best deals from your favorite local desi stores. Our platform connects you with a variety of products at prices that make everyday shopping affordable.'
    },
];

const teamData = [
    {
        name: "Shailendra Mann",
        designation: "Founder & CEO",
        description: "Shailendra is a visionary entrepreneur with strategic acumen blended with excellence in execution. With a rich background in technology and leadership, Shailendra is dedicated to transforming the grocery savings landscape through innovation and data-driven insights. Leveraging extensive experience in strategic growth and product development, he co-founded !DealMart to empower the South Asian community with accessible, culturally tailored savings solutions. Passionate about bridging technology and community impact, Shailendra aims to redefine grocery shopping with seamless, cost-saving, and connected experiences.",
        image: TeamMember1,
    },
    {
        name: "Suri Boorela",
        designation: "CTO",
        description: "Suri is a technology leader with over 2 decades of expertise in technology strategy and system architecture. With a strong foundation in scalable solutions and complex data management, he leads !DealMart’s tech innovation, ensuring the platform is robust, intuitive, and secure. Driven by a passion for leveraging technology to enhance everyday experiences, Suri is dedicated to building solutions that empower the South Asian community with seamless access to savings and culturally tailored grocery and food options.",
        image: 'https://tamilnaducouncil.ac.in/wp-content/uploads/2020/04/dummy-avatar.jpg',
    },
    {
        name: "Prabhjeet S. Garewal",
        designation: "COO",
        description: "Operations expert ensuring flawless execution, pioneered Ontario's First South Asian Directory “East West Connections (EWC) Business Pages” From year 1991 to 2016. “EWC” was on their coffee table directory for every South Asian household. “EWC” was For and By The South Asians residing in Ontario. We integrated the South Asian community together then. Launched the first online South Asian grocery store “East West Bazaar” in 2003 serving North America.",
        image: 'https://tamilnaducouncil.ac.in/wp-content/uploads/2020/04/dummy-avatar.jpg',
    },
    {
        name: "Jassimar Singh",
        designation: "CMO",
        description: "assimar brings hands-on leadership experience in B2B sales and direct marketing, coupled with a deep understanding of the South Asian community. A recognized name in social media influencing, he has successfully engaged and inspired diverse audiences with his relatable content and authentic approach. At !DealMart, Jassimar leverages his expertise to build strategic partnerships, drive community engagement, and create impactful marketing strategies that resonate with the South Asian demographic, ensuring the platform's growth and cultural relevance.",
        image: 'https://tamilnaducouncil.ac.in/wp-content/uploads/2020/04/dummy-avatar.jpg',
    },
];

const AboutUs = () => {
    return (
        <div className="pt-[80px] md:pt-[70px] xl:pt-[90px] px-4 md:px-8 lg:px-10">
            <div className="flex flex-col gap-10 font-Quicksand">

                {/* -----About company------ */}
                {/* upper Content */}
                <div className="grid md:grid-cols-2 gap-3 md:gap-6 xl:gap-0 pt-2 md:pt-6">
                    <span className="w-full flex justify-center items-center">
                        <img
                            className="w-full xl:w-9/12 rounded-lg shadow-xl transform transition-all duration-700 ease-in-out hover:scale-105 hover:rotate-1"
                            src={AboutImg}
                            alt="About image"
                        />
                    </span>
                    <span className="flex flex-col items-center justify-center text-center md:text-left">
                        <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 md:mb-4 text-[#253d4e] animate__animated animate__fadeInUp">
                            Welcome to <span className="text-idl-green">!DealMart</span>
                        </h1>
                        <p
                            className="text-xs md:text-sm xl:text-base text-gray-600 md:p-4 animate__animated animate__fadeInUp animate__delay-1s"
                            style={{ textAlign: "justify", lineHeight: "1.6", textJustify: "inter-word", hyphens: "auto" }}
                        >
                            Welcome to !DealMart, where your grocery shopping meets incredible savings, every day. We're thrilled to have you here and excited to help you explore the vibrant tastes of your local desi markets without stretching your budget.<br /><br />
                            At !DealMart, our focus is on helping you save on quality groceries. We've partnered with the best desi stores in Canada to bring you unbeatable deals on the products you love. Whether you're preparing a family meal or stocking up on essentials, !DealMart connects you with the best prices from your favorite local stores. Unlike other platforms, our mission is to help you stretch your budget without compromising on quality. Start exploring today and see how much you can save!
                        </p>
                    </span>
                </div>

                {/* Lower Content */}
                <div className="grid lg:grid-cols-3 gap-4 md:gap-8 md:mt-12 animate__animated animate__fadeInUp animate__delay-2s">
                    {CardData.map(({ heading, body }) => {
                        return (
                            <span className="border p-4 rounded-xl transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:bg-green-50">
                                <h1 className="text-2xl lg:text-3xl font-bold mb-1 md:mb-3 text-[#253d4e]">{heading}</h1>
                                <p className="text-xs md:text-sm text-gray-600">{body}</p>
                            </span>
                        );
                    })}
                </div>

                {/* Team details */}
                <div className="mb-12">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-center text-[#253d4e] animate__animated animate__fadeInUp pb-8 border-b">
                        Meet Our Team
                    </h1>
                    <div className="flex flex-col gap-6 md:gap-8 px-4 md:px-6 lg:px-8">
                        {teamData.map(({ name, designation, description, image }, index) => (
                            <div
                                key={name}
                                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-3 md:gap-6 rounded-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:bg-green-50 p-2 md:p-4`}
                            >
                                <img
                                    src={image}
                                    alt={name}
                                    className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full shadow-lg object-cover transition-all duration-300 ease-in-out transform hover:scale-105"
                                />
                                <div className="text-center md:text-left flex-1">
                                    <h2 className="text-xl lg:text-2xl font-bold text-[#253d4e]">{name}</h2>
                                    <p className="text-md lg:text-lg text-idl-green font-semibold">{designation}</p>
                                    <p
                                        className="text-xs md:text-sm lg:text-base text-gray-600 mt-1 md:mt-4"
                                        style={{ textAlign: "justify", lineHeight: "1.6", textJustify: "inter-word", hyphens: "auto" }}
                                    >
                                        {description}
                                    </p>
                                    <div className="mt-4 flex justify-center gap-4 text-sm md:text-base lg:text-lg text-[#275f61]">
                                        <FaLinkedin className="hover:text-[#0077b5] transition-all" />
                                        <FaInstagram className="hover:text-[#e4405f] transition-all" />
                                        <FaEnvelope className="hover:text-[#d44638] transition-all" />
                                        <FaTwitter className="hover:text-[#00acee] transition-all" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;