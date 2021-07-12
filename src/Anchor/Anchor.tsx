import {
	Component,
	PropsWithChildren,
	createEffect,
} from "solid-js";

export enum VerticalAlign {
	TOP = "TOP",
	MIDDLE = "MIDDLE",
	BOTTOM = "BOTTOM",
}

export enum HorizontalAlign {
	LEFT = "LEFT",
	CENTER = "CENTER",
	RIGHT = "RIGHT",
}

export type Alignement = [HorizontalAlign, VerticalAlign];

export type Constraints = {
	element?: HTMLElement | (() => HTMLElement);
	preventOverlap?: boolean;
	origins: { anchor: Alignement; transform: Alignement }[];
};

export type AnchorProps =
	| {
			anchorOrigin: Alignement;
			transformOrigin: Alignement;
			class?: string;
	  }
	| {
			constraints: Constraints;
			class?: string;
	  };

export const Anchor: Component<PropsWithChildren<AnchorProps>> = (props) => {
	let anchor: HTMLDivElement | undefined;
	let transform: HTMLDivElement | undefined;
	
	createEffect(() => {
		console.log(
			"createEffect",
			anchor && document.body.contains(anchor),
			transform && document.body.contains(transform),
			anchor?.getBoundingClientRect(),
			transform?.getBoundingClientRect(),
		);
	});

	return (
		<div ref={anchor}>
			<div ref={transform}>{props.children}</div>
		</div>
	);
};
