import {bundle} from '@remotion/bundler';
import {renderMedia, selectComposition} from '@remotion/renderer';
import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);

async function render(items = []) {
  const bundled = await bundle({
    entryPoint: require.resolve('./src/index.ts'),
    // If you have a webpack override in remotion.config.ts, pass it here as well.
    webpackOverride: (config) => config,
  });

  const inputProps = {
    items
  };

  const composition = await selectComposition({
    serveUrl: bundled,
    id: 'HelloWorld',
    inputProps,
  });

  console.log('Starting to render composition');

  const result = await renderMedia({
    codec: 'h264',
    composition,
    serveUrl: bundled,
    outputLocation: `out/rugg-video-${composition.id}-${new Date()}.mp4`,
    chromiumOptions: {
      enableMultiProcessOnLinux: true,
    },
    inputProps,
  });

  console.log('result 🍪', result)

  console.log(`Rendered composition ${composition.id}.`);
}

export default render;