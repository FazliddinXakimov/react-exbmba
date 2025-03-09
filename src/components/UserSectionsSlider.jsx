import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ScrollContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-top: 10px;
  margin-bottom: 20px;
  white-space: nowrap;
  scrollbar-width: none; /* Hides scrollbar in Firefox */
  text-align: center;
  &::-webkit-scrollbar {
    display: none; /* Hides scrollbar in Chrome, Safari, Edge */
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

const ScrollableSlider = () => {
  const scrollRef = useRef(null);
  const itemsRef = useRef([]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const navigate = useNavigate();

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

  const sections = [
    {
      route: "/profile/user-information",
      title: "User Information",
    },
    {
      route: "/profile/user-referrals",
      title: "User Referrals",
    },
    {
      route: "/profile/user-results",
      title: "User Results",
    },
    {
      route: "/profile/user-subscriptions",
      title: "User Subscriptions",
    },
  ];

  return (
    <ScrollContainer ref={scrollRef}>
      {sections.map((section, index) => (
        <SlideItem
          key={index}
          ref={(el) => (itemsRef.current[index] = el)}
          onClick={() => scrollToCenter(index, section.route)}
          selected={selectedIndex === index}
        >
          {section.title}
        </SlideItem>
      ))}
    </ScrollContainer>
  );
};

export default ScrollableSlider;
