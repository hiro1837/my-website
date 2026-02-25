import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import React from "react";
import { AvatarCharacter } from "./Composition";

export const ThinkingScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Pulsing animation for text (opacity)
    const pulseSpeed = (2 * Math.PI) / fps;
    const textOpacity = 0.5 + 0.5 * Math.sin(frame * pulseSpeed);

    return (
        <AbsoluteFill style={{ background: 'linear-gradient(to bottom, #fff5e6, #ffe0b2)' }}>
            {/* Centered Character */}
            <AvatarCharacter />

            {/* Orbiting/Surrounding Text */}
            <AbsoluteFill
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 10,
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: "15%",
                        fontFamily: "Hiragino Maru Gothic Pro, sans-serif",
                        fontSize: 50,
                        fontWeight: "bold",
                        color: "#8d6e63", // Soft Warm Brown
                        opacity: textOpacity,
                        letterSpacing: "0.1em",
                        backgroundColor: "rgba(255,255,255,0.7)",
                        padding: "10px 30px",
                        borderRadius: 20,
                    }}
                >
                    確認いたします...
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
