import { assert } from "@darksun/assert";
import { useEffect, useMemo, useRef, useState } from "react";
import { useWindowDimensions } from "../../hooks/dimension";
import { Dimensions, View } from "../../pixi/view";
import Scrollbar from '../Scrollbar/index'



const LOG_TAG = "Viewport";

const Viewport = () => {
    const viewportContainerRef = useRef<HTMLDivElement>(null);
    const viewRef = useRef<View | null>();
    const wrapperRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { height, width } = useWindowDimensions();
    const [wrapperDimension, setWrapperDimensions] = useState<
        Dimensions | undefined
    >();


    const [currentLayoutName, setCurrentLayoutName] = useState<
        string | undefined
    >();


    useEffect(() => {
        initializeApp();

        return () => {
            viewRef.current?.shutdown();
        };
    }, []);

    useEffect(() => {
        if (wrapperRef.current) {
            const size = wrapperRef.current.getBoundingClientRect();

            setWrapperDimensions({
                width: size.width,
                height: size.height,
            });
        }
    }, [width, height]);

    const initializeApp = async () => {
        if (viewportContainerRef.current && !viewRef.current) {
            const view = new View(viewportContainerRef.current);
            try {
                await view.run();
                viewRef.current = view;
            } catch (error) {
                log.error(LOG_TAG + "initialize app", `[${error}]`);
            }
        }
    };

    return (
        <div
            ref={wrapperRef}
            style={{
                width: '100vw',
                height: '100vh',
                position: "relative",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    top: 0,
                }}
            >
                <Scrollbar id={"viewport-container"}>
                    <div
                        style={{
                            width: wrapperDimension?.width,
                            height: wrapperDimension?.height,
                            display: "flex",
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                        }}
                    >
                        <div
                            ref={viewportContainerRef}
                            style={{
                                width:  1920,
                                height:  1080,
                            }}
                        >
                            <canvas id="canvas" />
                        </div>
                    </div>
                </Scrollbar>
            </div>
        </div>
    );
};

export default Viewport;
