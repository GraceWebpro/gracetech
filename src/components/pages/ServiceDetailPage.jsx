import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { services } from "../data/ServiceData";
import FAQ from "../ui/FAQ";
import { ArrowRight } from "lucide-react";
import { ShieldCheck } from "lucide-react";
import SEO from "../seo/SEO";

const ServiceDetailsPage = () => {
  const { id } = useParams();
  const [serviceDetails, setServiceDetails] = useState(null);
  const [currency, setCurrency] = useState("NGN");

  useEffect(() => {
    const service = services.find((s) => s.id === id);
    setServiceDetails(service);
  }, [id]);

  const USD_TO_NGN = 1500;

  const whatsappNumber = "2347043421913";

const getWhatsAppLink = (plan) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hi, I'm interested in the ${plan.name} plan for your ${serviceDetails.name} service. Can you give me more details?`
  )}`;

  if (!serviceDetails) {
    return <div className="text-white text-center p-20">Service not found</div>;
  }

  return (
    <>
    <SEO
        title={`${serviceDetails.title} | GraceTechie`}
        description={serviceDetails.description}
        url={`https://www.gracetechie.com.ng/services/${serviceDetails.slug}`}
        image={serviceDetails.image}
      />
    <div className="bg-[#0b0b0b] text-white min-h-screen">

      {/* ================= HERO ================= */}
      <div className="max-w-6xl text-center justify-center mx-auto px-6 pt-24 pb-12">
        <p className="text-sm text-primary mb-2 uppercase tracking-wider">
          {serviceDetails.type}
        </p>

        <h1 className="text-4xl md:text-5xl font-bold">
          {serviceDetails.name}
        </h1>

        <p className="text-white/60 text-center mt-4">
          {serviceDetails.description}
        </p>

           <div className="view-work-link">
                        <Link
                            to="/get-a-quote"
                            className="
                                group flex items-center gap-2
                                text-sm font-medium text-white/70
                                hover:text-white transition-colors
                            "
                        >
                            Get custom quote
                            <ArrowRight
                                className="
                                w-4 h-4
                                translate-x-0 group-hover:translate-x-1
                                transition-transform
                                "
                            />
                        </Link>
                    </div>

        {/* <div className="flex text-center gap-4 mt-6">
          <Link
            to="/get-a-quote"
            className="px-6 py-3 bg-primary text-black rounded-xl font-medium"
          >
            Get Started
          </Link>

          <a
            href="#pricing"
            className="px-6 py-3 border border-white/20 rounded-xl text-white/80"
          >
            View Pricing
          </a>
        </div> */}
      </div>

      {/* ================= PRICING ================= */}
      <div id="pricing" className="max-w-6xl mx-auto px-6 py-16">

        <h2 className="text-3xl font-bold text-center mb-6">
          Pricing Packages
        </h2>

        {/* Currency Toggle */}
        <div className="flex justify-center mb-10">
          <div className="bg-white/10 rounded-xl p-1 flex">
            <button
              onClick={() => setCurrency("NGN")}
              className={`px-4 py-2 rounded-lg ${
                currency === "NGN"
                  ? "bg-primary text-black"
                  : "text-white/60"
              }`}
            >
              NGN (₦)
            </button>

            <button
              onClick={() => setCurrency("USD")}
              className={`px-4 py-2 rounded-lg ${
                currency === "USD"
                  ? "bg-primary text-black"
                  : "text-white/60"
              }`}
            >
              USD ($)
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">

        {serviceDetails.pricing?.map((plan, index) => {
          const isPopular = plan.popular;

          return (
            <div
              key={index}
              className={`rounded-2xl p-6 border transition-all duration-300 flex flex-col
                ${
                  isPopular
                    ? "border-primary bg-white/[0.03] scale-105 shadow-[0_0_30px_rgba(125,82,253,0.25)]"
                    : "border-white/10 bg-white/5 hover:border-white/30"
                }`}
            >

              {/* HEADER */}
              <h3 className="uppercase font-semibold">
                {plan.name}
              </h3>

              {/* PRICE */}
              <p className="text-3xl font-bold mt-3">
                {plan.custom ? (
                  "Custom"
                ) : currency === "NGN" ? (
                  <>₦{Number(plan.price * USD_TO_NGN).toLocaleString("en-NG")}</>
                ) : (
                  <>${Number(plan.price).toLocaleString("en-US")}</>
                )}
              </p>
              <p className="text-sm">{plan.month}</p>

              {/* BADGE */}
              {isPopular && (
                <span className="mt-2 text-xs bg-primary text-black px-3 py-1 rounded-full w-fit">
                  Most Popular
                </span>
              )}

              {/* FEATURES */}
              <div className="mt-6 space-y-3 flex-1">
                {plan.features.map((f, i) => (
                  <p key={i} className="text-sm text-white/70">
                    ✔ {f}
                  </p>
                ))}
              </div>

             <div className="mt-6 flex flex-col gap-3">

                {/* REQUEST QUOTE */}
                {plan.custom ? (
                  <Link
                    to="/get-a-quote"
                    className="text-center py-3 rounded-xl font-medium bg-white text-black hover:bg-white/90 transition"
                  >
                    Request Quote
                  </Link>
                ) : null}

                {/* GET STARTED (WHATSAPP) */}
                {!plan.custom && (
                  <a
                    href={getWhatsAppLink(plan)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-center py-3 rounded-xl font-medium transition inline-block
                      ${
                        isPopular
                          ? "bg-primary text-black hover:opacity-90"
                          : "bg-white text-black hover:bg-white/90"
                      }
                    `}
                  >
                    Get Started
                  </a>
                )}

              </div>
            </div>
          );
        })}

        </div>
      </div>

      {/* ================= TRUST STRIP ================= */}
      {/* <div className="bg-white/5 border-y border-white/10 py-6">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 text-center gap-6 text-white/70">
          <p>✔ Fast delivery</p>
          <p>✔ Mobile optimized</p>
          <p>✔ Lifetime support</p>
        </div>
      </div> */}

      <p className="flex items-center justify-center gap-2 text-xs text-white/60 mt-4 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
        <ShieldCheck className="w-4 h-4 text-green-400 mt-[2px]" />

        <span>
          By ordering our services, you agree to our{" "}
          <Link to="/terms" className="underline hover:text-white">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="underline hover:text-white">
            Privacy Policy
          </Link>
        </span>
      </p>

      

      {/* ================= VISUAL ================= */}
      {/* <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold mb-6">
          What you’ll get
        </h2>
      </div> */}

      {/* ================= PROCESS ================= */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold mb-8">
          How it works
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {serviceDetails.process.slice(0, 4).map((step, i) => (
            <div key={i} className="bg-white/5 p-5 rounded-xl">
              <p className="font-medium">
                {step.split("–")[0]}
              </p>
              <p className="text-white/60 text-sm">
                {step.split("–")[1]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= FAQ ================= */}
      {serviceDetails.faq && (
        <div className="max-w-4xl mx-auto px-6 py-16">
          <FAQ items={serviceDetails.faq} />
        </div>
      )}

      {/* ================= FINAL CTA ================= */}
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold mb-4">
        Not sure which pricing plan is right for you?
        </h2>

        <p className="text-white/60 mb-6">
        Let’s talk about your project and find the best solution for your business.
        </p>

        <Link
          to="/contact"
          className="px-8 py-4 mt-4 bg-primary text-white rounded-xl font-semibold"
        >
          Send a Message
        </Link>
      </div>

    </div>
    </>
  );
};

export default ServiceDetailsPage;