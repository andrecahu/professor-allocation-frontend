import AllocationList from '../components/AllocationList';
import { Container, Box } from '@mui/material';

function Allocations() {
    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                <AllocationList />
            </Box>
        </Container>
    );
}

export default Allocations;
