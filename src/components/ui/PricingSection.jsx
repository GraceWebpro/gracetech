import React from "react";
import { Link } from "react-router-dom";

const PricingSection = ({ service }) => {
  if (!service?.pricing) return null;

  return (
    <section className="py-20 px-6 bg-[#0b0b0b] text-white">
      <div className="max-w-6xl mx-auto text-center">

        {/* ===== TITLE ===== */}
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Choose Your Package
        </h2>
        <p className="text-white/60 max-w-xl mx-auto mb-14">
          Flexible pricing designed for different business needs. Start small or go all in.
        </p>

        {/* ===== CARDS ===== */}
        <div className="grid md:grid-cols-3 gap-8">

          {service.pricing.map((plan, i) => (
            <div
              key={i}
              className={`
                relative rounded-3xl p-8 border transition-all duration-300 flex flex-col

                ${
                  plan.popular
                    ? "border-primary bg-gradient-to-b from-primary/10 to-transparent scale-[1.03] shadow-[0_0_40px_rgba(125,82,253,0.25)]"
                    : "border-white/10 bg-white/5 hover:border-white/30"
                }
              `}
            >

              {/* 🔥 POPULAR BADGE */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-black text-xs font-semibold px-4 py-1 rounded-full shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              {/* ===== PLAN NAME ===== */}
              <h3 className="text-lg font-medium mb-4">
                {plan.name}
              </h3>

              {/* ===== PRICE ===== */}
              <div className="mb-6">
                {plan.custom ? (
                  <span className="text-3xl font-bold">Custom</span>
                ) : (
                  <>
                    <span className="text-3xl font-bold">
                      ₦{plan.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-white/50"> /project</span>
                  </>
                )}
              </div>

              {/* ===== FEATURES ===== */}
              <ul className="space-y-3 text-sm text-white/70 mb-8 text-left">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex gap-2 items-start">
                    <span className="text-primary">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* ===== CTA ===== */}
              <div className="mt-auto">
                {plan.custom ? (
                  <Link
                    to="/get-a-quote"
                    className="block text-center py-3 rounded-xl border border-primary text-primary hover:bg-primary hover:text-black transition"
                  >
                    Get Custom Quote
                  </Link>
                ) : (
                  <Link
                    to="/get-a-quote"
                    className={`
                      block text-center py-3 rounded-xl font-semibold transition
                      ${
                        plan.popular
                          ? "bg-primary text-black hover:opacity-90"
                          : "bg-white text-black hover:bg-white/90"
                      }
                    `}
                  >
                    Get Started
                  </Link>
                )}
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default PricingSection;