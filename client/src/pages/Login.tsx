import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';
import { motion } from 'framer-motion';
import Input from '../components/Input';
import Button from '../components/Button';
import { LogIn, CloudSun } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import type { RootState } from '../stores/store';
import GravityBackground from '../components/GravityBackground';
import { useToast } from '../contexts/ToastContext';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const { username, password } = formData;

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { showToast } = useToast();

    const { user, isLoading, isError, isSuccess, message } = useAppSelector(
        (state: RootState) => state.auth
    );

    useEffect(() => {
        if (isError) {
            showToast("Credenciales invalidas", 'error');
        }

        if (isSuccess || user) {
            navigate('/');
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const userData = {
            username: username,
            passwordHash: password,
        };

        dispatch(login(userData));
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            <GravityBackground />

            <div className="absolute top-6 right-6 z-20">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/weather')}
                    className="px-4 py-2 bg-white text-[#19ABE3] border border-[#19ABE3]/20 hover:bg-[#19ABE3]/5 rounded-lg flex items-center gap-2 font-semibold transition-colors"
                >
                    <CloudSun size={20} /> Clima
                </motion.button>
            </div>


            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 w-full max-w-md p-8 bg-white/70 backdrop-blur-xl border border-slate-200/50 rounded-2xl shadow-2xl"
            >
                <div className="flex flex-col items-center mb-8">
                    <motion.div
                        initial={{ rotate: -180, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="p-3 bg-gradient-to-tr from-[#19ABE3] to-[#464C5E] rounded-full mb-4 shadow-lg shadow-[#19ABE3]/50"
                    >
                        <LogIn size={32} color="white" />
                    </motion.div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#19ABE3] to-[#464C5E]">
                        Bienvenido
                    </h1>
                    <p className="text-gray-500 mt-2">Ingresa a HumanoApp</p>
                </div>

                <form onSubmit={onSubmit} className="space-y-6">
                    <Input
                        label="Usuario"
                        type="text"
                        name="username"
                        value={username}
                        onChange={onChange}
                        placeholder="Ingresa tu usuario"
                        required
                    />
                    <Input
                        label="Contraseña"
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        placeholder="Ingresa tu contraseña"
                        required
                    />

                    <Button type="submit" isLoading={isLoading}>
                        Iniciar Sesión
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        ¿No tienes cuenta?{' '}
                        <Link to="/register" className="text-[#19ABE3] hover:underline font-semibold">
                            Regístrate
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
