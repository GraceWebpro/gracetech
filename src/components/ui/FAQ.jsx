const FAQ = ({ items }) => {
    return (
      <div className="mt-16">
        <h3 className="text-2xl font-medium text-white mb-6">
          Frequently Asked Questions
        </h3>
  
        <div className="space-y-4">
          {items.map((faq, index) => (
            <details
              key={index}
              className="group bg-white/5 border border-white/10 rounded-xl p-2"
            >
              <summary className="cursor-pointer text-white font-medium flex justify-between items-center" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                {faq.question}
                <span className="text-primary group-open:rotate-45 transition text-xl">
                  +
                </span>
              </summary>
  
              <p className="text-white/60 mt-3 text-sm leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    );
  };
  
  export default FAQ;
  