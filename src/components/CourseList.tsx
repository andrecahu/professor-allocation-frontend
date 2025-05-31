import { useEffect, useState } from 'react';
import api from '../services/api';
import { Button, TextField, List, ListItem, ListItemText, Paper, Typography, Container } from '@mui/material';

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
 <TextField label="Nome" value={name} onChange={(e) => setName(e.target.value)} fullWidth style={{ marginRight: '8px' }} />
 <Button onClick={createCourse} variant="contained" color="primary" style={{ marginTop: '16px' }}>
 Criar
 </Button>
 </Paper>

 <List component={Paper} elevation={2}>
 {courses.map((course) => (
 <ListItem key={course.id}>
 <ListItemText primary={course.name} />
 </ListItem>
 ))}
 </List>
 </Container>
 );
}

export default CourseList;
