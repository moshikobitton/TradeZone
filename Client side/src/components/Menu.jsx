import { useEffect, useState } from "react";

export default function Manu({ active, setActive, setCategory }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMenuOpen(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const links = [
    { id: 1, name: "General", value: "general" },
    { id: 2, name: "Business", value: "business" },
    { id: 3, name: "Entertainment", value: "entertainment" },
    { id: 4, name: "Health", value: "health" },
    { id: 5, name: "Science", value: "science" },
    { id: 6, name: "Sports", value: "sports" },
    { id: 7, name: "Technology", value: "technology" },
  ];

  const changeCategory = (id, value) => {
    setActive(id);
    setCategory(value);
  };
  return (
    <nav>
      <div
        className="menu-icon"
        onClick={() => setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen)}
      >
        &#9776; Categories
      </div>
      <ul className={isMenuOpen ? "menu-open" : "menu-ul"}>
        {links.map((link) => (
          <li
            key={link.id}
            className={active === link.id ? "active" : "inactive"}
            onClick={() => changeCategory(link.id, link.value)}
          >
            {link.name}
          </li>
        ))}
      </ul>
    </nav>
  );
}
