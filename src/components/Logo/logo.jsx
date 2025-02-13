export default function Logo() {
    return (
      <svg width="150" height="80" viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#001f3f" stopOpacity="1" />
            <stop offset="100%" stopColor="#1abc9c" stopOpacity="1" />
          </linearGradient>
        </defs>
  
        {/* Background */}
        <rect rx="20" ry="20" width="180" height="70" fill="url(#grad1)" />
  
        {/* Group Icon + Text Together */}
        <g transform="translate(10, 35)"> 
          {/* Shopping Bag Icon - Adjusted Position */}
          <g transform="translate(0, -20)">
            <path d="M10,10 L30,10 L30,30 L10,30 Z M20,15 L20,25" stroke="#ffffff" strokeWidth="2" fill="none" />
            <circle cx="20" cy="8" r="3" fill="#ffffff" />
          </g>
  
          {/* Logo Text - Adjusted Position */}
          <text x="35" y="10" fontFamily="Arial, sans-serif" fontSize="24" fill="#ffffff" fontWeight="bold">
            Shop
          </text>
          <text x="95" y="10" fontFamily="Arial, sans-serif" fontSize="24" fill="#ffffff">
            verse
          </text>
        </g>
      </svg>
    );
  }
  