import React from 'react';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
  const valueProps = [
    {
      icon: "🔄",
      title: "Return Policy",
      description: "Purchasing from select family farmers who farm organically."
    },
    {
      icon: "🌿",
      title: "100% Fresh",
      description: "Purchasing from select family farmers who farm organically."
    },
    {
      icon: "🎧",
      title: "Support 24/7",
      description: "Purchasing from select family farmers who farm organically."
    },
    {
      icon: "🛡️",
      title: "Secured Payment",
      description: "Purchasing from select family farmers who farm organically."
    }
  ];

  return (
    <section className="why-choose-us">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Section - Value Propositions */}
          <div className="relative">
            <div className="absolute inset-0 bg-green-100 rounded-3xl transform rotate-3 scale-105 opacity-20"></div>
            <div className="grid grid-cols-2 gap-6 relative z-10">
              {valueProps.map((prop, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <span className="text-white text-xl">{prop.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">
                    {prop.title}
                  </h3>
                  <p className="text-sm text-gray-600 text-center leading-relaxed">
                    {prop.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Company Information */}
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-green-600 text-lg font-medium">
                ~ Why Choose us?
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
                We do not buy from the open market & traders.
              </h2>
            </div>
            
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Purchasing from select family farmers who farm organically because they believe in it and so we do. We are conscious of air miles and our carbon footprint so a lot of our produce comes from Egypt.
              </p>
              <p>
                Organic Foods and Café is a family run company that runs organic super markets and cafés selling fresh organic and biodynamic food, supplers, skincare, cosmetics, baby items and household cleaning products. We have 5 shops in Dubai - on Sheikh Zayed Road.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
