import ProfessorList from '../components/ProfessorList';
import Layout from '../components/Layout';
import { Container, Typography, Box } from '@mui/material';

function Professors() {
    return (
        <Container>
            <Box my={4}>
                <ProfessorList />
            </Box>
        </Container>
    );
}

export default Professors;
