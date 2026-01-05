/**
 * DASHBOARD CHARTS - Graphiques du tableau de bord
 * Ce fichier gère l'initialisation et la mise à jour des graphiques
 */

// Variables pour les graphiques
let chartVoituresStatut = null;
let chartReservationsMois = null;
let chartRevenusMois = null;
let chartFacturesStatut = null;

/**
 * Initialiser les graphiques
 */
function initCharts() {
    // Graphique : Statut des voitures
    const ctxVoituresStatut = document.getElementById('chart-voitures-statut');
    if (ctxVoituresStatut) {
        chartVoituresStatut = new Chart(ctxVoituresStatut, {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [{
                    label: 'Voitures par statut',
                    data: [],
                    backgroundColor: ['#27ae60', '#3498db', '#e67e22']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Répartition des voitures par statut'
                    }
                }
            }
        });
    }

    // Graphique : Réservations par mois
    const ctxReservationsMois = document.getElementById('chart-reservations-mois');
    if (ctxReservationsMois) {
        chartReservationsMois = new Chart(ctxReservationsMois, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Nombre de réservations',
                    data: [],
                    backgroundColor: '#3498db'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Réservations par mois'
                    }
                }
            }
        });
    }

    // Graphique : Revenus par mois
    const ctxRevenusMois = document.getElementById('chart-revenus-mois');
    if (ctxRevenusMois) {
        chartRevenusMois = new Chart(ctxRevenusMois, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Revenus (DH)',
                    data: [],
                    borderColor: '#27ae60',
                    backgroundColor: 'rgba(39, 174, 96, 0.1)',
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Revenus par mois'
                    }
                }
            }
        });
    }

    // Graphique : Statut des factures
    const ctxFacturesStatut = document.getElementById('chart-factures-statut');
    if (ctxFacturesStatut) {
        chartFacturesStatut = new Chart(ctxFacturesStatut, {
            type: 'pie',
            data: {
                labels: [],
                datasets: [{
                    label: 'Factures par statut',
                    data: [],
                    backgroundColor: ['#27ae60', '#f39c12', '#e74c3c']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Répartition des factures par statut'
                    }
                }
            }
        });
    }

    updateCharts();
}

/**
 * Mettre à jour les graphiques avec les données actuelles
 */
function updateCharts() {
    // Graphique statut des voitures
    if (chartVoituresStatut) {
        const voitures = dataManager.getAll('voitures');
        const statuts = {};
        voitures.forEach(v => {
            const statut = v.statut || 'Disponible';
            statuts[statut] = (statuts[statut] || 0) + 1;
        });
        chartVoituresStatut.data.labels = Object.keys(statuts);
        chartVoituresStatut.data.datasets[0].data = Object.values(statuts);
        chartVoituresStatut.update();
    }

    // Graphique réservations par mois
    if (chartReservationsMois) {
        const reservations = dataManager.getAll('reservations');
        const mois = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
        const reservationsParMois = new Array(12).fill(0);
        reservations.forEach(r => {
            if (r.dateDebut) {
                const date = new Date(r.dateDebut);
                const moisIndex = date.getMonth();
                reservationsParMois[moisIndex]++;
            }
        });
        chartReservationsMois.data.labels = mois;
        chartReservationsMois.data.datasets[0].data = reservationsParMois;
        chartReservationsMois.update();
    }

    // Graphique revenus par mois
    if (chartRevenusMois) {
        const factures = dataManager.getAll('factures').filter(f => f.statut === 'Payee');
        const mois = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
        const revenusParMois = new Array(12).fill(0);
        factures.forEach(f => {
            if (f.date) {
                const date = new Date(f.date);
                const moisIndex = date.getMonth();
                revenusParMois[moisIndex] += f.montant || 0;
            }
        });
        chartRevenusMois.data.labels = mois;
        chartRevenusMois.data.datasets[0].data = revenusParMois;
        chartRevenusMois.update();
    }

    // Graphique statut des factures
    if (chartFacturesStatut) {
        const factures = dataManager.getAll('factures');
        const statuts = {};
        factures.forEach(f => {
            const statut = f.statut || 'En attente';
            statuts[statut] = (statuts[statut] || 0) + 1;
        });
        chartFacturesStatut.data.labels = Object.keys(statuts);
        chartFacturesStatut.data.datasets[0].data = Object.values(statuts);
        chartFacturesStatut.update();
    }
}

