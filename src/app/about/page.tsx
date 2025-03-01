// @ts-nocheck
"use client";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

// FAQ data
const faqs = [
  {
    question: "What makes Game Info different from other gaming websites?",
    answer:
      "We combine in-depth analysis with community insights to provide the most comprehensive and accurate gaming information available. Our team consists of industry veterans and passionate gamers committed to quality content.",
  },
  {
    question: "How often is content updated?",
    answer:
      "We update our game guides, reviews, and news daily. For major game releases, we provide real-time updates and immediate post-launch analysis.",
  },
  {
    question: "Can I contribute to Game Info?",
    answer:
      'Absolutely! We welcome community contributions. Check out our "Join Us" page to learn about submitting articles, guides, or joining our team of contributors.',
  },
  {
    question: "Do you cover all gaming platforms?",
    answer:
      "Yes, we provide information on PC, PlayStation, Xbox, Nintendo, mobile gaming, and emerging platforms like VR and cloud gaming services.",
  },
];

export default function About() {
  const [activeTab, setActiveTab] = useState("mission");
  const [expandedFaq, setExpandedFaq] = useState(null);

  return (
    <div className="min-h-screen">
      <Head>
        <title>About Us | Game Info</title>
        <meta
          name="description"
          content="Learn about the Game Info team, our mission, and what makes us the ultimate resource for gamers."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section - Improved padding for mobile */}
      <div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-center mb-4 sm:mb-6">
            About <span className="">Game Info</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 text-center max-w-3xl mx-auto px-2">
            Your ultimate destination for comprehensive gaming information,
            guides, reviews, and community.
          </p>
        </div>
      </div>

      {/* Main Content Tabs - Better spacing and sizing for mobile */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="border-b border-gray-700">
          <nav className="flex space-x-6 sm:space-x-8 overflow-x-auto pb-1 scrollbar-hide">
            {["mission", "faq"].map((tab) => (
              <button
                key={tab}
                className={`pb-3 sm:pb-4 px-1 border-b-2 font-medium text-sm md:text-base capitalize whitespace-nowrap ${
                  activeTab === tab
                    ? "border-neutral-500 text-neutral-300"
                    : "border-transparent text-neutral-400"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-6 sm:mt-10">
          {/* Mission & Values */}
          {activeTab === "mission" && (
            <div className="space-y-8 sm:space-y-12">
              <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
                    Our Mission
                  </h2>
                  <p className="text-sm sm:text-base mb-4 sm:mb-6">
                    At Game Info, we're on a mission to empower gamers with
                    accurate, comprehensive, and accessible information. We
                    believe that gaming is more than just entertainment—it's a
                    passion, a community, and for many, a way of life.
                  </p>
                  <p className="text-sm sm:text-base md:text-lg">
                    Whether you're looking for detailed guides to overcome
                    challenging game sections, honest reviews to inform your
                    next purchase, or news about upcoming releases, we're
                    dedicated to being your trusted resource in the gaming
                    world.
                  </p>
                </div>
                <div className="mt-6 lg:mt-0">
                  <div className="rounded-lg flex items-center justify-center">
                    <img
                      src="/images/all.jpeg"
                      alt="images"
                      className="object-cover rounded-lg border border-neutral-700 w-full h-auto"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
                  Our Values
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                  {[
                    {
                      title: "Accuracy",
                      description:
                        "We verify all information before publishing to ensure you get reliable gaming data.",
                      icon: "📊",
                    },
                    {
                      title: "Community",
                      description:
                        "We foster an inclusive environment where all gamers can connect and share experiences.",
                      icon: "🤝",
                    },
                    {
                      title: "Passion",
                      description:
                        "Our team consists of dedicated gamers who truly understand and care about gaming culture.",
                      icon: "❤️",
                    },
                    {
                      title: "Transparency",
                      description:
                        "We maintain ethical standards in our reviews and are open about our evaluation process.",
                      icon: "🔍",
                    },
                    {
                      title: "Innovation",
                      description:
                        "We continually improve our platform to deliver gaming information in the most effective ways.",
                      icon: "💡",
                    },
                    {
                      title: "Accessibility",
                      description:
                        "We strive to make gaming information available and understandable to players of all levels.",
                      icon: "🌐",
                    },
                  ].map((value, index) => (
                    <div
                      key={index}
                      className="bg-neutral-900 p-4 sm:p-6 rounded-lg"
                    >
                      <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">
                        {value.icon}
                      </div>
                      <h3 className="text-md font-bold mb-2">{value.title}</h3>
                      <p className="text-gray-300 text-xs sm:text-sm">
                        {value.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* FAQ - Improved for mobile */}
          {activeTab === "faq" && (
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-10">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-neutral-700 rounded-lg"
                  >
                    <button
                      className="flex justify-between items-center w-full px-4 sm:px-6 py-3 sm:py-4 text-left"
                      onClick={() =>
                        setExpandedFaq(expandedFaq === index ? null : index)
                      }
                    >
                      <span className="text-xs sm:text-sm font-medium pr-2">
                        {faq.question}
                      </span>
                      <svg
                        className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 transform transition-transform ${
                          expandedFaq === index ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {expandedFaq === index && (
                      <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-700">
                        <p className="text-gray-300 text-xs sm:text-sm">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Get Started - Better mobile spacing */}
        <div className="mt-8 sm:mt-12 bg-neutral-900 rounded-lg p-5 sm:p-8 text-center">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
            Ready to start exploring the world of gaming?
          </h3>
          <p className="text-gray-200 text-sm sm:text-base mb-4 sm:mb-6">
            Join our community of gamers, learn from the experts, and discover
            new experiences with our free, unbiased platform.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md bg-neutral-800 hover:bg-neutral-700"
          >
            Get started now
          </Link>
        </div>
      </div>
    </div>
  );
}
