import Link from "next/link";

export const Hero = () => {
  return (
    <section className="relative w-full h-[40vh]">
      <div
        className="absolute inset-0 bg-cover bg-center scale-x-[-1]"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      />

      <div className="absolute inset-0 bg-black/65" />

      <div className="relative z-10 max-w-6xl mx-auto py-20 px-8 text-white flex flex-col justify-center h-full">
        <h1 className="text-6xl md:text-8xl font-display mb-8">
          SUPPORTING ARTISTS
          <br />
          <span className="text-indigo-400">ONE RECORD AT A TIME</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl">
          We're more than just a marketplace for second-hand band merchandise.
          We're a platform that puts artists first, giving back 85% of all
          profits directly to the musicians who create the music we love.
        </p>
      </div>
    </section>
  );
};

export const Mission = () => {
  return (
    <section className="py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-display mb-6 text-black">
              OUR MISSION
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              In a world where streaming services pay fractions of a penny per
              play, we believe artists deserve better. That's why we've built a
              marketplace that doesn't just sell your favorite band's
              merchandise – it actively supports their livelihood.
            </p>
            <p className="text-lg text-gray-700">
              Every CD, vinyl record, t-shirt, and piece of memorabilia you
              purchase through our platform directly funds the artists you love,
              ensuring they can continue creating the music that moves us all.
            </p>
          </div>
          <div className="bg-indigo-400 p-8 rounded-lg">
            <h3 className="text-3xl font-bold text-white mb-4">
              85% PROFIT SHARING
            </h3>
            <p className="text-white text-lg">
              Unlike traditional marketplaces that keep most of the profit, we
              ensure artists receive the majority of every sale. This isn't just
              business – it's our commitment to supporting the music community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const ProfitSharing = () => {
  return (
    <section className="bg-white py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-display text-center mb-16 text-black">
          HOW IT WORKS
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              1
            </div>
            <h3 className="text-2xl font-bold mb-4 text-black">DISCOVER</h3>
            <p className="text-gray-700">
              Browse our curated collection of second-hand band merchandise,
              CDs, and vinyl records. Read our articles to discover new music
              and learn about your favorite artists.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              2
            </div>
            <h3 className="text-2xl font-bold mb-4 text-black">PURCHASE</h3>
            <p className="text-gray-700">
              When you buy from our shop, you're not just getting amazing
              merchandise – you're directly supporting the artists who created
              it.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              3
            </div>
            <h3 className="text-2xl font-bold mb-4 text-black">SUPPORT</h3>
            <p className="text-gray-700">
              85% of every purchase goes directly back to the artist, helping
              them continue creating the music you love.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const ProblemSolution = () => {
  return (
    <section className="py-20 px-8 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-3xl font-bold text-black mb-6">THE PROBLEM</h3>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-500 mr-3">×</span>
                Artists receive less than 1% from streaming platforms
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-3">×</span>
                Traditional marketplaces keep 15-30% of every sale
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-3">×</span>
                Second-hand sales provide no benefit to original artists
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-3">×</span>
                Music industry profits rarely reach the creators
              </li>
            </ul>
          </div>
          <div className="bg-indigo-400 p-8 rounded-lg shadow-lg">
            <h3 className="text-3xl font-bold text-white mb-6">OUR SOLUTION</h3>
            <ul className="space-y-4 text-black">
              <li className="flex items-start">
                <span className="text-green-600 mr-3">✓</span>
                Artists receive 85% of every sale on our platform
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-3">✓</span>
                Even second-hand sales benefit the original artists
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-3">✓</span>
                Transparent profit sharing with every purchase
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-3">✓</span>
                Building a sustainable ecosystem for musicians
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export const CallToAction = () => {
  return (
    <section className="bg-black text-white py-20 px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl font-display mb-8">
          READY TO SUPPORT ARTISTS?
        </h2>
        <p className="text-xl text-gray-300 mb-12">
          Browse our collection of second-hand band merchandise, CDs, and vinyl
          records. Every purchase makes a real difference in supporting the
          artists you love.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            href="/shop"
            className="bg-indigo-400 px-8 py-4 rounded-lg text-lg font-bold hover:bg-indigo-300 transition-colors text-white"
          >
            SHOP NOW
          </Link>
          <Link
            href="/articles"
            className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-white hover:text-black transition-colors"
          >
            READ ARTICLES
          </Link>
        </div>
      </div>
    </section>
  );
};

export const Stats = () => {
  return (
    <section className="py-20 px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-display text-center mb-16 text-black">
          IMPACT BY THE NUMBERS
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-6xl font-bold text-indigo-400 mb-4">85%</div>
            <h3 className="text-2xl font-bold text-black mb-2">
              PROFIT SHARING
            </h3>
            <p className="text-gray-700">
              Of every sale goes directly back to artists
            </p>
          </div>
          <div>
            <div className="text-6xl font-bold text-indigo-400 mb-4">100%</div>
            <h3 className="text-2xl font-bold text-black mb-2">TRANSPARENT</h3>
            <p className="text-gray-700">
              Clear breakdown of where your money goes
            </p>
          </div>
          <div>
            <div className="text-6xl font-bold text-indigo-400 mb-4">∞</div>
            <h3 className="text-2xl font-bold text-black mb-2">
              ARTIST SUPPORT
            </h3>
            <p className="text-gray-700">
              Unlimited potential to support your favorite musicians
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
