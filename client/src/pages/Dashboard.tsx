import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { logout, reset as resetAuth } from '../features/auth/authSlice';
import { createProduct, getProducts, deleteProduct, updateProduct, reset as resetProducts } from '../features/products/productSlice';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';
import Input from '../components/Input';
import { LogOut, Plus, Trash2, Package, X, Edit2, CloudSun, Menu, User, Server, FileText, ExternalLink, ArrowLeft } from 'lucide-react';
import type { RootState } from '../app/store';

import WaveBackground from '../components/WaveBackground';

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { user } = useAppSelector((state: RootState) => state.auth);
    const { products, isLoading, isError, message } = useAppSelector((state: RootState) => state.products);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProductId, setCurrentProductId] = useState<string | null>(null);

    const [productForm, setProductForm] = useState({
        name: '',
        category: '',
        price: '',
    });

    useEffect(() => {
        if (isError) {
            console.error(message);
        }

        if (!user) {
            navigate('/login');
        }

        dispatch(getProducts());

        return () => {
            dispatch(resetProducts());
        };
    }, [user, navigate, isError, message, dispatch]);

    const onLogout = () => {
        dispatch(logout());
        dispatch(resetAuth());
        navigate('/login');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!productForm.name || !productForm.price) return;

        const productData = {
            ...productForm,
            price: parseFloat(productForm.price)
        };

        if (isEditing && currentProductId) {
            await dispatch(updateProduct({ id: currentProductId, ...productData }));
        } else {
            await dispatch(createProduct(productData));
        }

        closeModal();
    };

    const openCreateModal = () => {
        setIsEditing(false);
        setProductForm({ name: '', category: '', price: '' });
        setIsModalOpen(true);
    };

    const openEditModal = (product: any) => {
        setIsEditing(true);
        setCurrentProductId(product.id);
        setProductForm({
            name: product.name,
            category: product.category || '',
            price: product.price.toString()
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditing(false);
        setCurrentProductId(null);
        setProductForm({ name: '', category: '', price: '' });
    };

    const handleDelete = (id: string) => {
        if (confirm('¿Estás seguro?')) {
            dispatch(deleteProduct(id));
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <div className="min-h-screen bg-transparent text-slate-800 p-8 overflow-hidden relative">
            <WaveBackground />

            <header className="relative z-20 mb-12">
                <div className="flex justify-between items-center p-6 bg-white/70 backdrop-blur-lg rounded-2xl border border-slate-200/60 shadow-xl">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg shadow-lg shadow-blue-500/20">
                            <Package size={28} />
                        </div>
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#19ABE3] to-[#464C5E]">HumanoApp</h1>
                            <p className="text-slate-500 text-xs hidden md:block">Bienvenido, {user && user.username}</p>
                        </div>
                    </div>

                    <div className="hidden md:flex gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={openCreateModal}
                            className="px-4 py-2 bg-[#19ABE3] hover:bg-[#1593c4] text-white rounded-lg flex items-center gap-2 font-semibold shadow-lg shadow-[#19ABE3]/20 transition-colors"
                        >
                            <Plus size={20} /> Nuevo Producto
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/weather')}
                            className="px-4 py-2 bg-white text-[#19ABE3] border border-[#19ABE3]/20 hover:bg-[#19ABE3]/5 rounded-lg flex items-center gap-2 font-semibold transition-colors"
                        >
                            <CloudSun size={20} /> Clima
                        </motion.button>

                        <div className="h-10 w-px bg-slate-200 mx-2"></div>

                        <div className="h-10 w-px bg-slate-200 mx-2"></div>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => navigate('/profile')}
                            title="Editar Perfil"
                            className="p-2 text-slate-500 hover:text-[#19ABE3] hover:bg-white rounded-full transition-colors"
                        >
                            <User size={24} />
                        </motion.button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-slate-600 hover:bg-white hover:text-[#19ABE3] rounded-full transition-colors"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                    <div className="flex md:hidden gap-2">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={openCreateModal}
                            className="p-2 bg-[#19ABE3] text-white rounded-lg shadow-lg shadow-[#19ABE3]/20"
                        >
                            <Plus size={24} />
                        </motion.button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                        >
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute top-full right-0 mt-4 p-4 bg-white/90 backdrop-blur-xl rounded-2xl border border-slate-200 shadow-2xl z-30 flex flex-col gap-2 w-full md:w-80"
                        >
                            <div className="p-4 bg-slate-50 rounded-xl mb-2 flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-full text-blue-500">
                                    <User size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-slate-800">{user?.username}</p>
                                    <button
                                        onClick={() => navigate('/profile')}
                                        className="text-xs text-[#19ABE3] font-medium hover:underline flex items-center gap-1"
                                    >
                                        Editar Perfil <ArrowLeft size={10} className="rotate-180" />
                                    </button>
                                </div>
                            </div>

                            <button onClick={() => navigate('/weather')} className="w-full text-left p-3 hover:bg-slate-50 rounded-xl flex items-center gap-3 text-slate-600 font-medium transition-colors">
                                <CloudSun size={20} className="text-orange-400" /> Ver Clima
                            </button>

                            <a href="http://localhost:7293/swagger" target="_blank" rel="noopener noreferrer" className="w-full text-left p-3 hover:bg-slate-50 rounded-xl flex items-center gap-3 text-slate-600 font-medium transition-colors">
                                <Server size={20} className="text-green-500" /> Instancia API (Swagger) <ExternalLink size={14} className="opacity-50" />
                            </a>

                            <a href="https://docs.google.com/forms/u/0/" target="_blank" rel="noopener noreferrer" className="w-full text-left p-3 hover:bg-slate-50 rounded-xl flex items-center gap-3 text-slate-600 font-medium transition-colors">
                                <FileText size={20} className="text-purple-500" /> Encuesta de Prueba <ExternalLink size={14} className="opacity-50" />
                            </a>

                            <div className="h-px bg-slate-100 my-1"></div>

                            <button onClick={onLogout} className="w-full text-left p-3 hover:bg-red-50 rounded-xl flex items-center gap-3 text-red-500 font-medium transition-colors">
                                <LogOut size={20} /> Cerrar Sesión
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {isLoading && <div className="text-center py-10">Cargando...</div>}

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
                <AnimatePresence mode='popLayout'>
                    {products && products.length > 0 ? (
                        products.map((product: any) => (
                            <motion.div
                                key={product.id}
                                variants={itemVariants}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(25, 171, 227, 0.2)" }}
                                className="bg-white/80 backdrop-blur-md border border-slate-200 p-6 rounded-xl relative group overflow-hidden shadow-sm hover:shadow-md transition-all"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex">
                                    <button
                                        onClick={() => openEditModal(product)}
                                        className="p-2 hover:bg-slate-200 rounded-full text-slate-400 hover:text-[#19ABE3] transition-colors mr-1"
                                    >
                                        <Edit2 size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="p-2 hover:bg-red-500/10 rounded-full text-red-400 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                                <div className="mb-4">
                                    <span className="text-xs font-bold px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-300 uppercase tracking-wider">
                                        {product.category || 'General'}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-slate-800">{product.name}</h3>
                                <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                                    ${product.price}
                                </p>
                            </motion.div>
                        ))
                    ) : (
                        !isLoading && <p className="text-gray-400 col-span-full text-center">No se encontraron productos.</p>
                    )}
                </AnimatePresence>
            </motion.div>

            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white border border-slate-200 p-8 rounded-2xl w-full max-w-md shadow-2xl relative"
                        >
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                            >
                                <X size={24} />
                            </button>
                            <h2 className="text-2xl font-bold mb-6 text-slate-800">{isEditing ? 'Editar Producto' : 'Nuevo Producto'}</h2>
                            <form onSubmit={handleSubmit}>
                                <Input
                                    label="Nombre"
                                    value={productForm.name}
                                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                                    placeholder="Ej. Seguro de Vida"
                                />
                                <Input
                                    label="Categoría"
                                    value={productForm.category}
                                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                                    placeholder="Ej. Seguros"
                                />
                                <Input
                                    label="Precio"
                                    type="number"
                                    value={productForm.price}
                                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                                    placeholder="0.00"
                                />
                                <div className="flex justify-end gap-3 mt-8">
                                    <Button type="button" variant="secondary" onClick={closeModal}>Cancelar</Button>
                                    <Button type="submit">{isEditing ? 'Actualizar' : 'Crear'}</Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dashboard;
