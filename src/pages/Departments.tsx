import DepartmentList from '../components/DepartmentList';
import Layout from '../components/Layout';
import { Container, Typography, Box } from '@mui/material';

function Departments() {
    return (
        <Container>
            <Box sx={{ my: 4 }}>
                <DepartmentList />
            </Box>
        </Container>
    );
}

export default Departments;
