import React, {useCallback} from 'react';
import {AbsoluteFill} from 'remotion';
import type {Item} from './item';
import {Layer} from './Layer';
import { CaptionView } from '../caption-view';
import './setup-fonts';

export type CompositionProps = {
  readonly items: Item[];
  readonly setSelectedItem: React.Dispatch<React.SetStateAction<string | null>>;
  readonly selectedItem: string | null;
  readonly changeItem: (itemId: string, updater: (item: Item) => Item) => void;
};
 
const outer: React.CSSProperties = {
  backgroundColor: '#eee',
};
 
const layerContainer: React.CSSProperties = {
  overflow: 'hidden',
};
 
export const Composition: React.FC<CompositionProps> = ({
  items = [],
}) => {
  console.log('items 🚀', items)

  return (
    <>
      <AbsoluteFill style={outer}>
        <AbsoluteFill style={layerContainer}>
          {items?.map((item: any) => {
            return <Layer key={item.id} item={item} />;
          })}
        </AbsoluteFill>
      </AbsoluteFill>
      <CaptionView items={items} />
    </>
  );
};