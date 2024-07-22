import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Grid } from '@mui/material';
import { getRestaurantDetails, getMenuDetails } from '../store/restaurantSlice';
import { RootState, AppDispatch } from '../store';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import MenuSection from '../components/MenuSection';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { details, status, error, menu } = useSelector((state: RootState) => state.restaurant);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    dispatch(getRestaurantDetails());
    dispatch(getMenuDetails());
  }, [dispatch]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <Box sx={{ textAlign: 'center', position: 'relative' }}>
      <Header 
        navBackgroundColour={details?.webSettings.navBackgroundColour || ''} 
        bannerImage={details?.webSettings.bannerImage || ''} 
      />
      <Container maxWidth="lg">
        <SearchBar onSearch={setSearchQuery} />
        <Grid container spacing={3} sx={{ marginTop: '200px' }}>
          {menu?.sections.map((section) => (
            <MenuSection key={section.id} sections={[section]} primaryColour={details?.webSettings.primaryColour || ''} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
