import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import Input from '../components/Input';
import { ArrowLeft, Save, User } from 'lucide-react';
import WaveBackground from '../components/WaveBackground';
import { useAppSelector } from '../hooks/hooks';
import { useToast } from '../contexts/ToastContext';

const Profile = () => {
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state.auth);
    const { showToast } = useToast();

    const [formData, setFormData] = useState({
        username: user?.username || 'Usuario Actual',
        email: 'usuario@humano.com',
        role: 'Administrador'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        showToast('Funcionalidad de guardar perfil en desarrollo.', 'info');
    };

    return (
        <div className="min-h-screen relative p-4 md:p-8 text-slate-800 bg-white/50">
            <WaveBackground />

            <div className="relative z-10 max-w-2xl mx-auto mt-10">
                <header className="flex items-center gap-4 mb-8">
                    <Button variant="secondary" onClick={() => navigate(-1)} className="!p-2">
                        <ArrowLeft size={20} />
                    </Button>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#19ABE3] to-[#464C5E]">
                        Mi Perfil
                    </h1>
                </header>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 md:p-10 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50"
                >
                    <div className="flex justify-center mb-8">
                        <div className="p-4 bg-slate-100 rounded-full shadow-inner relative">
                            <User size={64} className="text-[#19ABE3]" />
                            <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-400 rounded-full border-2 border-white"></div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label="Nombre de Usuario"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <Input
                            label="Correo Electrónico"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-slate-700 ml-1">Rol</label>
                            <input
                                disabled
                                value={formData.role}
                                className="w-full px-4 py-3 bg-slate-100 text-slate-500 rounded-xl border border-transparent focus:outline-none cursor-not-allowed"
                            />
                        </div>

                        <div className="pt-4">
                            <Button type="submit">
                                <Save size={20} /> Guardar Cambios
                            </Button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Profile;
