import React from 'react';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  iconOnly?: boolean;
}

/**
 * Beacon Studio logo — faithful recreation of the brand mark:
 *  - Center: open hexagon (flat-top)
 *  - 8 thick arms radiating outward
 *  - Cardinal tips (N/E/S/W): open octagon (stop-sign shape, outline only)
 *  - Diagonal tips (NE/SE/SW/NW): solid filled hexagon
 */
export default function Logo({ className = "", iconOnly = false, ...props }: LogoProps) {
  // All coordinates are in a 280×280 viewBox, center at (140,140)
  const cx = 140, cy = 140;

  // Center open hexagon (flat-top) — radius 28
  const hexR = 28;
  const hexPts = [0,1,2,3,4,5].map(i => {
    const a = (Math.PI / 180) * (i * 60 + 30); // flat-top starts at 30°
    return `${cx + hexR * Math.cos(a)},${cy + hexR * Math.sin(a)}`;
  }).join(' ');

  // Open octagon for cardinal tips (stop-sign shape) — radius 14
  const octR = 14;
  const octPts = (tx: number, ty: number) =>
    [0,1,2,3,4,5,6,7].map(i => {
      const a = (Math.PI / 180) * (i * 45 + 22.5); // flat-top octagon
      return `${tx + octR * Math.cos(a)},${ty + octR * Math.sin(a)}`;
    }).join(' ');

  // Solid hexagon for diagonal tips — radius 13
  const solidHexR = 13;
  const solidHexPts = (tx: number, ty: number) =>
    [0,1,2,3,4,5].map(i => {
      const a = (Math.PI / 180) * (i * 60);
      return `${tx + solidHexR * Math.cos(a)},${ty + solidHexR * Math.sin(a)}`;
    }).join(' ');

  // Arm endpoint distance from center
  const armLen = 84;

  // 8 directions: 0°=N, 45°=NE, 90°=E, etc. (SVG y-axis flipped so 270°=top)
  // We use: top=-90, TR=-45, right=0, BR=45, bottom=90, BL=135, left=180, TL=225
  const dirs = [
    { angle: -90,  cardinal: true  },  // Top
    { angle: -45,  cardinal: false },  // Top-Right
    { angle:   0,  cardinal: true  },  // Right
    { angle:  45,  cardinal: false },  // Bottom-Right
    { angle:  90,  cardinal: true  },  // Bottom
    { angle: 135,  cardinal: false },  // Bottom-Left
    { angle: 180,  cardinal: true  },  // Left
    { angle: 225,  cardinal: false },  // Top-Left
  ];

  return (
    <svg
      width={iconOnly ? "200" : "280"}
      height={iconOnly ? "200" : "340"}
      viewBox={iconOnly ? "38 38 204 204" : "0 0 280 340"}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Center open hexagon */}
      <polygon
        points={hexPts}
        fill="none"
        stroke="currentColor"
        strokeWidth="9"
        strokeLinejoin="round"
      />

      {/* Arms + tips */}
      {dirs.map(({ angle, cardinal }) => {
        const rad = (Math.PI / 180) * angle;
        // Arm starts at edge of center hex
        const startDist = hexR + 2;
        const x1 = cx + startDist * Math.cos(rad);
        const y1 = cy + startDist * Math.sin(rad);
        // Arm ends just before the tip shape
        const tipDist = armLen - (cardinal ? octR : solidHexR) - 3;
        const x2 = cx + tipDist * Math.cos(rad);
        const y2 = cy + tipDist * Math.sin(rad);
        // Tip center
        const tx = cx + armLen * Math.cos(rad);
        const ty = cy + armLen * Math.sin(rad);

        return (
          <g key={angle}>
            <line
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="currentColor"
              strokeWidth="8.5"
              strokeLinecap="round"
            />
            {cardinal ? (
              <polygon
                points={octPts(tx, ty)}
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinejoin="round"
              />
            ) : (
              <polygon
                points={solidHexPts(tx, ty)}
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            )}
          </g>
        );
      })}

      {/* Wordmark — only when not iconOnly */}
      {!iconOnly && (
        <>
          <text
            x="140" y="284"
            textAnchor="middle"
            fontFamily="'Arial Black', 'Helvetica', sans-serif"
            fontSize="43"
            fontWeight="900"
            fill="currentColor"
            letterSpacing="-1.5"
          >BEACON</text>
          <text
            x="140" y="307"
            textAnchor="middle"
            fontFamily="'Arial Black', 'Helvetica', sans-serif"
            fontSize="17.5"
            fontWeight="500"
            fill="currentColor"
            letterSpacing="7"
          >STUDIO</text>
        </>
      )}
    </svg>
  );
}
