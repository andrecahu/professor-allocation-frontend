import { useEffect, useState } from 'react';
import api from '../services/api';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';

interface Allocation {
    id: number;
    dayOfWeek: string;
    startHour: string;
    endHour: string;
    professorId: number;
    courseId: number;
}

function AllocationList() {
    const [allocations, setAllocations] = useState<Allocation[]>([]);
    const [dayOfWeek, setDayOfWeek] = useState<string>('');
    const [startHour, setStartHour] = useState<string>('');
    const [endHour, setEndHour] = useState<string>('');
    const [professorId, setProfessorId] = useState<number>(0);
    const [courseId, setCourseId] = useState<number>(0);
    const [editingAllocation, setEditingAllocation] = useState<Allocation | null>(null);

    const clearForm = () => {
        setDayOfWeek('');
        setStartHour('');
        setEndHour('');
        setProfessorId(0);
        setCourseId(0);
    };

    useEffect(() => {
        fetchAllocations();
    }, []);

    const fetchAllocations = async () => {
        const response = await api.get('/allocations');
        setAllocations(response.data);
    };

    const handleEditAllocation = (allocation: Allocation) => {
        setEditingAllocation(allocation);
        setDayOfWeek(allocation.dayOfWeek);
        setStartHour(allocation.startHour);
        setEndHour(allocation.endHour);
        setProfessorId(allocation.professorId);
        setCourseId(allocation.courseId);
        setEditingAllocation(allocation);
    };

    const handleDeleteAllocation = async (id: number) => {
        await api.delete(`/allocations/${id}`);
        fetchAllocations();
    };

    const createAllocation = async () => {
        if (dayOfWeek && startHour && endHour && professorId > 0 && courseId > 0) {
            await api.post('/allocations', {
                dayOfWeek,
                startHour,
                endHour,
                professorId,
                courseId
            });
            fetchAllocations();
        } else {
            console.log('Please fill all fields');
        }
    };

    const handleSaveAllocation = async () => {
        if (dayOfWeek && startHour && endHour && professorId > 0 && courseId > 0) {
            if (editingAllocation) {
                await api.put(`/allocations/${editingAllocation.id}`, {
                    startHour,
                    endHour,
                    professorId,
                    courseId
                });
            } else {
                await api.post('/allocations', { dayOfWeek, startHour, endHour, professorId, courseId });
            }
            setEditingAllocation(null);
            clearForm();
            fetchAllocations();
        }
    };

    return (
        <Box sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Alocações
            </Typography>
            <Paper elevation={2} sx={{ padding: '16px', marginBottom: '16px', borderRadius: '4px' }}>
                <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                    <TextField label="Dia da Semana" value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)} size="small" />
                    <TextField label="Hora de Início" value={startHour} onChange={(e) => setStartHour(e.target.value)} size="small" />
                    <TextField label="Hora de Fim" value={endHour} onChange={(e) => setEndHour(e.target.value)} size="small" />
                    <TextField label="ID do Professor" type="number" value={professorId} onChange={(e) => setProfessorId(Number(e.target.value))} size="small" />
                    <TextField label="ID do Curso" type="number" value={courseId} onChange={(e) => setCourseId(Number(e.target.value))} size="small" />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    {editingAllocation && (
                        <Button onClick={() => { setEditingAllocation(null); clearForm(); }} variant="outlined">
                            Cancelar Edição
                        </Button>
                    )}
                    <Button onClick={handleSaveAllocation} variant="contained">{editingAllocation ? 'Salvar' : 'Criar'}</Button>
                </Box>
            </Paper>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Dia da Semana</TableCell>
                            <TableCell>Hora de Início</TableCell>
                            <TableCell>Hora de Fim</TableCell>
                            <TableCell>ID do Professor</TableCell>
                            <TableCell>ID do Curso</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allocations.map((alloc) => (
                            <TableRow
                                key={alloc.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{alloc.id}</TableCell>
                                <TableCell>{alloc.dayOfWeek}</TableCell>
                                <TableCell>{alloc.startHour}</TableCell>
                                <TableCell>{alloc.endHour}</TableCell>
                                <TableCell>{alloc.professorId}</TableCell>
                                <TableCell>{alloc.courseId}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleDeleteAllocation(alloc.id)} variant="outlined" color="secondary" size="small">Excluir</Button>
                                    <Button onClick={() => handleEditAllocation(alloc)} variant="outlined" color="primary" size="small" sx={{ ml: 1 }}>Editar</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default AllocationList;
