import CourseList from '../components/CourseList';
import { Container, Box } from '@mui/material';

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
