import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './store';
import { getRestaurantDetails, getMenuDetails } from './store/restaurantSlice';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MenuSection from './components/MenuSection';
import SectionIcons from './components/SectionIcons';
import Cart from './components/Cart';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { details, menu, status, error } = useSelector((state: RootState) => state.restaurant);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSectionId, setSelectedSectionId] = useState<number>(menu?.sections[0]?.id || 0);
  const sectionRefs = useRef<{ [key: number]: HTMLElement | null }>({});

  useEffect(() => {
    dispatch(getRestaurantDetails());
    dispatch(getMenuDetails());
  }, [dispatch]);

  const handleSectionSelect = (id: number) => {
    setSelectedSectionId(id);
    const sectionElement = sectionRefs.current[id];
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const allItems = menu?.sections.flatMap(section => section.items) || [];
  const filteredItems = allItems.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.name?.toLowerCase().includes(query) ||
      item.description?.toLowerCase().includes(query) ||
      item.price?.toString().includes(query)
    );
  });

  const filteredSections = menu?.sections.map((section) => ({
    ...section,
    items: section.items.filter((item) => {
      const query = searchQuery.toLowerCase();
      return (
        item.name?.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        item.price?.toString().includes(query)
      );
    }),
  })) || [];

  return (
    <>
      {details && (
        <Header bannerImage={details.webSettings.bannerImage} navBackgroundColour={details.webSettings.navBackgroundColour} />
      )}
      <Container maxWidth="lg" sx={{ marginTop: '20px' }}>
        {status === 'loading' && <Typography variant="h6">Loading...</Typography>}
        {error && <Typography variant="h6">Error: {error}</Typography>}
        {details && (
          <>
            <Box sx={{ my: 2 }}>
              <SearchBar onSearch={setSearchQuery} />
            </Box>
            <Card sx={{ backgroundColor: '#F8F9FA', padding: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Card>
                    <CardContent>
                      <SectionIcons
                        sections={menu?.sections.map(section => ({
                          id: section.id,
                          name: section.name,
                          images: section.images || [{ image: 'default_image_url' }],
                        })) || []}
                        selectedSectionId={selectedSectionId}
                        onSelect={handleSectionSelect}
                      />
                      {filteredSections.length === 0 ? (
                        <Typography variant="h6">Item not found</Typography>
                      ) : (
                        filteredSections.map((section) => (
                          <div
                            key={section.id}
                            ref={(el) => (sectionRefs.current[section.id] = el)}
                          >
                            <MenuSection sections={[section]} primaryColour={details.webSettings.primaryColour} />
                          </div>
                        ))
                      )}
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardContent>
                      <Cart />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Card>
          </>
        )}
      </Container>
    </>
  );
};

export default App;
