import { useState, useRef, useEffect } from "react";
import './Menu.css'

type MenuOption = {
  label: string;
  path: string;
};

type Props = {
  options: MenuOption[];
  onNavigate: (path: string) => void;
};

const Menu = ({ options, onNavigate }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  return (
    <div ref={ref} className="menu-wrapper">
      <button className="dots-btn" onClick={() => setOpen(prev => !prev)}>
        &#x22EE;
      </button>

      {open && (
        <div className="menu-popup">
          {options.map(opt => (
            <button key={opt.path} className="menu-item" onClick={() => { onNavigate(opt.path); setOpen(false); }}>
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
