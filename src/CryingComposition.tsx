import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

export const CryingComposition: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Shaky animation for the whole scene (うおおおん effect)
    const shakeX = Math.random() * 4 - 2;
    const shakeY = Math.random() * 4 - 2;

    // Jumping animation for the character
    const jump = Math.abs(Math.sin(frame * 0.3)) * 20;

    // Text pop-in animation
    const textSpring = spring({
        frame,
        fps,
        config: { stiffness: 100 },
    });

    return (
        <AbsoluteFill style={{
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            transform: `translate(${shakeX}px, ${shakeY}px)`
        }}>
            <AbsoluteFill style={{
                background: 'linear-gradient(180deg, #e3f2fd 0%, #bbdefb 100%)',
            }} />

            {/* Character Group */}
            <div style={{
                position: 'relative',
                transform: `translateY(${-jump}px)`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <svg width="400" height="400" viewBox="0 0 400 400">
                    {/* Face */}
                    <circle cx="200" cy="200" r="150" fill="#ffccbc" />

                    {/* Hair */}
                    <path d="M50,150 Q200,0 350,150 L350,180 Q200,80 50,180 Z" fill="#5d4037" />

                    {/* Crying Eyes (Closed tightly) */}
                    <path d="M140,180 Q160,170 180,180" stroke="#333" strokeWidth="8" fill="none" />
                    <path d="M220,180 Q240,170 260,180" stroke="#333" strokeWidth="8" fill="none" />

                    {/* Wide Open Mouth (うおおおん) */}
                    <ellipse cx="200" cy="260" rx="60" ry="50" fill="#880e4f" />
                    <path d="M150,280 Q200,310 250,280" fill="#f06292" /> {/* Tongue */}

                    {/* Waterfall Tears */}
                    <WaterfallTear x={150} y={190} delay={0} />
                    <WaterfallTear x={250} y={190} delay={5} />
                </svg>

                {/* Text Overlay */}
                <div style={{
                    marginTop: 20,
                    fontSize: 80,
                    fontWeight: 'bold',
                    color: '#1976d2',
                    fontFamily: 'sans-serif',
                    transform: `scale(${textSpring}) rotate(${Math.sin(frame * 0.5) * 5}deg)`,
                    textShadow: '4px 4px 0px #fff, -4px -4px 0px #fff, 4px -4px 0px #fff, -4px 4px 0px #fff'
                }}>
                    うおおおん！
                </div>
            </div>
        </AbsoluteFill>
    );
};

const WaterfallTear: React.FC<{ x: number, y: number, delay: number }> = ({ x, y, delay }) => {
    const frame = useCurrentFrame();

    // Multiple tear drops to create a waterfall effect
    return (
        <g transform={`translate(${x}, ${y})`}>
            {[0, 1, 2, 3].map((i) => {
                const dropFrame = (frame + delay + i * 5) % 20;
                const dropY = interpolate(dropFrame, [0, 20], [0, 300], {
                    extrapolateRight: 'clamp',
                });
                const dropScale = interpolate(dropFrame, [0, 5, 20], [0, 1.2, 0.8]);
                const dropOpacity = interpolate(dropFrame, [15, 20], [1, 0]);

                return (
                    <ellipse
                        key={i}
                        cx="0"
                        cy={dropY}
                        rx={15 * dropScale}
                        ry={25 * dropScale}
                        fill="#4fc3f7"
                        style={{ opacity: dropOpacity }}
                    />
                );
            })}
            {/* Main waterfall stream */}
            <rect
                x="-10"
                y="0"
                width="20"
                height="400"
                fill="#81d4fa"
                style={{ opacity: 0.6 }}
            />
        </g>
    );
};
