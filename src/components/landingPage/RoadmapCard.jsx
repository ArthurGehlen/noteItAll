// Utils
import "./RoadmapCard.css";

const RoadmapCard = (props) => {
  return (
    <div className="roadmap_card" style={{ backgroundColor: props.color }}>
      {props.children}
    </div>
  );
};

export default RoadmapCard;
