import { Composition } from "remotion";
import { Trailer, FPS, DURATION_IN_FRAMES } from "./Trailer";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Trailer-Vertical"
        component={Trailer}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Trailer-Square"
        component={Trailer}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={1080}
        height={1080}
      />
      <Composition
        id="Trailer-Landscape"
        component={Trailer}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
