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
    const [dayOfWeek, setDayOfWeek] = useState('');
    const [startHour, setStartHour] = useState('');
    const [endHour, setEndHour] = useState('');
    const [professorId, setProfessorId] = useState<number>(0);
    const [courseId, setCourseId] = useState<number>(0);

    useEffect(() => {
        fetchAllocations();
    }, []);

    const fetchAllocations = async () => {
        const response = await api.get('/allocations');
        setAllocations(response.data);
    };

    const createAllocation = async () => {
        await api.post('/allocations', {
            dayOfWeek,
            startHour,
            endHour,
            professorId,
            courseId
        });
        fetchAllocations();
    };

    return (
        <Box sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Alocações
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
                <TextField label="Dia da Semana" value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)} size="small" />
                <TextField label="Hora de Início" value={startHour} onChange={(e) => setStartHour(e.target.value)} size="small" />
                <TextField label="Hora de Fim" value={endHour} onChange={(e) => setEndHour(e.target.value)} size="small" />
                <TextField label="ID do Professor" type="number" value={professorId} onChange={(e) => setProfessorId(Number(e.target.value))} size="small" />
                <TextField label="ID do Curso" type="number" value={courseId} onChange={(e) => setCourseId(Number(e.target.value))} size="small" />
                <Button onClick={createAllocation} variant="contained">Criar</Button>
            </Box>

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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default AllocationList;
