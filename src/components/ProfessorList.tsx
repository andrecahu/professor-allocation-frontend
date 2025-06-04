import { useEffect, useState } from 'react';
import api from '../services/api';
import { Button, TextField, Typography, Paper, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

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
            <Paper elevation={2} style={{ padding: '16px', marginBottom: '16px' }}>{/* Paper envolvendo o formulário */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>{/* Novo Box pai para organizar verticalmente */}
                    <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>{/* Box dos campos de texto */}
                        <TextField label="Nome" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
                        <TextField label="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} fullWidth />
                        <TextField
                            label="Department ID"
                            type="number"
                            value={departmentId}
                            onChange={(e) => setDepartmentId(Number(e.target.value))}
                            fullWidth />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>{/* Box para alinhar o botão à direita */}
                        <Button onClick={createProfessor} variant="contained">Criar</Button>
                    </Box>
                </Box>
            </Paper>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="professors table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>CPF</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                {professors.map((prof) => (
                            <TableRow
                                key={prof.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{prof.name}</TableCell>
                                <TableCell>{prof.cpf}</TableCell>
                            </TableRow>
                ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default ProfessorList;
