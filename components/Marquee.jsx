export default function Marquee() {
  const text =
    "अभिनयं • Natya • Nritta • Nritya • Abhinaya • Tala • Laya • Rasa • ";
  return (
    <div className="bg-maroon-dark py-4 overflow-hidden">
      <div className="marquee-track animate-marquee">
        <span className="font-heading italic text-gold-light/90 text-lg sm:text-xl px-4 whitespace-nowrap">
          {text.repeat(6)}
        </span>
        <span className="font-heading italic text-gold-light/90 text-lg sm:text-xl px-4 whitespace-nowrap">
          {text.repeat(6)}
        </span>
      </div>
    </div>
  );
}
