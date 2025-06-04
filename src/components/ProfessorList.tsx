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
    const [editingProfessor, setEditingProfessor] = useState<Professor | null>(null);

    useEffect(() => {
        fetchProfessors();
    }, []);

    const fetchProfessors = async () => {
        const response = await api.get('/professors');
        setProfessors(response.data);
    };

    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [departmentId, setDepartmentId] = useState<number>(0);

    const handleEditProfessor = (professor: Professor) => {
        setEditingProfessor(professor);
        setName(professor.name);
        setCpf(professor.cpf);
        setDepartmentId(professor.departmentId);
    };

    const handleCancelEdit = () => {
        setEditingProfessor(null);
        setName('');
        setCpf('');
        setDepartmentId(0);
    };

    const handleSaveProfessor = async () => {
        if (!name || !cpf || departmentId <= 0) {
            console.log('Please fill all fields');
            return;
        }
        if (editingProfessor) {
            await api.put(`/professors/${editingProfessor.id}`, { name, cpf, departmentId });
        } else {
            await api.post('/professors', { name, cpf, departmentId });
        }
        handleCancelEdit();
        fetchProfessors();
    };

    const handleDeleteProfessor = async (id: number) => {
        await api.delete(`/professors/${id}`);
        fetchProfessors();
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>{editingProfessor ? 'Editar Professor' : 'Professores'}</Typography>
            <Paper elevation={2} style={{ padding: '16px', marginBottom: '16px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
                        <Button onClick={handleSaveProfessor} variant="contained">
                            {editingProfessor ? 'Salvar' : 'Criar'}
                        </Button>
                        {editingProfessor && <Button onClick={handleCancelEdit} variant="outlined" sx={{ ml: 1 }}>Cancelar Edição</Button>}
                    </Box>
                </Box>
            </Paper>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="professors table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>CPF</TableCell>
                            <TableCell>Ações</TableCell>
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
                                <TableCell>
                                    <Button variant="outlined" color="primary" size="small" sx={{ mr: 1 }} onClick={() => handleEditProfessor(prof)}>Editar</Button>
                                    <Button variant="outlined" color="error" onClick={() => handleDeleteProfessor(prof.id)}>Excluir</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default ProfessorList;
