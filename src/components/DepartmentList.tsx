import { useEffect, useState } from 'react';
import api from '../services/api';
import { Button, TextField, Paper, Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@mui/material';

interface Department {
    id: number;
    name: string;
}

function DepartmentList() {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [name, setName] = useState('');
    const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        const response = await api.get('/departments');
        setDepartments(response.data);
    };

    const handleEditDepartment = (department: Department) => {
        setEditingDepartment(department);
        setName(department.name);
    };

    const handleDeleteDepartment = async (id: number) => {
        await api.delete(`/departments/${id}`);
        fetchDepartments();
    };

    const createDepartment = async () => {
        await api.post('/departments', { name });
        setName('');
        fetchDepartments();
    };

    const handleSaveDepartment = async () => {
        if (editingDepartment) {
            await api.put(`/departments/${editingDepartment.id}`, { name });
        } else {
            await api.post('/departments', { name });
        }
        setName('');
        setEditingDepartment(null);
        fetchDepartments();
    };


    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>Departamentos</Typography>
            <Paper elevation={3} sx={{ padding: '16px', marginBottom: '16px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField label="Nome" value={name} onChange={(e) => setName(e.target.value)} fullWidth margin="normal" />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={editingDepartment ? handleSaveDepartment : createDepartment} variant="contained" color="primary">
                            {editingDepartment ? 'Salvar' : 'Criar'}
                        </Button>
                        {editingDepartment && <Button onClick={() => { setName(''); setEditingDepartment(null); }} variant="outlined" sx={{ ml: 1 }}>Cancelar Edição</Button>}
                    </Box>
                </Box>
            </Paper>
            <Paper elevation={3}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome do Departamento</TableCell>
                                <TableCell>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {departments.map((dept) => (
                                <TableRow key={dept.id}>
                                    <TableCell>{dept.name}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleEditDepartment(dept)} variant="outlined" color="primary" size="small" sx={{ mr: 1 }}>Editar</Button>
                                        <Button onClick={() => handleDeleteDepartment(dept.id)} variant="outlined" color="error" size="small">Excluir</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
}
export default DepartmentList;
