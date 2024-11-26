import React, {useMemo} from 'react';
import {Sequence, Img, Video, Audio} from 'remotion';
import {Item, ItemData, ItemType} from './item';
import {AnimatedEmoji, CalculateEmojiSrc} from '@remotion/animated-emoji'
import {Circle, Rect, Triangle, Ellipse, Star, Pie, Polygon} from '@remotion/shapes'

const defaultCalculateEmojiSrc: CalculateEmojiSrc = ({emoji, scale, format, }) => {
  const extension = format === "hevc" ? "mp4" : "webm";

  return `https://github.com/remotion-dev/animated-emoji/raw/refs/heads/main/public/${emoji}-${scale}x.${extension}`;
};

type ElementProps = {
  type: ItemType;
  className?: string;
  style: React.CSSProperties;
  data?: ItemData
}

function Element({ style, className, type, data }: ElementProps) {
  if(type === 'image' && data?.src) {
    return (
      <Img src={data?.src} className={`overflow-hidden ${className}`} style={{...style, ...data?.style}}/>
    )
  }

  if(type === 'video' && data?.src) {
    return (
      <Video src={data?.src} className={`overflow-hidden ${className}`} style={{...style, ...data?.style}}/>
    )
  }

  if(type === 'audio' && data?.src) {
    return (
      <Audio src={data?.src} className={`overflow-hidden ${className}`} style={style}/>
    )
  }

  if(type === 'text' && data?.content) {
    return (
      <div className={`overflow-hidden ${className}`} style={style}>
        <p style={data?.style}>{data?.content}</p>
      </div>
    )
  }

  if(type === 'rect') {
    return (
      <Rect
        width={Number(style.width)}
        height={Number(style.height)}
        fill={data?.fill}
        stroke={data?.stroke}
        strokeWidth={data?.strokeWidth}
        cornerRadius={data?.cornerRadius}
        edgeRoundness={data?.edgeRoundness}
        className={`overflow-hidden ${className}`}
        style={{...style, ...data?.style}}
      />
    )
  }

  if(type === 'triangle') {
    return (
      <Triangle
        length={Number(style.width)}
        fill={data?.fill}
        stroke={data?.stroke}
        strokeWidth={data?.strokeWidth}
        cornerRadius={data?.cornerRadius}
        edgeRoundness={data?.edgeRoundness}
        direction={data?.direction}
        className={`overflow-hidden ${className}`}
        style={{...style, ...data?.style}}
      />
    )
  }

  if(type === 'circle') {
    return (
      <Circle
        radius={Number(style.width)}
        fill={data?.fill}
        stroke={data?.stroke}
        strokeWidth={data?.strokeWidth}
        className={`overflow-hidden ${className}`}
        style={{...style, ...data?.style}}
      />
    )
  }

  if(type === 'ellipse') {
    return (
      <Ellipse
        rx={Number(style.width)}
        ry={Number(style.height)}
        fill={data?.fill}
        stroke={data?.stroke}
        strokeWidth={data?.strokeWidth}
        className={`overflow-hidden ${className}`}
        style={{...style, ...data?.style}}
      />
    )
  }

  if(type === 'star') {
    return (
      <Star
        fill={data?.fill}
        stroke={data?.stroke}
        strokeWidth={data?.strokeWidth}
        cornerRadius={data?.cornerRadius}
        edgeRoundness={data?.edgeRoundness}
        points={data?.points}
        innerRadius={data?.innerRadius}
        outerRadius={data?.outerRadius}
        className={`overflow-hidden ${className}`}
        style={{...style, ...data?.style}}
      />
    )
  }

  if(type === 'pie') {
    return (
      <Pie
        fill={data?.fill}
        stroke={data?.stroke}
        strokeWidth={data?.strokeWidth}
        progress={data?.progress}
        radius={Number(style.width)}
        rotation={data?.rotation}
        closePath={data?.closePath}
        counterClockwise={data?.counterClockwise}
        className={`overflow-hidden ${className}`}
        style={{...style, ...data?.style}}
      />
    )
  }

  if(type === 'polygon') {
    return (
      <Polygon
        fill={data?.fill}
        stroke={data?.stroke}
        strokeWidth={data?.strokeWidth}
        cornerRadius={data?.cornerRadius}
        edgeRoundness={data?.edgeRoundness}
        points={data?.points}
        radius={Number(style.width)}
        className={`overflow-hidden ${className}`}
        style={{...style, ...data?.style}}
      />
    )
  }

  if(type === 'caption') {
    return null
  }

  if(type === 'emoji' && data?.emoji) {
    return (
      <AnimatedEmoji
        emoji={data?.emoji}
        calculateSrc={defaultCalculateEmojiSrc}
        className={`overflow-hidden ${className}`} 
        style={{...style, ...data?.style}}
      />
    )
  }


  return null
}

export const Layer: React.FC<{
  item: Item;
}> = ({item}) => {
  const style: React.CSSProperties = useMemo(() => {
    return {
      backgroundColor: item.color,
      position: 'absolute',
      left: item.left,
      top: item.top,
      width: item.width,
      height: item.height,
    };
  }, [item.color, item.height, item.left, item.top, item.width]);
 
  return (
    <Sequence
      key={item.id}
      from={item.from}
      durationInFrames={item.durationInFrames}
      layout="none"
    >
      <Element
        type={item.type}
        style={style}
        data={item?.data}
      />
    </Sequence>
  );
};