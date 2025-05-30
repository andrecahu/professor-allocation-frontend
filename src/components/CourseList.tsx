import { useEffect, useState } from 'react';
import api from '../services/api';
import { Button, TextField, List, ListItem, ListItemText } from '@mui/material';

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
        <div>
            <h2>Cursos</h2>
            <TextField label="Nome" value={name} onChange={(e) => setName(e.target.value)} />
            <Button onClick={createCourse} variant="contained">Criar</Button>

            <List>
                {courses.map((course) => (
                    <ListItem key={course.id}>
                        <ListItemText primary={course.name} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default CourseList;
