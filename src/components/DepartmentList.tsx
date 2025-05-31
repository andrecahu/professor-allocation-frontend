import { useEffect, useState } from 'react';
import api from '../services/api';
import { Button, TextField, List, ListItem, ListItemText, Paper, Typography, Container } from '@mui/material';

interface Department {
    id: number;
    name: string;
}

function DepartmentList() {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [name, setName] = useState('');

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        const response = await api.get('/departments');
        setDepartments(response.data);
    };

    const createDepartment = async () => {
        await api.post('/departments', { name });
        setName('');
        fetchDepartments();
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>Departamentos</Typography>
            <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                <TextField label="Nome" value={name} onChange={(e) => setName(e.target.value)} fullWidth margin="normal" />
                <Button onClick={createDepartment} variant="contained" color="primary" style={{ marginTop: '8px' }}>Criar</Button>
            </Paper>
            <Paper elevation={3}>
                <List>
                    {departments.map((dept) => (
                        <ListItem key={dept.id}>
                            <ListItemText primary={dept.name} />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Container>
    );
}

export default DepartmentList;
