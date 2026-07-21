import GhostCursor from "./GhostCursor";
import FuzzyText from "./FuzzyText";
import "../../styles/deathScreen.css";

export default function DeathScreen() {
  return (
    <div className="death-screen">

      <GhostCursor
        color="#8B0000"
        brightness={3}
        trailLength={70}
        inertia={0.45}
        bloomStrength={0.2}
        grainIntensity={0.08}
        fadeDelayMs={800}
        fadeDurationMs={1500}
      />

      <div className="death-content">

        <FuzzyText
          fontSize="120px"
          color="#c40000"
          baseIntensity={0.18}
          hoverIntensity={0}
        >
          YOU DIED
        </FuzzyText>

        <p className="death-msg">
          Your soul couldn't escape...
        </p>

        <button className="retry-btn" 
        onClick={()=>{window.location.reload()}}>
          RETRY
        </button>

      </div>

    </div>
  );
}