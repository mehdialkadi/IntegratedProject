import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
    LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip,
    BarChart, Bar, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import './DashboardStats.css';

const DashboardStats = () => {
    const [paiements, setPaiements] = useState([]);
    const [filter, setFilter] = useState("all");

    // Nouvel état pour total factures
    const [totalFactures, setTotalFactures] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:8080/api/paiements")
            .then(res => setPaiements(res.data))
            .catch(err => console.error(err));

        // Charger le total des factures
        axios.get("http://localhost:8080/api/factures-immeuble/count")
            .then(res => setTotalFactures(res.data))
            .catch(err => console.error("Erreur total factures :", err));
    }, []);

    const filteredPaiements = useMemo(() => {
        if (filter === "all") return paiements;
        const days = filter === "7days" ? 7 : 30;
        const now = new Date();
        return paiements.filter(p => {
            const date = new Date(p.date);
            return (now - date) / (1000 * 3600 * 24) <= days;
        });
    }, [paiements, filter]);

    const totalPaiements = useMemo(() => {
        return filteredPaiements.reduce((sum, p) => sum + (p.montant || 0), 0);
    }, [filteredPaiements]);

    const totalFacturesEnvoyees = useMemo(() => {
        return filteredPaiements
            .filter(p => p.factureEnvoye)
            .reduce((sum, p) => sum + (p.montant || 0), 0);
    }, [filteredPaiements]);

    const paiementsParDate = useMemo(() => {
        return filteredPaiements.reduce((acc, p) => {
            const date = p.date?.substring(0, 10);
            if (date) acc[date] = (acc[date] || 0) + (p.montant || 0);
            return acc;
        }, {});
    }, [filteredPaiements]);

    const chartData = useMemo(() => {
        return Object.entries(paiementsParDate).map(([date, montant]) => ({ date, montant }));
    }, [paiementsParDate]);

    const paiementMoyen = useMemo(() => {
        const nbJours = Object.keys(paiementsParDate).length;
        return nbJours ? (totalPaiements / nbJours).toFixed(2) : 0;
    }, [paiementsParDate, totalPaiements]);

    const topJours = useMemo(() => {
        return [...chartData].sort((a, b) => b.montant - a.montant).slice(0, 5);
    }, [chartData]);

    const pieData = [
        { name: 'Envoyées', value: filteredPaiements.filter(p => p.factureEnvoye).length },
        { name: 'Non envoyées', value: filteredPaiements.filter(p => !p.factureEnvoye).length },
    ];

    const COLORS = ['#3b82f6', '#f87171'];

    const exportCSV = () => {
        const csv = Papa.unparse(filteredPaiements);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
        saveAs(blob, "paiements.csv");
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard">
                <div className="dashboard-stats">
                    <h1 className="dashboard-title">Statistiques du Dashboard</h1>

                    <div className="filter-container">
                        <label>Filtrer par période : </label>
                        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
                            <option value="all">Tous</option>
                            <option value="7days">7 derniers jours</option>
                            <option value="30days">30 derniers jours</option>
                        </select>
                        <button onClick={exportCSV}>Exporter en CSV</button>
                    </div>

                    <div className="widgets-container">
                        {/* Widget ajouté pour le total factures */}
                        <Widget title="Nombre total de factures" value={totalFactures} type="blue" />

                        <Widget title="Total Paiements" value={`${totalPaiements} MAD`} type="blue" />
                        <Widget title="Nombre de Paiements" value={filteredPaiements.length} type="green" />
                        <Widget title="Total Factures envoyées" value={`${totalFacturesEnvoyees} MAD`} type="red" />
                        <Widget title="Factures envoyées" value={filteredPaiements.filter(p => p.factureEnvoye).length} type="purple" />
                        <Widget title="Factures non envoyées" value={filteredPaiements.filter(p => !p.factureEnvoye).length} type="orange" />
                        <Widget title="Paiement moyen/jour" value={`${paiementMoyen} MAD`} type="gray" />
                    </div>
                </div>

                <div className="charts-container">
                    {/* Tes graphiques ici */}
                    <div className="chart-box">
                        <h2 className="chart-title">Évolution des paiements</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData}>
                                <Line type="monotone" dataKey="montant" stroke="#3b82f6" />
                                <CartesianGrid stroke="#ccc" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="chart-box">
                        <h2 className="chart-title">Répartition des paiements</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="montant" fill="#10b981" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="chart-box">
                        <h2 className="chart-title">Répartition Factures</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100}>
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="chart-box">
                        <h2 className="chart-title">Top 5 jours de paiement</h2>
                        <ul>
                            {topJours.map(day => (
                                <li key={day.date}>{day.date} : {day.montant} MAD</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Widget = ({ title, value, type }) => (
    <div className={`widget widget-${type}`}>
        <h3>{title}</h3>
        <p>{value}</p>
    </div>
);

export default DashboardStats;
