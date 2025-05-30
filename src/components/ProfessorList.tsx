import { useEffect, useState } from 'react';
import api from '../services/api';
import { Button, TextField, List, ListItem, ListItemText } from '@mui/material';

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
        await api.post('/professors', { name, cpf, departmentId });
        fetchProfessors();
    };

    return (
        <div>
            <h2>Professores</h2>
            <TextField label="Nome" value={name} onChange={(e) => setName(e.target.value)} />
            <TextField label="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} />
            <TextField
                label="Department ID"
                type="number"
                value={departmentId}
                onChange={(e) => setDepartmentId(Number(e.target.value))}
            />
            <Button onClick={createProfessor} variant="contained">Criar</Button>

            <List>
                {professors.map((prof) => (
                    <ListItem key={prof.id}>
                        <ListItemText primary={`${prof.name} - ${prof.cpf}`} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default ProfessorList;
