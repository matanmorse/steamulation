const PrismIcon = ({size}) => {
    return (
            <svg className="prism-logo-svg" style={{height: `${16 * size}px`, width: `${16 * size}px`}}viewBox="0 0 28 28" fill="none">
              <polygon points="14,2 26,24 2,24" fill="none" stroke="rgba(139,92,246,0.6)" strokeWidth="1"></polygon>
              <polygon points="14,2 26,24 2,24" fill="url(#prism-grad)" opacity="0.3"></polygon>
              <line x1="14" y1="2" x2="14" y2="24" stroke="rgba(139,92,246,0.4)" strokeWidth="0.5"></line>
              <line x1="14" y1="13" x2="26" y2="24" stroke="rgba(6,182,212,0.5)" strokeWidth="0.5"></line>
              <line x1="14" y1="13" x2="2" y2="24" stroke="rgba(239,152,39,0.5)" strokeWidth="0.5"></line>
              <defs>
                <linearGradient id="prism-grad" x1="14" y1="2" x2="14" y2="24" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#8b5cf6"></stop>
                  <stop offset="100%" stopColor="#06b6d4"></stop>
                </linearGradient>
              </defs>
            </svg>
    )
}

export default PrismIcon;