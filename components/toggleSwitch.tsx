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
    height: calc(100 -(68px / 2 + 4px));
    top: 0;
    left: 0;
  }
  @media (max-width: 768px) {
  }
`;

const SwitchWrap = styled.div<{ isRTL?: boolean }>`
  position: relative;
  padding: 4px;
  width: 67px;
  height: calc(67px / 2 + 4px);
  border-radius: calc((67px / 2 + 4px) / 2);
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

  @media (max-width: 768px) {
    width: 58px;
    height: calc(58px / 2 + 4px);
    border-radius: calc((58px / 2 + 4px) / 2);
  }

  @media (max-width: 480px) {
    width: 52px;
    height: calc(52px / 2 + 4px);
    border-radius: calc((52px / 2 + 4px) / 2);
  }
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
  justify-content: ${({ checked, isRTL }) =>
    checked
      ? isRTL
        ? 'flex-end'
        : 'flex-end'
      : isRTL
      ? 'flex-start'
      : 'flex-start'};
  transition: justify-content 0.3s ease;

  &::after {
    content: '${({ isRTL }) => (isRTL ? 'עב' : 'EN')}';
    font-size: 1rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    background: ${({ checked }) => (checked ? '#0b0ee6' : '#e6120b')};
    border-radius: 50%;
    transition: background 0.3s ease;

    @media (max-width: 768px) {
      width: 22px;
      height: 22px;
      font-size: 0.75rem;
    }

    @media (max-width: 480px) {
      width: 20px;
      height: 20px;
      font-size: 0.7rem;
    }
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
