import { Component, createMemo, createSignal, JSX } from "solid-js";
import {
	Alignement,
	Anchor,
	AnchorProps,
	Constraints,
	HorizontalAlign,
	VerticalAlign,
} from "./Anchor";

const LEFT = HorizontalAlign.LEFT;
const CENTER = HorizontalAlign.CENTER;
const RIGHT = HorizontalAlign.RIGHT;
const TOP = VerticalAlign.TOP;
const MIDDLE = VerticalAlign.MIDDLE;
const BOTTOM = VerticalAlign.BOTTOM;

export default {
	title: "Utilities/Anchor",
};

function mapStringToAlignment(value: string): Alignement {
	switch (value) {
		case "TopLeft":
			return [LEFT, TOP];
		case "TopCenter":
			return [CENTER, TOP];
		case "TopRight":
			return [RIGHT, TOP];
		case "MiddleLeft":
			return [LEFT, MIDDLE];
		case "MiddleCenter":
			return [CENTER, MIDDLE];
		case "MiddleRight":
			return [RIGHT, MIDDLE];
		case "BottomLeft":
			return [LEFT, BOTTOM];
		case "BottomCenter":
			return [CENTER, BOTTOM];
		case "BottomRight":
			return [RIGHT, BOTTOM];
		default:
			throw new Error(`Unknown alignment ${value}.`);
	}
}

export const AnchorTransform = (props: any) => {
	const anchorOrigin = mapStringToAlignment(props.anchorOrigin);
	const transformOrigin = mapStringToAlignment(props.transformOrigin);
	return (
		<div
			style={{
				display: "inline-block",
				position: "relative",
				background: "#c0c0c0",
				padding: "4px",
				margin: "100px 0 0 100px",
			}}
		>
			Parent
			<Anchor
				anchorOrigin={anchorOrigin}
				transformOrigin={transformOrigin}
			>
				<div
					style={{
						display: "inline-block",
						background: "#f0c0c0a0",
						padding: "4px",
					}}
				>
					Child
				</div>
			</Anchor>
		</div>
	);
};

AnchorTransform.argTypes = {
	anchorOrigin: {
		description: "Anchor alignment",
		defaultValue: "TopRight",
		control: { type: "select" },
		options: [
			"TopLeft",
			"TopCenter",
			"TopRight",
			"MiddleLeft",
			"MiddleCenter",
			"MiddleRight",
			"BottomLeft",
			"BottomCenter",
			"BottomRight",
		],
	},
	transformOrigin: {
		description: "Transform alignment",
		defaultValue: "TopLeft",
		control: { type: "select" },
		options: [
			"TopLeft",
			"TopCenter",
			"TopRight",
			"MiddleLeft",
			"MiddleCenter",
			"MiddleRight",
			"BottomLeft",
			"BottomCenter",
			"BottomRight",
		],
	},
};

export const Constrained = (props: any) => {
	const [parent, setParent] = createSignal<HTMLDivElement>();

	const parentStyle = createMemo<JSX.CSSProperties>(() => {
		const parentAlign = mapStringToAlignment(props.parentAlign);

		const halign = parentAlign[0] === RIGHT ? "right" : "left";
		const hvalue = parentAlign[0] === CENTER ? "-50%" : "0";
		const valign = parentAlign[1] === BOTTOM ? "bottom" : "top";
		const vvalue = parentAlign[1] === MIDDLE ? "-50%" : "0";

		return {
			display: "inline-block",
			position: "absolute",
			[halign]: parentAlign[0] === CENTER ? "50%" : "0",
			[valign]: parentAlign[1] === MIDDLE ? "50%" : "0",
			transform: `translate(${hvalue}, ${vvalue})`,
		};
	});

	const constraints = createMemo<Constraints>(() => ({
		element: parent(),
		preventOverlap: true,
		origins: [
			{
				anchor: [RIGHT, TOP],
				transform: [LEFT, TOP],
			},
			{
				anchor: [LEFT, TOP],
				transform: [RIGHT, TOP],
			},
			{
				anchor: [RIGHT, BOTTOM],
				transform: [LEFT, BOTTOM],
			},
			{
				anchor: [LEFT, BOTTOM],
				transform: [RIGHT, BOTTOM],
			},
		],
	}));

	return (
		<div
			ref={setParent}
			style={{
				display: "block",
				position: "relative",
				background: "rgba(0, 0, 0, 0.1)",
				padding: "4px",
				width: "100px",
				height: "100px",
			}}
		>
			<div style={parentStyle()}>
				<div
					style={{
						display: "inline-block",
						position: "relative",
						background: "#c0c0c0",
						padding: "4px",
					}}
				>
					Parent
					<Anchor constraints={constraints()}>
						<div
							style={{
								display: "inline-block",
								background: "#f0c0c0a0",
								padding: "4px",
							}}
						>
							Child
						</div>
					</Anchor>
				</div>
			</div>
		</div>
	);
};
Constrained.argTypes = {
	parentAlign: {
		description: "Parent alignment",
		defaultValue: "TopLeft",
		control: { type: "select" },
		options: [
			"TopLeft",
			"TopCenter",
			"TopRight",
			"MiddleLeft",
			"MiddleCenter",
			"MiddleRight",
			"BottomLeft",
			"BottomCenter",
			"BottomRight",
		],
	},
};
