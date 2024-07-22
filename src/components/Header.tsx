import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import { Button, Container } from '@mui/material';

interface HeaderProps {
  bannerImage: string;
  navBackgroundColour: string;
}

const HeaderWrapper = styled(Box)<{ bannerImage: string }>(({ theme, bannerImage }) => ({
  position: 'relative',
  width: '100%',
  height: '200px',
  background: `linear-gradient(90deg, #36231C 18.92%, rgba(54, 35, 28, 0) 50.56%, #36231C 80.88%), url(${bannerImage}) no-repeat center/cover`,
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  boxSizing: 'border-box',
}));

const DesktopMenu = styled(AppBar)({
  width: '100%',
  height: '52px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 0,
  background: '#4F372F',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.16)',
});

const MenuContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  height: '100%',
});

const StyledButton = styled(Button)<{ selected?: boolean }>(({ selected }) => ({
  color: '#fff',
  borderBottom: selected ? '3px solid #fff' : 'none',
  borderRadius: 0,
  padding: '10px 100px',
  fontSize: selected ? '1.2rem' : '1rem',
  fontWeight: selected ? 'bold' : 'normal',
  '&:hover': {
    backgroundColor: 'transparent',
    borderBottom: '3px solid #fff',
  },
}));

const Header: React.FC<HeaderProps> = ({ bannerImage, navBackgroundColour }) => {
  const [selectedButton, setSelectedButton] = useState<string>('MENU');

  return (
    <>
      <DesktopMenu position="static" sx={{ background: navBackgroundColour }}>
        <Toolbar>
          <MenuContainer maxWidth="lg">
            <StyledButton
              selected={selectedButton === 'MENU'}
              onClick={() => setSelectedButton('MENU')}
            >
              MENU
            </StyledButton>
            <StyledButton
              selected={selectedButton === 'LOGIN'}
              onClick={() => setSelectedButton('LOGIN')}
            >
              LOGIN
            </StyledButton>
            <StyledButton
              selected={selectedButton === 'CONTACT'}
              onClick={() => setSelectedButton('CONTACT')}
            >
              CONTACT
            </StyledButton>
          </MenuContainer>
        </Toolbar>
      </DesktopMenu>
      <HeaderWrapper bannerImage={bannerImage} />
    </>
  );
};

export default Header;
