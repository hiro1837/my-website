import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, Img, staticFile } from 'remotion';

export const AvatarCharacter: React.FC<{
    talking?: boolean; // Prop to trigger talking animation (bounce)
    mouthOpen?: boolean; // NEW: Prop to trigger mouth open image
    characterImage?: string; // NEW: Prop to override character image
}> = ({ talking = false, mouthOpen = false, characterImage }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Breathing animation (scale) - Subtle loop
    const breathingSpeed = (2 * Math.PI) / (4 * fps); // Slower, 4 seconds
    const scale = 1 + 0.02 * Math.sin(frame * breathingSpeed);

    // Talking bounce effect (bobs up and down slightly if talking)
    const talkingBounce = talking ? Math.abs(Math.sin(frame * 0.5)) * 5 : 0;

    // Choose image source
    // If characterImage is provided, use it. Otherwise, use default logic.
    const imageSrc = characterImage
        ? staticFile(characterImage)
        : (mouthOpen
            ? staticFile("pixar-receptionist-mouth-open.png")
            : staticFile("pixar-receptionist-v2.png"));

    return (
        <AbsoluteFill
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(to bottom, #fff5e6, #ffe0b2)', // Warm gradient background
            }}
        >
            <AbsoluteFill
                style={{
                    // Warm overlay
                    background: 'rgba(255, 160, 0, 0.05)',
                    pointerEvents: 'none',
                    zIndex: 10,
                }}
            />

            <div
                style={{
                    transform: `scale(${scale}) translateY(${talkingBounce}px)`,
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                    width: 600, // Adjust size as needed
                    height: 600,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Img
                    src={imageSrc}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            </div>
        </AbsoluteFill>
    );
};
