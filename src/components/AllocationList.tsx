import { useEffect, useState } from 'react';
import api from '../services/api';
import { Button, TextField, List, ListItem, ListItemText } from '@mui/material';

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
        <div>
            <h2>Alocações</h2>
            <TextField label="Dia da Semana" value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)} />
            <TextField label="Hora de Início" value={startHour} onChange={(e) => setStartHour(e.target.value)} />
            <TextField label="Hora de Fim" value={endHour} onChange={(e) => setEndHour(e.target.value)} />
            <TextField label="ID do Professor" type="number" value={professorId} onChange={(e) => setProfessorId(Number(e.target.value))} />
            <TextField label="ID do Curso" type="number" value={courseId} onChange={(e) => setCourseId(Number(e.target.value))} />
            <Button onClick={createAllocation} variant="contained">Criar</Button>

            <List>
                {allocations.map((alloc) => (
                    <ListItem key={alloc.id}>
                        <ListItemText primary={`Dia: ${alloc.dayOfWeek}, ${alloc.startHour}-${alloc.endHour}, Prof: ${alloc.professorId}, Curso: ${alloc.courseId}`} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default AllocationList;
