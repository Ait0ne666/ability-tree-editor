import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { styled } from "@stitches/react";
import React from "react";

const SCROLLBAR_SIZE = 10;

const StyledScrollArea = styled(ScrollAreaPrimitive.Root, {
    length: 1,
    width: "100%",
    height: "100%",
    borderRadius: 4,
    overflow: "hidden",
});

const StyledViewport = styled(ScrollAreaPrimitive.Viewport, {
    length: 1,
    width: "100%",
    height: "100%",
    borderRadius: "inherit",
});

const StyledScrollbar = styled(ScrollAreaPrimitive.Scrollbar, {
    length: 1,
    zIndex: 100,

    display: "flex",
    // ensures no selection
    userSelect: "none",
    // disable browser handling of all panning and zooming gestures on touch devices
    touchAction: "none",
    padding: 2,
    background: `rgba(0, 0, 0, 0.1)`,
    transition: "background 160ms ease-out",
    "&:hover": { background: `rgba(0, 0, 0, 0.2)` },
    '&[data-orientation="vertical"]': { width: SCROLLBAR_SIZE },
    '&[data-orientation="horizontal"]': {
        flexDirection: "column",
        height: SCROLLBAR_SIZE,
    },
});

const StyledThumb = styled(ScrollAreaPrimitive.Thumb, {
    length: 1,
    flex: 1,
    background: `rgba(40, 40, 0, 0.5)`,
    borderRadius: SCROLLBAR_SIZE,
    // increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
    position: "relative",
    "&::before": {
        content: '""',
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        height: "100%",
        minWidth: 44,
        minHeight: 44,
    },
});

const StyledCorner = styled(ScrollAreaPrimitive.Corner, {
    length: 1,
    background: `rgba(0, 0, 0, 0.5)`,
});

// Exports
const ScrollArea = StyledScrollArea;
const ScrollAreaViewport = StyledViewport;
const ScrollAreaScrollbar = StyledScrollbar;
const ScrollAreaThumb = StyledThumb;
const ScrollAreaCorner = StyledCorner;

type ScrollbarProps = {
    id?: string;
};

const ScrollAreaDemo: React.FC<ScrollbarProps> = ({ children, id }) => (
    <ScrollArea>
        <ScrollAreaViewport id={id} css={{ backgroundColor: "white" }}>
            {children}
        </ScrollAreaViewport>
        <ScrollAreaScrollbar orientation="vertical">
            <ScrollAreaThumb />
        </ScrollAreaScrollbar>
        <ScrollAreaScrollbar orientation="horizontal">
            <ScrollAreaThumb />
        </ScrollAreaScrollbar>
        <ScrollAreaCorner />
    </ScrollArea>
);

export default ScrollAreaDemo;
