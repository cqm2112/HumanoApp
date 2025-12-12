import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register, reset } from '../features/auth/authSlice';
import { motion } from 'framer-motion';
import Input from '../components/Input';
import Button from '../components/Button';
import { UserPlus } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import type { RootState } from '../stores/store';
import GravityBackground from '../components/GravityBackground';
import { useToast } from '../contexts/ToastContext';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });

    const { username, password, confirmPassword } = formData;

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { showToast } = useToast();

    const { user, isLoading, isError, isSuccess, message } = useAppSelector(
        (state: RootState) => state.auth
    );

    useEffect(() => {
        if (isError) {
            showToast(message, 'error');
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

        if (password !== confirmPassword) {
            showToast('Las contraseñas no coinciden', 'error');
            return;
        }

        const userData = {
            username,
            passwordHash: password,
        };

        dispatch(register(userData));
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            <GravityBackground />

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
                        <UserPlus size={32} color="white" />
                    </motion.div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#19ABE3] to-[#464C5E]">
                        Registrarse
                    </h1>
                    <p className="text-gray-500 mt-2">Crea tu cuenta en HumanoApp</p>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                    <Input
                        label="Usuario"
                        type="text"
                        name="username"
                        value={username}
                        onChange={onChange}
                        placeholder="Elige un usuario"
                        required
                    />

                    <Input
                        label="Contraseña"
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        placeholder="Elige una contraseña"
                        required
                    />
                    <Input
                        label="Confirmar Contraseña"
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={onChange}
                        placeholder="Confirma tu contraseña"
                        required
                    />

                    <Button type="submit" isLoading={isLoading}>
                        Registrarse
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        ¿Ya tienes cuenta?{' '}
                        <Link to="/login" className="text-[#19ABE3] hover:underline font-semibold">
                            Inicia Sesión
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
