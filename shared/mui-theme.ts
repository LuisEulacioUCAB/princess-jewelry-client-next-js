import { createTheme } from '@material-ui/core/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#F1E0D6',
    },
    secondary: {
      main: '#D7B615',
    },
    success: {
      main: '#639611',
    },
    error: {
      main: '#EB5757',
    },
    common: {
      black: '#171D1C',
      white: '#FFFFFF',
    },
    background: {
      default: '#F2F2F2',
    },
  },

  typography: {
    fontFamily: ['Lato', 'Poppins'].join(','),
  },

  overrides:{
    MuiButton:{
      root:{
        borderRadius: 0,
        boxShadow: 'none!important'
      },
      contained:{
        background:'linear-gradient(90deg, rgba(205,171,104,1) 0%, rgba(218,198,114,1) 35%, rgba(255,255,201,1) 100%)'
      }
    },
    MuiTableCell: {
      root: {
        borderBottomWidth: 0,
      },
      head: {
        fontSize: 14,
        textTransform: 'uppercase',
      },
      body: {
        color: '#525252',
        fontSize: 12,
      },
    },
    MuiTableHead:{
      root:{
        background:'linear-gradient(90deg, rgba(205,171,104,1) 0%, rgba(218,198,114,1) 35%, rgba(255,255,201,1) 100%)'
      }
    },
    MuiPaper:{
      root:{
        borderRadius:'0!important'
      }
    }
  }
});
