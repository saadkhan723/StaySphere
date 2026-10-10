import SearchBox from "./SearchBox.jsx";

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <span className="hero-badge">Discover your next stay</span>

          <h1>
            Find your perfect
            <span> stay anywhere.</span>
          </h1>

          <p>
            Search hotels, compare prices, and book comfortable stays for
            your next journey with StaySphere.
          </p>
        </div>

        <SearchBox />
      </div>
    </section>
  );
}

export default Hero;