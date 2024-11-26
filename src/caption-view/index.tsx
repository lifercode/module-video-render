/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import {
  cancelRender,
  continueRender,
  delayRender,
  Sequence,
  useVideoConfig,
} from "remotion";
import SubtitlePage from "./SubtitlePage";
import { loadFont } from "./load-font";

// How many captions should be displayed at a time?
// Try out:
// - 1500 to display a lot of words at a time
// - 200 to only display 1 word at a time
const SWITCH_CAPTIONS_EVERY_MS = 200;

const filterPages = (pages: any[]) => pages.filter(({type}: any) => type === 'caption')

const normalizePages = (pages: any[]) => pages.map((item: any) => ({
  "text": `${item?.data?.content}`,
  "startMs": item?.from * 30,
  "options": item?.data?.captionOptions,
  "tokens": [
    {
      "text": `${item?.data?.content}`,
      "fromMs": item?.from * 30,
      "toMs": (item?.from + item?.durationInFrames) * 30,
    }
  ]
}))

export const CaptionView: React.FC<{
  items?: any;
}> = ({ items }) => {
  const pages = normalizePages(filterPages(items)).sort((a: any, b: any) => parseFloat(a.startMs) - parseFloat(b.startMs)); //.reverse()

  const [handle] = useState(() => delayRender());
  const { fps } = useVideoConfig();

  const setup = useCallback(async () => {
    try {
      await loadFont();
      continueRender(handle);
    } catch (e) {
      cancelRender(e);
    }
  }, [handle]);

  useEffect(() => {
    setup();
  }, [setup]);
  
  return (
    <>
      {pages.map((page: any, index: number) => {
        const nextPage = pages[index + 1] ?? null;
        const subtitleStartFrame = (page.startMs / 1000) * fps;
        const subtitleEndFrame = Math.min(
          nextPage ? (nextPage.startMs / 1000) * fps : Infinity,
          subtitleStartFrame + SWITCH_CAPTIONS_EVERY_MS,
        );
        const durationInFrames = subtitleEndFrame - subtitleStartFrame;
        if (durationInFrames <= 0) {
          return null;
        }

        return (
          <Sequence
            key={index}
            from={subtitleStartFrame}
            durationInFrames={durationInFrames}
          >
            <SubtitlePage key={index} page={page} />;
          </Sequence>
        );
      })}
    </>
  );
};
