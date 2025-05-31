import DepartmentList from '../components/DepartmentList';
import Layout from '../components/Layout';
import { Container, Typography, Box } from '@mui/material';

function Departments() {
    return (
        <Layout>
            <Container>
                <Box sx={{ my: 4 }}>
                    <DepartmentList />
                </Box>
            </Container>
        </Layout>
    );
}

export default Departments;
