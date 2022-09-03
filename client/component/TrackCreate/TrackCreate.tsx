import { Card, Grid, Step, StepLabel, Stepper } from '@mui/material';
import { Container } from '@mui/system';
import { useRouter } from 'next/router';
import * as React from 'react';

interface TrackCreateProps {
    activeStep: number;
    children?: React.ReactNode;
}

const steps = ['Информация о треке', 'Загрузка обложки', 'Загрузка трека']

const TrackCreate: React.FC<TrackCreateProps> = ({ activeStep, children }) => {

    const router = useRouter();

    return (
        <Container>
            <Stepper activeStep={activeStep}>
                {
                    steps.map((el, idx) =>
                        <Step key={idx} completed={activeStep > idx}>
                            <StepLabel>{el}</StepLabel>
                        </Step >)
                }
            </Stepper >
            <Grid justifyContent={'center'} marginTop={5}>
                <Card style={{ height: 370, }} >
                    {children}
                </Card>
            </Grid>
        </Container >
    );
}

export default TrackCreate;