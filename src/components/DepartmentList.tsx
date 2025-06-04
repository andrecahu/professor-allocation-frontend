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
            <Paper elevation={3} sx={{ padding: '16px', marginBottom: '16px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField label="Nome" value={name} onChange={(e) => setName(e.target.value)} fullWidth margin="normal" />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
 <Button onClick={createDepartment} variant="contained" color="primary">Criar</Button>
                    </Box>
                </Box>
            </Paper>
 <Paper elevation={3}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome do Departamento</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {departments.map((dept) => (
                                <TableRow key={dept.id}>
                                    <TableCell>{dept.name}</TableCell>
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
