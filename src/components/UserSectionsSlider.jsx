import React, { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
const sections = [
  {
    route: "/profile/user-information",
    title: "user_data",
  },
  {
    route: "/profile/user-referrals",
    title: "referral_balance",
  },
  {
    route: "/profile/user-results",
    title: "my_results",
  },
  {
    route: "/profile/user-results",
    title: "my_cards",
  },
  {
    route: "/profile/user-subscriptions",
    title: "my_subscriptions",
  },
];

const ScrollableSlider = () => {
  const scrollRef = useRef(null);
  const itemsRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  const { t } = useTranslation();

  // Get the index based on the current route
  const getCurrentIndex = () => {
    return sections.findIndex((section) => section.route === location.pathname);
  };
  const [selectedIndex, setSelectedIndex] = React.useState(getCurrentIndex());

  useEffect(() => {
    // Update selected index when the route changes
    const currentIndex = getCurrentIndex();
    setSelectedIndex(currentIndex);

    // Scroll to the selected item
    if (scrollRef.current && itemsRef.current[currentIndex]) {
      const container = scrollRef.current;
      const item = itemsRef.current[currentIndex];

      const containerCenter = container.offsetWidth / 2;
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;

      container.scrollTo({
        left: itemCenter - containerCenter,
        behavior: "smooth",
      });
    }
  }, [location.pathname]); // Runs when the URL changes

  const scrollToCenter = (index, routePath) => {
    if (scrollRef.current && itemsRef.current[index]) {
      const container = scrollRef.current;
      const item = itemsRef.current[index];

      const containerCenter = container.offsetWidth / 2;
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;

      container.scrollTo({
        left: itemCenter - containerCenter,
        behavior: "smooth",
      });

      setSelectedIndex(index);
      navigate(routePath, { replace: true });
    }
  };

  return (
    <ScrollContainer ref={scrollRef}>
      {sections.map((section, index) => (
        <SlideItem
          key={index}
          ref={(el) => (itemsRef.current[index] = el)}
          onClick={() => scrollToCenter(index, section.route)}
          selected={selectedIndex === index}
        >
          {t(section.title)}
        </SlideItem>
      ))}
    </ScrollContainer>
  );
};

export default ScrollableSlider;

const ScrollContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-top: 10px;
  margin-bottom: 20px;
  white-space: nowrap;
  scrollbar-width: none;
  text-align: center;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SlideItem = styled.div`
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
  padding: 6px 8px;
  background: ${(props) =>
    props.selected ? "var(--primary-color)" : "var(--slate-color)"};
  color: ${(props) => (props.selected ? "white" : "black")};
  border: 1px solid
    ${(props) => (props.selected ? "transparent" : "var(--slate-color)")};
  font-weight: 500;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background 0.3s ease;
`;
