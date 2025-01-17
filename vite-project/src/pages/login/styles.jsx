import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logotypeContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  logotypeImage: {
    width: '120px',
    height: '120px',
  },
  logotypeText: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginTop: '1rem',
  },
  formContainer: {
    width: '100%',
    maxWidth: '400px',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formButtons: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
  },
  greeting: {
    fontSize: '2rem',
    textAlign: 'center',
    marginBottom: '1rem',
  },
  errorMessage: {
    textAlign: 'center',
    color: 'red',
    fontSize: '0.875rem',
  },
  subGreeting: {
    fontSize: '1.25rem',
    textAlign: 'center',
    marginBottom: '1rem',
  },
  creatingButtonContainer: {
    marginTop: '2rem',
  },
  createAccountButton: {
    fontSize: '1rem',
    padding: '0.75rem',
  },
  formDividerContainer: {
    marginTop: '1rem',
    marginBottom: '1rem',
    display: 'flex',
    justifyContent: 'center',
  },
  formDivider: {
    width: '80%',
    borderBottom: '1px solid #ddd',
  },
  tab: {
    textTransform: 'none',
  },
}));

export default useStyles;
