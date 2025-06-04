import { Typography, Container, Box, Card, CardContent } from '@mui/material';
import Layout from '../components/Layout'; // Certifique-se que o caminho está correto

function Home() {
    return (
            <Container maxWidth="md">
                <Box sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
                    <Typography variant="h2" component="h1" gutterBottom>
                        Professor Allocation
                    </Typography>
                    <Typography variant="h5" color="text.secondary">
                        Gerencie alocações de professores em cursos e departamentos.
                    </Typography>
                </Box>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="body1" paragraph>
                            Bem-vindo ao sistema de Gerenciamento de Alocação de Professores. Utilize o menu de navegação para explorar as funcionalidades do sistema, como visualizar e gerenciar departamentos, cursos, professores e suas alocações.
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
    );
}

export default Home;
