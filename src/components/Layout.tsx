import { Container, Box } from '@mui/material';
import Navbar from './Navbar'; // Assuming Navbar is refactored to be responsive and modern

interface Props {
    children: React.ReactNode;
}

function Layout({ children }: Props) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh', // Ensures the layout takes at least the full viewport height
            }}
        >
            <Navbar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1, // Allows the main content to take up remaining space
                    padding: { xs: 2, md: 4 }, // Responsive padding (smaller on small screens, larger on medium/large)
                    backgroundColor: '#f8f8f8', // A slightly lighter background color
                }}
            >
                <Container maxWidth="md">
                    {children}
                </Container>
            </Box>
        </Box>
    );
}

export default Layout;
