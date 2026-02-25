import { AbsoluteFill, useCurrentFrame, spring, interpolate, Img, staticFile } from "remotion";
import React from "react";

export const OpeningTitle: React.FC = () => {
    const frame = useCurrentFrame();

    // Text Animation
    const textOpacity = spring({
        frame,
        fps: 30,
        config: { damping: 200 },
    });

    // Scale up slightly for a dramatic effect
    const textScale = interpolate(frame, [0, 150], [0.9, 1.0]);

    // Background gradient animation (subtle shift)
    const bgPos = interpolate(frame, [0, 150], [0, 10]);

    // Character entrance animation (Slide up)
    const charSlide = spring({
        frame: frame - 30, // Start later than text
        fps: 30,
        config: { damping: 100 },
    });
    const charY = interpolate(charSlide, [0, 1], [1080, 200]); // Move from bottom to position

    return (
        <AbsoluteFill style={{
            background: "linear-gradient(45deg, #fce4ec, #f3e5f5, #e0f7fa)",
            backgroundSize: "200% 200%",
            transform: `translate(${bgPos}px, ${bgPos}px)`
        }}>
            {/* Decorative Circle */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 700,
                height: 700,
                border: '2px solid rgba(255, 255, 255, 0.5)',
                borderRadius: '50%',
            }} />

            {/* Character Image */}
            <AbsoluteFill style={{
                justifyContent: 'flex-end',
                alignItems: 'center',
                transform: `translateY(${charY}px)`,
            }}>
                <Img
                    src={staticFile("pixar-receptionist.png")}
                    style={{
                        height: 800,
                        objectFit: 'contain'
                    }}
                />
            </AbsoluteFill>

            {/* Title Text */}
            <AbsoluteFill
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 10, // Ensure text is on top
                }}
            >
                <div
                    style={{
                        fontFamily: "Serif, Georgia, Times New Roman",
                        fontSize: 80,
                        fontWeight: "bold",
                        color: "#5d4037",
                        opacity: textOpacity,
                        transform: `scale(${textScale})`,
                        textShadow: "0 2px 10px rgba(0,0,0,0.1)",
                        letterSpacing: '0.05em',
                        marginTop: -300, // Move text up to make room for character
                    }}
                >
                    Beauty Salon AI
                </div>
                <div
                    style={{
                        marginTop: 20,
                        fontFamily: "Sans-serif",
                        fontSize: 30,
                        color: "#8d6e63",
                        opacity: interpolate(frame, [20, 50], [0, 1]),
                        transform: `translateY(110px)`
                    }}
                >
                    Future of Hospitality
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
