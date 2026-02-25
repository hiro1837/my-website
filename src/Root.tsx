import { Composition } from "remotion";
import { AvatarCharacter } from "./Composition";
import { OpeningTitle } from "./OpeningTitle";
import { CharacterIntro } from "./CharacterIntro";
import { ThinkingScene } from "./ThinkingScene";
import { DifyDialogue } from "./DifyDialogue";
import { CryingComposition } from "./CryingComposition";
import "./index.css";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="OpeningTitle"
        component={OpeningTitle}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="CharacterIntro"
        component={CharacterIntro}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1080}
      />
      <Composition
        id="ThinkingScene"
        component={ThinkingScene}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1080}
      />
      <Composition
        id="DifyDialogue"
        component={DifyDialogue}
        durationInFrames={300} // Dynamic based on text length usually, but fixed for now
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{
          responseText: "ご来店ありがとうございます。本日はいかがなさいましたか？"
        }}
      />
      <Composition
        id="AvatarCharacter"
        component={AvatarCharacter}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1080}
      />
      <Composition
        id="WaterfallTears"
        component={CryingComposition}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1080}
      />
    </>
  );
};
