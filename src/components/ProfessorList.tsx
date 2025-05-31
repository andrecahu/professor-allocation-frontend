import { useEffect, useState } from 'react';
import api from '../services/api';
import { Button, TextField, List, ListItem, ListItemText, Typography, Paper, Box } from '@mui/material';

interface Professor {
    id: number;
    name: string;
    cpf: string;
    departmentId: number;
}

function ProfessorList() {
    const [professors, setProfessors] = useState<Professor[]>([]);
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [departmentId, setDepartmentId] = useState<number>(0);

    useEffect(() => {
        fetchProfessors();
    }, []);

    const fetchProfessors = async () => {
        const response = await api.get('/professors');
        setProfessors(response.data);
    };

    const createProfessor = async () => {
 if (name && cpf && departmentId) {
 await api.post('/professors', { name, cpf, departmentId });
            setName('');
            setCpf('');
            setDepartmentId(0);
 fetchProfessors();
 } else {
 console.log('Please fill all fields'); // Or show a user-friendly message
 }
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>Professores</Typography>
            <Box sx={{ display: 'flex', gap: 2, marginBottom: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
                <TextField label="Nome" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
                <TextField label="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} fullWidth />
                <TextField
                    label="Department ID"
                    type="number"
                    value={departmentId}
                    onChange={(e) => setDepartmentId(Number(e.target.value))}
 fullWidth />
            </Box>
            <Button onClick={createProfessor} variant="contained" sx={{ mb: 2 }}>Criar</Button>

            <List>
                {professors.map((prof) => (
                    <ListItem key={prof.id}>
                        <ListItemText primary={`${prof.name} - ${prof.cpf}`} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default ProfessorList;
