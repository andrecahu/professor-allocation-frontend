import CourseList from '../components/CourseList';
import Layout from '../components/Layout';
import { Container, Typography, Box } from '@mui/material';

function Courses() {
    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                <CourseList />
            </Box>
        </Container>
    );
}
export default Courses;
