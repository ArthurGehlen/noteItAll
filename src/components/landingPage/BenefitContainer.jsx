const BenefitContainer = ({
  img,
  benefitTitle,
  text,
  color,
  commingSoon = false,
}) => {
  return (
    <div className={`benefit_card ${commingSoon ? "comming_soon" : ""}`}>
      <div className="benefit_img" style={{ backgroundColor: color }}>
        <img src={img} alt="Representation" />
      </div>
      <div className="benefit_content">
        <h2>{benefitTitle}</h2>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default BenefitContainer;
