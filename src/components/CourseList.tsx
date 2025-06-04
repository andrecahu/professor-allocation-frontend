import { useEffect, useState } from 'react';
import api from '../services/api';
import { Button, TextField, Paper, Typography, Container, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Box } from '@mui/material';

interface Course {
    id: number;
    name: string;
}

function CourseList() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [name, setName] = useState('');

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        const response = await api.get('/courses');
        setCourses(response.data);
    };

    const createCourse = async () => {
        await api.post('/courses', { name });
        setName('');
        fetchCourses();
    };

 return (
 <Container>
 <Typography variant="h4" component="h2" gutterBottom>
 Cursos
 </Typography>
 <Paper elevation={2} style={{ padding: '16px', marginBottom: '16px' }}>
 <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }}>
 <TextField label="Nome" value={name} onChange={(e) => setName(e.target.value)} fullWidth sx={{ mb: { xs: 2, sm: 0 } }} />
 </Box>
 <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
 <Button onClick={createCourse} variant="contained" color="primary" sx={{ mt: { xs: 2, sm: 0 } }}>
 Criar
 </Button>
 </Box>
 </Paper>


 <TableContainer component={Paper} elevation={2}>
 <Table>
 <TableHead>
 <TableRow>
 <TableCell>Nome do Curso</TableCell>
 </TableRow>
 </TableHead>
 <TableBody>
 {courses.map((course) => (
 <TableRow key={course.id}>
 <TableCell>{course.name}</TableCell>
 </TableRow>
 ))}
 </TableBody>
 </Table>
 </TableContainer>
 </Container>
 );
}

export default CourseList;

