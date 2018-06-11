import React from 'react';
import { Link } from 'react-router-dom';
import styled, { withTheme } from 'styled-components';
import { lighten, darken } from 'polished';

const StyledNotification = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => lighten(0.3, props.theme.colors.secondary)};
  padding: 2em;
`;

const Title = styled.div`
  font-family: $header_font_family;
  letter-spacing: 1px;
  font-size: 1.4em;
  text-transform: capitalize;
  font-weight: 700;
  color: ${props => darken(0.4, props.theme.colors.secondary)};
  padding-bottom: 0.2em;
  margin-bottom: 0.5em;
`;
const NotificationBody = styled.div`
  line-height: 1.4em;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1em;
`;
const Action = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 0px;
  margin: 0px;
`;
const ActionLink = styled(Link)`
  color: ${props => darken(0.1, props.theme.colors.secondary)};
`;
/**
 * COMPONENT
 */
const Notification = (props) => {
  const {
    title, message, linkText, linkURI,
  } = props;
  return (
    <StyledNotification>
      <Title>{title}</Title>
      <NotificationBody>{props.children}</NotificationBody>
      <Action>
        <ActionLink to="/about">Learn More</ActionLink>
      </Action>
    </StyledNotification>
  );
};

export default withTheme(Notification);
