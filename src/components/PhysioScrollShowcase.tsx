import { Smartphone, Headset, ShieldCheck } from "lucide-react";
import { Reveal } from "@/hooks/useScrollReveal";

const steps = [
  {
    icon: Smartphone,
    title: "User Friendly Booking",
    description: "Easily schedule your physiotherapy session through our website or a quick WhatsApp message. Choose a time that suits you best.",
    color: "hsl(210, 100%, 70%)", // Light Blue
  },
  {
    icon: Headset,
    title: "Best Support",
    description: "Our dedicated team is always ready to assist you. We prioritize clear communication and compassionate care every step of the way.",
    color: "hsl(210, 100%, 70%)", // Light Blue
  },
  {
    icon: ShieldCheck,
    title: "Secure & Reliable",
    description: "Your health and privacy are our top priorities. Trust in our certified professionals to deliver safe, effective treatments at your home.",
    color: "hsl(210, 100%, 70%)", // Light Blue
  },
];

const PhysioScrollShowcase = () => {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden bg-[#11131a]">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column - Image with Circle background */}
          <Reveal direction="right" duration={900} distance={50}>
            <div className="relative flex justify-center lg:justify-end lg:pr-10">
              {/* Large Circle Background */}
              <div className="absolute top-1/2 left-1/2 lg:left-2/3 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[450px] sm:h-[450px] rounded-full bg-gradient-to-tr from-[#3a2b71] to-[#6a4cff] blur-xl opacity-90" />
              
              {/* Phone Mockup */}
              <div className="relative z-10 w-[260px] sm:w-[300px] h-[550px] sm:h-[620px] rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden shadow-2xl border-[10px] border-[#222533] bg-[#1a1c26] transition-transform duration-500 flex flex-col">
                
                {/* Phone Notch */}
                <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-20">
                  <div className="w-32 h-6 bg-[#222533] rounded-b-xl flex items-center justify-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
                    <div className="w-10 h-1.5 rounded-full bg-gray-600"></div>
                  </div>
                </div>

                {/* Mockup Screen Content */}
                <div className="flex-1 overflow-hidden pt-8 pb-4 px-4 flex flex-col gap-4 relative">
                  
                  {/* Mock App Header */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="w-6 h-1 bg-gray-500 rounded-full" />
                    <div className="text-white text-xs font-semibold">Dashboard</div>
                    <div className="w-6 h-6 rounded-full bg-gray-700" />
                  </div>

                  {/* Mock Card */}
                  <div className="w-full h-40 rounded-2xl bg-gradient-to-br from-[#1b1c3b] to-[#0a0a1a] border border-gray-800 p-4 relative overflow-hidden shadow-lg mt-4">
                    <div className="text-white font-bold text-lg mb-6 relative z-10 flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-blue-500 flex items-center justify-center text-[10px]">EPC</div>
                      Expert Physio
                    </div>
                    <div className="text-gray-400 font-mono tracking-widest text-sm relative z-10">**** **** **** 1234</div>
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-600 rounded-full blur-2xl opacity-20" />
                  </div>

                  {/* Mock Stats/Menu */}
                  <div className="flex gap-4 mt-2">
                    <div className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full border-[3px] border-blue-500 border-t-transparent" />
                      <div className="w-10 h-2 bg-gray-700 rounded-full" />
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full border-[3px] border-purple-500 border-l-transparent" />
                      <div className="w-10 h-2 bg-gray-700 rounded-full" />
                    </div>
                  </div>

                  {/* Mock List */}
                  <div className="bg-[#222533] rounded-2xl p-4 mt-4 flex-1">
                    <div className="w-16 h-2 bg-gray-600 rounded-full mb-4" />
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-700" />
                        <div className="w-20 h-2 bg-gray-600 rounded-full" />
                      </div>
                      <div className="w-10 h-2 bg-green-500 rounded-full" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-700" />
                        <div className="w-24 h-2 bg-gray-600 rounded-full" />
                      </div>
                      <div className="w-10 h-2 bg-red-500 rounded-full" />
                    </div>
                  </div>

                  {/* Bottom Nav */}
                  <div className="flex justify-around items-center pt-2 mt-auto border-t border-gray-800">
                    <div className="w-6 h-6 bg-blue-500 rounded-md" />
                    <div className="w-6 h-6 bg-gray-700 rounded-md" />
                    <div className="w-6 h-6 bg-gray-700 rounded-md" />
                    <div className="w-6 h-6 bg-gray-700 rounded-md" />
                  </div>
                </div>
              </div>

              {/* Floating dark card behind */}
              <div className="absolute top-1/4 right-[70%] w-[180px] h-[260px] bg-[#1a1c26] rounded-2xl border border-gray-800 shadow-xl transform -rotate-12 -z-10 opacity-80 blur-[1px]" />
            </div>
          </Reveal>

          {/* Right Column - Steps */}
          <Reveal direction="left" duration={900} distance={50}>
            <div className="lg:pl-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight font-sans">
                Manage Everything in <br className="hidden sm:block"/> Your Hand
              </h2>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-12 max-w-lg font-sans">
                You can manage your account right from the palm of your hands with your mobile app. Save unnecessary cost and enjoy mobility in grand style.
              </p>

              <div className="space-y-10">
                {steps.map((step, index) => (
                  <div key={index} className="flex gap-6 group">
                    {/* Icon Circle */}
                    <div className="flex-shrink-0 relative flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-[#1b2341] flex items-center justify-center relative z-10 transition-transform duration-300 group-hover:scale-110">
                        <step.icon className="w-7 h-7 text-[#7b8cff]" />
                      </div>
                      {/* Glow effect behind icon */}
                      <div className="absolute inset-0 rounded-full bg-[#4a5cff] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                    </div>
                    
                    {/* Text content */}
                    <div>
                      <h3 className="text-[1.1rem] font-semibold text-[#7b8cff] mb-2 font-sans">{step.title}</h3>
                      <p className="text-gray-400 text-[0.9rem] leading-relaxed max-w-sm font-sans">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default PhysioScrollShowcase;
