import { Container, Box } from '@mui/material';
import Navbar from './Navbar';

interface Props {
    children: React.ReactNode;
}

function Layout({ children }: Props) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh', 
            }}
        >
            <Navbar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    padding: { xs: 2, md: 4 },
                    backgroundColor: '#f8f8f8',
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
