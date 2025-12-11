import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import weatherService from '../features/weather/weatherService';
import WeatherAnimation from '../components/WeatherAnimation';
import { ArrowLeft, Cloud, Droplets, Wind, Sun } from 'lucide-react';
import Button from '../components/Button';

interface WeatherForecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

const Weather = () => {
    const navigate = useNavigate();
    const [forecasts, setForecasts] = useState<WeatherForecast[]>([]);
    const [selectedForecast, setSelectedForecast] = useState<WeatherForecast | null>(null);
    const [loading, setLoading] = useState(true);
    const [type, setType] = useState<'cold' | 'cool' | 'hot'>('cool');

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const data = await weatherService.getWeather();
                setForecasts(data);
                if (data.length > 0) {
                    setSelectedForecast(data[0]);
                }
            } catch (error) {
                console.error("Failed to fetch weather", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    useEffect(() => {
        if (!selectedForecast) return;
        const summary = selectedForecast.summary.toLowerCase();

        if (['freezing', 'bracing', 'chilly'].some(s => summary.includes(s))) {
            setType('cold');
        } else if (['warm', 'balmy', 'hot', 'sweltering', 'scorching'].some(s => summary.includes(s))) {
            setType('hot');
        } else {
            setType('cool');
        }
    }, [selectedForecast]);

    const getIcon = (summary: string) => {
        const s = summary.toLowerCase();
        if (s.includes('freezing') || s.includes('bracing') || s.includes('chilly')) return <Wind size={24} className="text-blue-500" />;
        if (s.includes('hot') || s.includes('scorching') || s.includes('warm')) return <Sun size={24} className="text-orange-500" />;
        if (s.includes('rain')) return <Droplets size={24} className="text-blue-400" />;
        return <Cloud size={24} className="text-gray-500" />;
    };

    const getBgColor = (summary: string) => {
        const s = summary.toLowerCase();
        if (['freezing', 'bracing', 'chilly'].some(x => s.includes(x))) return 'bg-blue-50';
        if (['warm', 'balmy', 'hot', 'sweltering', 'scorching'].some(x => s.includes(x))) return 'bg-orange-50';
        return 'bg-gray-50';
    };

    return (
        <div className="min-h-screen relative p-8 text-slate-800 bg-white/50">
            <WeatherAnimation type={type} />

            <div className="relative z-10 max-w-4xl mx-auto">
                <header className="flex justify-between items-center mb-12 p-6 bg-white/80 backdrop-blur-lg rounded-2xl border border-slate-200/60 shadow-xl">
                    <div className="flex items-center gap-4">
                        <Button variant="secondary" onClick={() => navigate(-1)}>
                            <ArrowLeft size={20} /> Volver
                        </Button>
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#19ABE3] to-[#464C5E]">
                            Pronóstico del Tiempo
                        </h1>
                    </div>
                </header>

                {loading ? (
                    <div className="text-center py-20">
                        <p className="text-xl text-slate-500 animate-pulse">Cargando pronóstico...</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        <div className="p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 text-center mb-8 transition-all">
                            <h2 className="text-4xl font-bold mb-2 text-slate-800">
                                {selectedForecast && new Date(selectedForecast.date).toDateString() === new Date().toDateString() ? 'Hoy' : selectedForecast ? new Date(selectedForecast.date).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric' }) : ''}
                            </h2>
                            {selectedForecast && (
                                <div className="flex flex-col items-center">
                                    <div className="p-6 bg-slate-100 rounded-full mb-4 shadow-inner">
                                        {getIcon(selectedForecast.summary)}
                                    </div>
                                    <p className="text-6xl font-black text-[#19ABE3] mb-2">{selectedForecast.temperatureC}°C</p>
                                    <p className="text-xl text-slate-500 font-medium">{selectedForecast.summary}</p>
                                    <div className="flex gap-4 mt-4 text-sm text-gray-400">
                                        <span>{selectedForecast.temperatureF}°F</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                            {forecasts.map((day, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedForecast(day)}
                                    className={`p-6 rounded-xl border shadow-sm hover:shadow-md transition-all backdrop-blur-sm text-left ${selectedForecast === day ? 'ring-2 ring-[#19ABE3] scale-105' : 'border-slate-100'} ${getBgColor(day.summary)}`}
                                >
                                    <p className="text-sm text-gray-400 mb-2">{new Date(day.date).toLocaleDateString()}</p>
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-2xl font-bold text-slate-700">{day.temperatureC}°</span>
                                        {getIcon(day.summary)}
                                    </div>
                                    <p className="text-slate-600 font-medium">{day.summary}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Weather;
