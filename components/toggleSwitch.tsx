import React from 'react';
import styled from '@emotion/styled';

const ToggleWrapper = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  top: 2rem;
  left: 2rem;
  @media (max-width: 1220px) {
    top: 0;
    left: 0;
  }
  @media (max-width: 480px) {
    /* Invisible padding widens the tap target to 44px+ without resizing the visible switch */
    padding: 8px;
    margin: -8px;
  }
`;

const SwitchWrap = styled.div<{ isRTL?: boolean }>`
  position: relative;
  padding: 0.25rem;
  width: clamp(3.25rem, 6vw, 4.1875rem);
  height: clamp(1.875rem, 3vw, 2.34375rem);
  border-radius: 50%;
  display: flex;
  align-items: center;
  background-size: cover;
  background-position: right 35% bottom 45%;
  background-repeat: no-repeat;
  /* filter: blur(0.3px) invert(0.03) opacity(0.8) saturate(0.8); */
  background-image: ${({ isRTL }) =>
    isRTL
      ? `url("/images/israel-flag.svg")`
      : `url("/images/united-states.svg")`};
`;

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const Switch = styled.div<{ checked: boolean; isRTL?: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: ${({ checked }) => (checked ? 'flex-end' : 'flex-start')};
  transition: justify-content 0.3s ease;

  &::after {
    content: '${({ isRTL }) => (isRTL ? 'עב' : 'EN')}';
    font-size: clamp(0.7rem, 1.5vw, 1rem);
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    width: clamp(1.25rem, 3vw, 1.875rem);
    height: clamp(1.25rem, 3vw, 1.875rem);
    background: ${({ checked }) => (checked ? '#0b0ee6' : '#e6120b')};
    border-radius: 50%;
    transition: background 0.3s ease;
  }
`;

type ToggleSwitchProps = {
  onToggle: () => void;
  isOn: boolean;
  children: React.ReactNode;
  isRTL: boolean;
};

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  isOn,
  onToggle,
  children,
  isRTL,
}) => {
  return (
    <ToggleWrapper>
      <SwitchWrap isRTL={isRTL}>
        <HiddenCheckbox
          type='checkbox'
          checked={isOn}
          onChange={onToggle}
          id='toggle'
        />
        <Switch checked={isOn} isRTL={isRTL} />
      </SwitchWrap>
      {children}
    </ToggleWrapper>
  );
};

export default ToggleSwitch;
