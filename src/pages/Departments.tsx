import DepartmentList from '../components/DepartmentList';
import { Container, Box } from '@mui/material';

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
