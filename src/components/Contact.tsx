import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, ShieldCheck, X, Sparkles, Smile } from 'lucide-react';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  subject: z.string().min(3, 'Subject must be at least 3 characters.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

export default function Contact() {
  // Form values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; subject?: string; message?: string }>({});

  const validateField = (field: 'name' | 'email' | 'subject' | 'message', value: string) => {
    const rawForm = { name, email, subject, message, [field]: value };
    const result = contactSchema.safeParse(rawForm);
    if (result.success) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    } else {
      const fieldError = result.error.issues.find(err => err.path[0] === field);
      setErrors(prev => ({ ...prev, [field]: fieldError ? fieldError.message : undefined }));
    }
  };

  // Live Chat values
  const [chatOpen, setChatOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ sender: 'user' | 'bot'; text: string; time: string }[]>([
    { sender: 'bot', text: 'Hi! Welcome to the Smart Trash Can IoT portal. I’m your automation assistant. How can I help you optimize waste collection today?', time: 'Just now' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse({ name, email, subject, message });
    if (!result.success) {
      const formattedErrors: { name?: string; email?: string; subject?: string; message?: string } = {};
      result.error.issues.forEach(err => {
        const pathStr = err.path[0] as 'name' | 'email' | 'subject' | 'message';
        formattedErrors[pathStr] = err.message;
      });
      setErrors(formattedErrors);
      setFormError('Please correct the validation errors in the fields below.');
      return;
    }

    setErrors({});
    setFormError('');
    setFormSubmitted(true);
    // Reset values
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  const handleChatSend = () => {
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add User Message
    setChatHistory(prev => [...prev, { sender: 'user', text: userMsg, time: nowStr }]);
    setChatInput('');
    setIsBotTyping(true);

    // Simulate Bot response after 1 second
    setTimeout(() => {
      let botResponse = '';
      const lower = userMsg.toLowerCase();

      if (lower.includes('price') || lower.includes('pricing') || lower.includes('cost') || lower.includes('rp')) {
        botResponse = 'Our plans start at Rp 50,000/month for 1 smart bin. The Professional Plan is Rp 500,000/month for 20 devices. We also offer custom Smart City bulk enterprise packages with pricing tailored to hardware integration requirements!';
      } else if (lower.includes('sensor') || lower.includes('work') || lower.includes('battery') || lower.includes('hardware')) {
        botResponse = 'Our Smart Trash Can uses advanced ultrasonic ranging sensors to accurately check the fill percentage. It connects over standard 4G LTE-M / NB-IoT bands and possesses a custom long-life LiSOCl2 battery that lasts up to 5 years!';
      } else if (lower.includes('trial') || lower.includes('free') || lower.includes('sign')) {
        botResponse = 'Signing up is free! Select the "Start Free Trial" button in the navigation bar to launch your mock cloud dashboard and get 14 days of complimentary Professional access.';
      } else if (lower.includes('jakarta') || lower.includes('address') || lower.includes('office') || lower.includes('location')) {
        botResponse = 'Our central headquarters is located at Nusantara Tower Level 24, Jl. Sudirman No. 8, Central Jakarta, Indonesia. Feel free to stop by or schedule a live IoT physical hardware demonstration!';
      } else {
        botResponse = 'Thanks for your query! That is a great question. You can submit our contact form on the left, and an enterprise systems account manager will email you within 2 business hours.';
      }

      setChatHistory(prev => [...prev, { sender: 'bot', text: botResponse, time: nowStr }]);
      setIsBotTyping(false);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 bg-gray-50/50 scroll-mt-12 text-left relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page title line */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs uppercase font-mono tracking-widest text-blue-600 font-bold bg-blue-50 px-2.5 py-1 rounded-md">
            Get In Touch
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Consult With Our Waste Management Professionals
          </h2>
          <p className="text-gray-600">
            Have questions about sensor specifications, municipal pricing, API integrations, or scheduling a live hardware demonstration? Send us a message below.
          </p>
        </div>

        {/* core container layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Traditional Address info cards & Stylized Maps mock (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-6">
              <h3 className="font-sans font-bold text-xl text-slate-900">Nusantara Offices &amp; Engineering</h3>
              
              <div className="space-y-4">
                <div className="flex gap-3.5 items-start">
                  <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-400 font-mono tracking-wider font-semibold uppercase">CENTRAL HEADQUARTERS</span>
                    <p className="text-sm text-gray-700 font-medium">Nusantara IoT Tower, 24th Floor</p>
                    <p className="text-xs text-gray-500 mt-0.5">Jl. Jenderal Sudirman Kav. 8, Central Jakarta, Indonesia 10220</p>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start">
                  <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-400 font-mono tracking-wider font-semibold uppercase">EMAIL CHANNELS</span>
                    <p className="text-sm text-gray-700 font-medium">support@smarttrashcan.com</p>
                    <p className="text-xs text-gray-500 mt-0.5">General &amp; Technical: operations@smartcity-can.id</p>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start">
                  <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-400 font-mono tracking-wider font-semibold uppercase">TELEPHONE HOTLINE</span>
                    <p className="text-sm text-gray-700 font-medium">+62 (21) 500-1177</p>
                    <p className="text-xs text-gray-500 mt-0.5">Mon - Fri, 09:00 - 18:00 (Jakarta Time UTC+7)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Google Map with custom visual overlays */}
            <div className="bg-white border border-gray-100 rounded-2xl p-4 flex-1 flex flex-col justify-between overflow-hidden shadow-xs relative min-h-[220px]">
              
              <div className="absolute top-2 left-2 z-10 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-gray-100 text-[10px] font-bold font-mono text-gray-700 shadow-sm">
                📌 GEOLOCATION: DJAKARTA CENTRAL METROPOLIS
              </div>

              {/* Styled Abstract SVG Map representation (highly elegant, lightweight map mockup) */}
              <div className="w-full h-full min-h-[160px] bg-slate-50 border border-dashed border-gray-200 rounded-xl relative overflow-hidden flex-1 flex items-center justify-center">
                
                {/* SVG map visual lines */}
                <svg className="absolute inset-0 w-full h-full stroke-gray-200 fill-none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="100%" height="100%" fill="#F1F5F9" />
                  {/* Grid Lines */}
                  <line x1="10%" y1="0" x2="10%" y2="100%" stroke="#E2E8F0" strokeWidth="1" />
                  <line x1="30%" y1="0" x2="30%" y2="100%" stroke="#E2E8F0" strokeWidth="1" />
                  <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#E2E8F0" strokeWidth="1" />
                  <line x1="70%" y1="0" x2="70%" y2="100%" stroke="#E2E8F0" strokeWidth="1" />
                  <line x1="90%" y1="0" x2="90%" y2="100%" stroke="#E2E8F0" strokeWidth="1" />
                  <line x1="0" y1="20%" x2="100%" y2="20%" stroke="#E2E8F0" strokeWidth="1" />
                  <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#E2E8F0" strokeWidth="1" />
                  <line x1="0" y1="80%" x2="100%" y2="80%" stroke="#E2E8F0" strokeWidth="1" />

                  {/* Primary Sudirman avenue */}
                  <path d="M -50 40 L 450 180" stroke="#CBD5E1" strokeWidth="24" strokeLinecap="round" />
                  <path d="M 120 -50 L 260 250" stroke="#CBD5E1" strokeWidth="18" strokeLinecap="round" />
                  <path d="M -50 40 L 450 180" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
                </svg>

                {/* Animated Smart Bin Hotspots indicating city nodes */}
                <div className="absolute top-[35%] left-[25%] flex flex-col items-center">
                  <span className="w-3 h-3 bg-red-500 rounded-full animate-ping absolute" />
                  <span className="w-3.5 h-3.5 bg-red-600 rounded-full border-2 border-white flex items-center justify-center text-[7px] text-white font-bold shadow-md">
                    1
                  </span>
                  <span className="bg-gray-900 border border-gray-800 text-[8px] text-white font-mono px-1 rounded-sm mt-1 scale-90">
                    City Hall (99%)
                  </span>
                </div>

                <div className="absolute top-[65%] left-[60%] flex flex-col items-center">
                  <span className="w-3 h-3 bg-blue-500 rounded-full animate-ping absolute" />
                  <span className="w-3.5 h-3.5 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center text-[7px] text-white font-bold shadow-md">
                    2
                  </span>
                  <span className="bg-gray-900 border border-gray-800 text-[8px] text-white font-mono px-1 rounded-sm mt-1 scale-90">
                    Nusantara Office (24%)
                  </span>
                </div>

                {/* Centered Nusantara Headquarters marker */}
                <div className="absolute top-[48%] left-[48%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                  <div className="p-2 bg-blue-600 text-white rounded-full shadow-lg border-2 border-white scale-110">
                    <MapPin className="w-5 h-5 animate-bounce" />
                  </div>
                  <span className="bg-blue-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm mt-1 shadow-md">
                    HQ Nusantara Tower
                  </span>
                </div>

              </div>

              {/* Embed click instructions */}
              <div className="pt-2 text-center">
                <span className="text-[10px] text-gray-400 font-sans">
                  * Live cellular telemetry streams routed through Central Jakarta gateway network node.
                </span>
              </div>

            </div>

          </div>

          {/* Right Column: Contact Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between">
            <h3 className="font-sans font-bold text-xl text-slate-900 mb-6 font-semibold">Send an Online Message</h3>
            
            {formSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto text-xl">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-lg text-slate-900">Message Dispatched Successfully!</h4>
                <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                  Thank you for contacting Smart Trash Can. Our regional sales team has received your packet. We will review your requirements and respond at <strong>{email || 'your email'}</strong> within 2 business hours.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-705 rounded-lg text-xs font-semibold hover:bg-slate-200 transition-all cursor-pointer"
                >
                  Write Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                {formError && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 font-semibold">
                    ⚠️ {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-500 font-mono uppercase tracking-wider">Your Full Name</label>
                    <input
                      type="text"
                      className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all ${
                        errors.name ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-blue-500'
                      }`}
                      placeholder="e.g. Ir. Budi"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        validateField('name', e.target.value);
                      }}
                    />
                    {errors.name && (
                      <p className="text-[10px] text-red-500 font-semibold font-sans mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-500 font-mono uppercase tracking-wider">Business Email Address</label>
                    <input
                      type="email"
                      className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all ${
                        errors.email ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-blue-500'
                      }`}
                      placeholder="e.g. budias@company.id"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        validateField('email', e.target.value);
                      }}
                    />
                    {errors.email && (
                      <p className="text-[10px] text-red-500 font-semibold font-sans mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-500 font-mono uppercase tracking-wider">Subject Matter</label>
                  <input
                    type="text"
                    className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all ${
                      errors.subject ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-blue-500'
                    }`}
                    placeholder="e.g. Smart City program trial inquiry"
                    value={subject}
                    onChange={(e) => {
                      setSubject(e.target.value);
                      validateField('subject', e.target.value);
                    }}
                  />
                  {errors.subject && (
                    <p className="text-[10px] text-red-500 font-semibold font-sans mt-1">{errors.subject}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-500 font-mono uppercase tracking-wider">Detailed Message Requirements</label>
                  <textarea
                    rows={4}
                    className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all ${
                      errors.message ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-blue-500'
                    }`}
                    placeholder="Indicate your number of active facilities, estimated trash bin counts, recycling priorities, and location specifications..."
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      validateField('message', e.target.value);
                    }}
                  />
                  {errors.message && (
                    <p className="text-[10px] text-red-500 font-semibold font-sans mt-1">{errors.message}</p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="group px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm shadow-md hover:shadow-lg transition-all w-full flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Submit Inquiry Form</span>
                    <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </form>
            )}

            {/* Quick trust metrics for support */}
            <div className="border-t border-slate-50 pt-4 mt-6 text-xs text-slate-400 flex items-center justify-between font-mono">
              <span>🔒 256-bit Form Encryption</span>
              <span className="text-[10px] text-blue-600 font-bold">Responds within 2 hours</span>
            </div>
          </div>

        </div>
      </div>

      {/* FLOATING LIVE CHAT WIDGET */}
      <div className="fixed bottom-6 right-6 z-40">
        {!chatOpen ? (
          <button
            onClick={() => setChatOpen(true)}
            b-id="livechat-trigger"
            className="p-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border-2 border-white cursor-pointer relative"
          >
            <MessageSquare className="w-6 h-6" />
            <span className="text-sm font-semibold pr-1 hidden sm:inline">Live Chat Assistance</span>
            <span className="absolute -top-1 -right-1 block h-3.5 w-3.5 rounded-full bg-red-500 text-[8px] flex items-center justify-center border-2 border-white text-white font-bold">1</span>
          </button>
        ) : (
          <div className="w-80 sm:w-96 bg-white border border-slate-205 rounded-2xl shadow-2xl overflow-hidden flex flex-col justify-between max-h-[450px]">
            
            {/* Header portion */}
            <div className="bg-blue-600 text-white p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-left">
                <div className="p-1 bg-white/10 rounded-lg">
                  <Sparkles className="w-4 h-4 text-blue-300 animate-spin" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm leading-none">Smarty Can Assist</h4>
                  <p className="text-[9px] text-blue-200 mt-1 font-mono tracking-wider font-bold">CLOUDY IOT CHIP ASSISTANT</p>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="p-1 text-blue-200 hover:text-white rounded-lg transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Message streams panel */}
            <div className="bg-slate-50 flex-1 p-3.5 space-y-3.5 overflow-y-auto max-h-64 flex flex-col">
              {chatHistory.map((item, index) => (
                <div
                  key={index}
                  className={`max-w-[85%] text-xs p-3 rounded-2xl ${
                    item.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none self-end text-right'
                      : 'bg-white border border-slate-150 text-slate-700 rounded-tl-none self-start text-left shadow-sm'
                  }`}
                >
                  <p className=" leading-relaxed">{item.text}</p>
                  <span className={`text-[8px] block mt-1 font-mono ${
                    item.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                  }`}>
                    {item.time}
                  </span>
                </div>
              ))}
              {isBotTyping && (
                <div className="bg-white border border-slate-150 text-slate-500 rounded-2xl rounded-tl-none max-w-[50%] text-xs p-3 self-start text-left flex gap-1 items-center font-mono shadow-sm">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
            </div>

            {/* Predefined prompt questions helper pills */}
            <div className="px-3 py-1.5 border-t border-slate-150 bg-white flex flex-wrap gap-1">
              <button
                onClick={() => { setChatInput('How much does it cost?'); }}
                className="text-[9px] bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full transition-all cursor-pointer"
              >
                Pricing?
              </button>
              <button
                onClick={() => { setChatInput('What sensor technology is used?'); }}
                className="text-[9px] bg-slate-100 hover:bg-slate-205 text-slate-600 px-2 py-0.5 rounded-full transition-all cursor-pointer"
              >
                Ultrasonic Sensors?
              </button>
              <button
                onClick={() => { setChatInput('Where is your Jakarta office located?'); }}
                className="text-[9px] bg-slate-100 hover:bg-slate-150 text-slate-600 px-2 py-0.5 rounded-full transition-all cursor-pointer"
              >
                Office Address?
              </button>
            </div>

            {/* Footer input tray */}
            <div className="p-2 border-t border-slate-100 bg-white flex items-center gap-1">
              <input
                type="text"
                placeholder="Ask smarty anything..."
                className="flex-1 px-3 py-2 text-xs focus:outline-none bg-slate-50 rounded-xl"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleChatSend(); }}
              />
              <button
                onClick={handleChatSend}
                className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all cursor-pointer"
              >
                <Smile className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}
      </div>

    </section>
  );
}
