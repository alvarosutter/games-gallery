interface HangmanBodyProps {
  lives: number;
}

function HangmanBody({ lives }: HangmanBodyProps) {
  return (
    <svg height="250" width="250">
      <g>
        <g style={lives > 5 ? { visibility: 'hidden' } : {}}>
          <circle cx="200" cy="80" r="20" stroke="white" strokeWidth="3" fill="none" />
          <g style={lives > 0 ? { visibility: 'hidden' } : {}}>
            <line stroke="white" strokeWidth="2" x1="190" y1="78" x2="196" y2="84" />
            <line stroke="white" strokeWidth="2" x1="204" y1="78" x2="210" y2="84" />
            <line stroke="white" strokeWidth="2" x1="190" y1="84" x2="196" y2="78" />
            <line stroke="white" strokeWidth="2" x1="204" y1="84" x2="210" y2="78" />
          </g>
        </g>

        <line
          style={lives > 4 ? { visibility: 'hidden' } : {}}
          stroke="white"
          strokeWidth="3"
          x1="200"
          y1="100"
          x2="200"
          y2="150"
        />
        <line
          style={lives > 3 ? { visibility: 'hidden' } : {}}
          stroke="white"
          strokeWidth="3"
          x1="200"
          y1="120"
          x2="170"
          y2="140"
        />
        <line
          style={lives > 2 ? { visibility: 'hidden' } : {}}
          stroke="white"
          strokeWidth="3"
          x1="200"
          y1="120"
          x2="230"
          y2="140"
        />
        <line
          style={lives > 1 ? { visibility: 'hidden' } : {}}
          stroke="white"
          strokeWidth="3"
          x1="200"
          y1="150"
          x2="180"
          y2="190"
        />
        <line
          style={lives > 0 ? { visibility: 'hidden' } : {}}
          stroke="white"
          strokeWidth="3"
          x1="200"
          y1="150"
          x2="220"
          y2="190"
        />
      </g>
      <line stroke="white" x1="10" y1="250" x2="150" y2="250" />
      <line stroke="white" x1="150" y1="250" x2="200" y2="250" />
      <line stroke="white" x1="200" y1="250" x2="250" y2="250" />
      <line stroke="white" x1="250" y1="250" x2="390" y2="250" />
      <line stroke="white" x1="100" y1="250" x2="100" y2="20" />
      <line stroke="white" x1="100" y1="20" x2="200" y2="20" />
      <line stroke="white" x1="200" y1="20" x2="200" y2="60" />
    </svg>
  );
}

export default HangmanBody;
