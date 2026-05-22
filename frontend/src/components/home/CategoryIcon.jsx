/** Flipkart-style category icons: dark outline + yellow accent fill */

const Y = '#ffe11b';
const S = '#212121';

const CategoryIcon = ({ type }) => (
  <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" aria-hidden>
    {type === 'forYou' && (
      <>
        <path d="M8 10h16l-1.2 14H9.2L8 10z" stroke={S} strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M11 10V8.5a5 5 0 0110 0V10" stroke={S} strokeWidth="1.4" strokeLinecap="round" />
        <path d="M12 14h8v6H12z" fill={Y} stroke={S} strokeWidth="1" />
      </>
    )}
    {type === 'fashion' && (
      <>
        <path d="M10 9l6-3 6 3v3H10V9z" stroke={S} strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M8 12h16v11H8V12z" stroke={S} strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M8 20h16v3H8v-3z" fill={Y} stroke={S} strokeWidth="1" />
      </>
    )}
    {type === 'mobiles' && (
      <>
        <rect x="10" y="5" width="12" height="22" rx="2" stroke={S} strokeWidth="1.4" />
        <rect x="11.5" y="8" width="9" height="14" rx="0.5" fill={Y} stroke={S} strokeWidth="0.8" />
        <circle cx="16" cy="24" r="1" fill={S} />
      </>
    )}
    {type === 'beauty' && (
      <>
        <rect x="13" y="6" width="6" height="14" rx="1" stroke={S} strokeWidth="1.4" />
        <path d="M12 20h8v4h-8v-4z" fill={Y} stroke={S} strokeWidth="1" />
        <ellipse cx="16" cy="6" rx="3" ry="1.5" fill={Y} stroke={S} strokeWidth="1" />
      </>
    )}
    {type === 'electronics' && (
      <>
        <rect x="7" y="9" width="18" height="12" rx="1" stroke={S} strokeWidth="1.4" />
        <path d="M11 24h10" stroke={S} strokeWidth="1.4" strokeLinecap="round" />
        <rect x="9" y="11" width="14" height="8" fill={Y} stroke={S} strokeWidth="0.8" />
      </>
    )}
    {type === 'home' && (
      <>
        <path d="M16 7v3" stroke={S} strokeWidth="1.4" strokeLinecap="round" />
        <path d="M10 24h12V14l6-5v15" stroke={S} strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M14 14h4v4h-4z" fill={Y} stroke={S} strokeWidth="1" />
      </>
    )}
    {type === 'appliances' && (
      <>
        <rect x="8" y="8" width="16" height="11" rx="1" stroke={S} strokeWidth="1.4" />
        <path d="M10 24h12" stroke={S} strokeWidth="1.4" strokeLinecap="round" />
        <rect x="10" y="10" width="12" height="7" fill={Y} stroke={S} strokeWidth="0.8" />
      </>
    )}
    {type === 'toys' && (
      <>
        <circle cx="16" cy="14" r="6" stroke={S} strokeWidth="1.4" />
        <circle cx="13" cy="12" r="1" fill={S} />
        <circle cx="19" cy="12" r="1" fill={S} />
        <ellipse cx="16" cy="16" rx="2" ry="1" stroke={S} strokeWidth="1" />
        <circle cx="16" cy="12" r="2.5" fill={Y} stroke={S} strokeWidth="0.8" />
      </>
    )}
    {type === 'food' && (
      <>
        <path d="M12 8h8v16h-8V8z" stroke={S} strokeWidth="1.4" strokeLinejoin="round" />
        <rect x="13" y="12" width="6" height="5" fill={Y} stroke={S} strokeWidth="0.8" />
        <path d="M14 6h4v2h-4V6z" stroke={S} strokeWidth="1.2" />
      </>
    )}
    {type === 'auto' && (
      <>
        <path d="M10 14c0-4 2.7-7 6-7s6 3 6 7v5H10v-5z" stroke={S} strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M8 19h16" stroke={S} strokeWidth="1.4" strokeLinecap="round" />
        <path d="M13 12h6v4h-6v-4z" fill={Y} stroke={S} strokeWidth="0.8" />
      </>
    )}
    {type === 'wheelers' && (
      <>
        <circle cx="11" cy="21" r="2.5" stroke={S} strokeWidth="1.3" />
        <circle cx="21" cy="21" r="2.5" stroke={S} strokeWidth="1.3" />
        <path d="M9 14h14l-2-5H11l-2 5z" stroke={S} strokeWidth="1.4" strokeLinejoin="round" />
        <circle cx="11" cy="21" r="1" fill={Y} />
        <circle cx="21" cy="21" r="1" fill={Y} />
      </>
    )}
    {type === 'sports' && (
      <>
        <path d="M11 8l2 16" stroke={S} strokeWidth="1.6" strokeLinecap="round" />
        <ellipse cx="20" cy="20" rx="4" ry="4" fill={Y} stroke={S} strokeWidth="1.2" />
        <path d="M11 8l4 3" stroke={S} strokeWidth="1.2" />
      </>
    )}
    {type === 'books' && (
      <>
        <path d="M11 7h4v18h-4V7z" stroke={S} strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M17 7h4v18h-4V7z" stroke={S} strokeWidth="1.4" strokeLinejoin="round" />
        <rect x="12" y="9" width="2" height="14" fill={Y} />
      </>
    )}
    {type === 'furniture' && (
      <>
        <path d="M9 12h14v10H9V12z" stroke={S} strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M8 22h16" stroke={S} strokeWidth="1.4" strokeLinecap="round" />
        <path d="M12 14h8v4h-8v-4z" fill={Y} stroke={S} strokeWidth="0.8" />
      </>
    )}
  </svg>
);

export default CategoryIcon;
