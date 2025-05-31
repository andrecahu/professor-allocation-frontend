import ProfessorList from '../components/ProfessorList';
import Layout from '../components/Layout';
import { Container, Typography, Box } from '@mui/material';

function Professors() {
    return (
        <Layout>
            <Container>
                <Box my={4}>
                    <ProfessorList />
                </Box>
            </Container>
        </Layout>
    );
}

export default Professors;
