import { useState } from 'react';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';

const faqs = [
  {
    question: 'How does AI trading work?',
    answer:
      'Our platform uses advanced AI algorithms to analyze market data, identify potential trading opportunities, and execute trades on your behalf. The AI learns and adapts to changing market conditions to optimize your trading strategy.',
  },
  {
    question: 'What are the benefits of AI trading?',
    answer:
      'AI trading offers several benefits, including 24/7 market monitoring, emotion-free trading decisions, and the ability to process vast amounts of data in real-time. This can lead to more consistent and potentially higher returns.',
  },
  {
    question: 'Is my investment safe?',
    answer:
      'We prioritize the security of your funds. Our platform uses state-of-the-art security measures, and our AI is designed with risk management protocols to minimize potential losses. However, all trading involves risk, and past performance is not indicative of future results.',
  },
  {
    question: 'Can I customize the AI trading strategy?',
    answer:
      'Currently, our platform offers pre-defined trading strategies based on your risk tolerance. We are working on providing more customization options in the future to allow you to tailor the AI\'s trading parameters to your specific goals.',
  },
];

const InfoFAQ = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
      <div className="px-6 py-4 border-b border-white/10">
        <h2 className="text-2xl font-bold text-white">AI Trading Info & FAQ</h2>
      </div>
      <div className="p-6 space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-white/10 pb-4">
            <button
              onClick={() => toggleFaq(index)}
              className="w-full flex justify-between items-center text-left"
            >
              <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
              {openFaq === index ? (
                <IoChevronUp className="text-purple-400" />
              ) : (
                <IoChevronDown className="text-gray-400" />
              )}
            </button>
            {openFaq === index && (
              <p className="mt-2 text-gray-300">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoFAQ;
