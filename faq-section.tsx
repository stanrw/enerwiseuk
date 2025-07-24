import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FaqSection() {
  const faqs = [
    {
      question: "How much can I save with solar panels?",
      answer: "Solar savings vary based on your location, energy usage, and system size. Most UK homeowners save between £600-£1,200 annually on electricity bills. With current energy prices, payback periods are typically 7-10 years."
    },
    {
      question: "Do I need planning permission for solar panels?",
      answer: "Most residential solar installations fall under permitted development rights and don't require planning permission. However, there may be restrictions for listed buildings or conservation areas."
    },
    {
      question: "What happens if my solar panels produce more energy than I use?",
      answer: "Excess energy is fed back into the grid through the Smart Export Guarantee (SEG), earning you money for each unit exported. You can also store excess energy in a battery system for later use."
    },
    {
      question: "How long do solar panels last?",
      answer: "Solar panels typically come with 25-year warranties and can last 30+ years. They gradually lose efficiency over time, usually about 0.5% per year, but continue producing significant energy well beyond their warranty period."
    },
    {
      question: "Are heat pumps suitable for all homes?",
      answer: "Heat pumps work best in well-insulated homes. Air source heat pumps are suitable for most properties, while ground source heat pumps require adequate outdoor space. A professional assessment can determine the best option for your home."
    },
    {
      question: "What government grants are available?",
      answer: "The UK government offers various grants including the Boiler Upgrade Scheme for heat pumps (up to £7,500), ECO4 scheme for eligible households, and local authority grants. VAT is also reduced to 0% on energy-saving installations."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">
            Get answers to common questions about renewable energy solutions
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg border">
              <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 hover:bg-gray-50">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
