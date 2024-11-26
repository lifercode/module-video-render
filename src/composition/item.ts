/* eslint-disable @typescript-eslint/no-explicit-any */
export type ItemType = 'image'
	| 'video'
	| 'text'
	| 'audio'
	| 'emoji'
	| 'rect'
	| 'triangle'
	| 'circle'
	| 'ellipse'
	| 'star'
	| 'pie'
	| 'polygon'
	| 'caption';

export type ItemData = {
	[key: string]: any;
};

export type Item = {
	id: string;
	durationInFrames: number;
	from: number;
	height: number;
	left: number;
	top: number;
	width: number;
	color: string;
	isDragging: boolean;
	type: ItemType;
	data?: ItemData;
};