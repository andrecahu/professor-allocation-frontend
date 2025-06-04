import { useEffect, useState } from 'react';
import api from '../services/api';
import { Button, TextField, Paper, Typography, Container, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Box, Stack } from '@mui/material';

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

    const [editingCourse, setEditingCourse] = useState<Course | null>(null);

    const handleEditCourse = (course: Course) => {
        setEditingCourse(course);
        setName(course.name);
    };

    const handleDeleteCourse = async (id: number) => {
        await api.delete(`/courses/${id}`);
        fetchCourses();
    };

    const handleSaveCourse = async () => {
        if (editingCourse) {
            await api.put(`/courses/${editingCourse.id}`, { name });
        } else {
            await api.post('/courses', { name });
        }
        setEditingCourse(null);
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
                    {editingCourse && ( // Show Cancel button when editing
                        <Button onClick={() => { setName(''); setEditingCourse(null); }} variant="outlined" sx={{ mr: 1 }}>
                            Cancelar Edição
                        </Button>
                    )}
                    <Button onClick={editingCourse ? handleSaveCourse : createCourse} variant="contained" color="primary">
                        {editingCourse ? 'Salvar' : 'Criar'}
                    </Button>
                </Box>
            </Paper>


            <TableContainer component={Paper} elevation={2}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {courses.map((course) => (
                            <TableRow key={course.id}>
                                <TableCell>{course.name}</TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={1}>
                                        <Button onClick={() => handleEditCourse(course)} variant="contained" color="primary" size="small">Editar</Button>
                                        <Button onClick={() => handleDeleteCourse(course.id)} variant="contained" color="secondary" size="small">Excluir</Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default CourseList;

