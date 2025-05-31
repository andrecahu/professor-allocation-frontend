import CourseList from '../components/CourseList';
import Layout from '../components/Layout';
import { Container, Typography, Box } from '@mui/material';

function Courses() {
    return (
        <Layout>
            <Container maxWidth="lg">
                <Box sx={{ my: 4 }}>
                    <CourseList />
                </Box>
            </Container>
        </Layout>
    );
}

export default Courses;
