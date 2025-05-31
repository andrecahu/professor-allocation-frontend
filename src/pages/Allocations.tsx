import AllocationList from '../components/AllocationList';
import Layout from '../components/Layout';
import { Container, Typography, Box } from '@mui/material';

function Allocations() {
 return (
 <Layout>
 <Container maxWidth="lg">
 <Box sx={{ my: 4 }}>   
 <AllocationList />
 </Box>
 </Container>
 </Layout>
 );
}

export default Allocations;
