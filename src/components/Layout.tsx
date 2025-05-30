import { Container, Box } from '@mui/material';
import Navbar from './Navbar';

interface Props {
    children: React.ReactNode;
}

function Layout({ children }: Props) {
    return (
        <>
            <Navbar />
            <Box
                component="main"
                sx={{
                    minHeight: '100vh',
                    bgcolor: '#f5f5f5',
                    paddingTop: 2,
                    paddingBottom: 4,
                }}
            >
                <Container maxWidth="md">
                    {children}
                </Container>
            </Box>
        </>
    );
}

export default Layout;
