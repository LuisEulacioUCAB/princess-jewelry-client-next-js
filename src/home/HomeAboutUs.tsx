import React from 'react';
import { Box, Container, Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    boxTitle: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    box1: {
      paddingTop: theme.spacing(10),
      paddingBottom: theme.spacing(10),
    },
    box2: {
      paddingTop: theme.spacing(12),
      paddingBottom: theme.spacing(12),
    },
    container2: {
      backgroundImage: 'url("/products.svg")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
    container3: {
      backgroundColor: '#8E785F',
    },
    aboutUs: {
      textAlign: 'justify',
    },
  }),
);

export const HomeAboutUs: React.FC = () => {
  const classes = useStyles();
  return (
    <>
      <Box>
        <Container>
          <Box className={classes.box}>
            <Grid container spacing={6} alignItems='center'>
              <Grid item xs={7}>
                <Box className={classes.boxTitle}>
                  <Typography variant='h3'>NOSOTROS</Typography>
                </Box>
                <Box>
                  <Typography variant='subtitle1' className={classes.aboutUs}>
                    Princess jewelry es una compañia fundada en el año 2021 en España , por la familia Urdaneta Parra ,
                    como primer objetivo tenemos la venta de joyas en plata esterlina 925 ,elaborada en cualquier parte
                    del mundo, siempre que mantenga nuestros estandares de calidad y diseño, nuestra familia se ha
                    dedicado al fascinante mundo de la joyeria durante mas de 20 años, tiempo en el cual hemos podido
                    pasar por todo el proceso de elaboración de una prenda , llegando esto a darnos una gran visión del
                    mundo de las joyas.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={5}>
                <img alt='ring' width='100%' src='/ring.webp' />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      <Box>
        <Container>
          <Box className={classes.box}>
            <Grid container spacing={6} alignItems='center'>
              <Grid item xs={5}>
                <img alt='ring' width='100%' src='/ring.webp' />
              </Grid>
              <Grid item xs={7}>
                <Box className={classes.boxTitle}>
                  <Typography variant='h3'>VISIÓN</Typography>
                </Box>
                <Box>
                  <Typography variant='subtitle1' className={classes.aboutUs}>
                    Nuestra experiencia en el mundo de la joyeria, nos llevo en tiempos de pandemia a replantearnos todo
                    el negocio de la venta de joyas y como poder mejorar algo que para muchos no puede cambiarse y hemos
                    logrado dar con lo que para muchos era invisible ,
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      <Box>
        <Container>
          <Box className={classes.box}>
            <Grid container spacing={6} alignItems='center'>
              <Grid item xs={7}>
                <Box className={classes.boxTitle}>
                  <Typography variant='h3'>CALIDAD AL MEJOR PRECIO</Typography>
                </Box>
                <Box>
                  <Typography variant='subtitle1' className={classes.aboutUs}>
                    Si en nuestra compania nuestro principal objetivo es brindar a nuestros clientes , el mejor PRODUCTO
                    al mejor PRECIO POSIBLE , ya que para nosotros lo principal es que nuestros clientes obtengan lo
                    mejor de lo mejor al costo
                    mas justo por eso trabajamos en alianza con muchos talleres de joyeria para brindar variedad,
                    calidad y mejor
                    precio a nuestros clientes en princess jewelry queremos que nuestros clientes al comprar una joya ,
                    a parte de obtener una
                    prenda obtengan un buen recuerdo .
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={5}>
                <img alt='ring' width='100%' src='/ring.webp' />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};