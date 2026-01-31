import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="container hero-content">
        <h1>Lost something on campus?</h1>
        <p>Quickly search the database or report an item you've found or lost.</p>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={() => navigate('/add')}>Report Found Item</button>
          <button className="btn btn-outline" onClick={() => navigate('/items')}>View All Lost Items</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;