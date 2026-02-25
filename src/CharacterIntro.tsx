import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import React from "react";
import { AvatarCharacter } from "./Composition";

export const CharacterIntro: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Bot entrance animation (slide up from bottom)
    const entranceSpring = spring({
        frame,
        fps,
        config: { damping: 15 },
    });

    const translateY = interpolate(entranceSpring, [0, 1], [0, -50]); // Adjusted position

    // Text fade-in animation
    const textOpacity = interpolate(frame, [30, 60], [0, 1]);

    return (
        <AbsoluteFill style={{ background: 'linear-gradient(to bottom, #fff5e6, #ffe0b2)' }}>
            {/* Moving Character Container */}
            <AbsoluteFill style={{
                transform: `translateY(${translateY}px)`,
                alignItems: 'center',
                justifyContent: 'center',
                top: 50
            }}>
                <AvatarCharacter characterImage="boy.svg" />
            </AbsoluteFill>

            {/* Introduction Text - Warm Style */}
            <AbsoluteFill
                style={{
                    justifyContent: "flex-end",
                    alignItems: "center",
                    paddingBottom: 100,
                }}
            >
                <div
                    style={{
                        fontFamily: "Hiragino Maru Gothic Pro, sans-serif",
                        fontSize: 45,
                        fontWeight: "bold",
                        color: "#5d4037", // Warm brown
                        opacity: textOpacity,
                        textAlign: "center",
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        padding: "30px 50px",
                        borderRadius: 30,
                        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                        maxWidth: "90%",
                        lineHeight: 1.4,
                    }}
                >
                    こんにちは！<br />
                    Beauty Salon AIへようこそ✨
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
