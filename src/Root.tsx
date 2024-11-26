import './tailwind.css';
import { Composition } from "remotion";

import {Composition as Comp} from './composition/composition';

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        // You can take the "id" to render a module-video-render:
        // npx remotion render src/index.ts <id> out/module-video-render.mp4
        id="HelloWorld"
        component={Comp}

        style={{ width: '100%' }}
        height={1080}
        width={1920}
        durationInFrames={900}
        fps={30}
        overflowVisible={true}
        controls={true}

        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        // schema={myCompSchema}
        defaultProps={{
          items: [],
        }}
      />
    </>
  );
};
