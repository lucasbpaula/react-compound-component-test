import { createContext, useContext, useState } from "react";
import {
  Container,
  Body,
  Frame,
  Header,
  Inner,
  Item,
  Title,
} from "./accordion.styles";

const ToggleContext = createContext();

export const Accordion = ({ children, ...restProps }) => {
  return (
    <Container {...restProps}>
      <Inner>{children}</Inner>
    </Container>
  );
};

Accordion.Title = function AccordionTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Accordion.Frame = function AccordionFrame({ children, ...restProps }) {
  return <Frame {...restProps}>{children}</Frame>;
};

Accordion.Item = function AccordionItem({ children, ...restProps }) {
  const [isShown, setIsShown] = useState(false);

  return (
    <ToggleContext.Provider value={{ isShown, setIsShown }}>
      <Item {...restProps}>{children}</Item>
    </ToggleContext.Provider>
  );
};

Accordion.Header = function AccordionHeader({ children, ...restProps }) {
  const { isShown, setIsShown } = useContext(ToggleContext);

  return (
    <Header onClick={() => setIsShown(!isShown)} {...restProps}>
      {children}
    </Header>
  );
};

Accordion.Body = function AccordionBody({ children, ...restProps }) {
  const { isShown } = useContext(ToggleContext);
  return (
    <Body className={isShown ? "open" : "closed"} {...restProps}>
      {children}
    </Body>
  );
};
