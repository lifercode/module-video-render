/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { TheBoldFont } from "./load-font";
import { fitText } from "@remotion/layout-utils";
import { makeTransform, scale, translateY } from "@remotion/animation-utils";
import { TikTokPage } from "@remotion/captions";

const fontFamily = TheBoldFont;

interface PageProps extends TikTokPage {
  options?: any
}

export const Page: React.FC<{
  readonly enterProgress: number;
  readonly page: PageProps;
}> = ({ enterProgress, page }) => {
  const frame = useCurrentFrame();
  const { width, fps } = useVideoConfig();
  const timeInMs = (frame / fps) * 1000;

  const captionOptions = page?.options

  const container: React.CSSProperties = {
    justifyContent: captionOptions?.justifyContent,
    alignItems: captionOptions?.alignItems,
    top: captionOptions?.top,
    bottom: captionOptions?.bottom,
    height: captionOptions?.height,
  };

  const fittedText = fitText({
    fontFamily,
    text: page.text,
    withinWidth: width * 0.9,
    textTransform: captionOptions?.textTransform,
  });

  const fontSize = Math.min(captionOptions?.DESIRED_FONT_SIZE, fittedText.fontSize);

  console.log(page)

  return (
    <AbsoluteFill style={container}>
      <div
        style={{
          fontSize,
          color: captionOptions?.color,
          WebkitTextStroke: captionOptions?.WebkitTextStroke,
          paintOrder: captionOptions?.paintOrder,
          transform: makeTransform([
            scale(interpolate(enterProgress, [0, 1], [0.8, 1])),
            translateY(interpolate(enterProgress, [0, 1], [50, 0])),
          ]),
          fontFamily,
          textTransform: captionOptions?.textTransform,
        }}
      >
        <span
          style={{
            transform: makeTransform([
              scale(interpolate(enterProgress, [0, 1], [0.8, 1])),
              translateY(interpolate(enterProgress, [0, 1], [50, 0])),
            ]),
          }}
        >
          {page.tokens.map((t) => {
            const startRelativeToSequence = t.fromMs - page.startMs;
            const endRelativeToSequence = t.toMs - page.startMs;

            const active =
              startRelativeToSequence <= timeInMs &&
              endRelativeToSequence > timeInMs;

            return (
              <span
                key={t.fromMs}
                style={{
                  display: captionOptions?.display,
                  whiteSpace: captionOptions?.whiteSpace,
                  color: active ? captionOptions?.HIGHLIGHT_COLOR : captionOptions?.colorDefault,
                }}
              >
                {t.text}
              </span>
            );
          })}
        </span>
      </div>
    </AbsoluteFill>
  );
};
