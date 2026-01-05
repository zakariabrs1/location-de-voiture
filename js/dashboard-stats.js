/**
 * DASHBOARD STATS - Statistiques du tableau de bord
 * Ce fichier gère l'affichage des statistiques sur le tableau de bord
 */

/**
 * Mettre à jour les statistiques du dashboard
 */
function updateDashboardStats() {
    // Total voitures
    const totalVoitures = dataManager.count('voitures');
    const statTotalVoitures = document.getElementById('stat-total-voitures');
    if (statTotalVoitures) {
        statTotalVoitures.textContent = totalVoitures;
    }

    // Total clients
    const totalClients = dataManager.count('clients');
    const statTotalClients = document.getElementById('stat-total-clients');
    if (statTotalClients) {
        statTotalClients.textContent = totalClients;
    }

    // Total réservations
    const totalReservations = dataManager.count('reservations');
    const statTotalReservations = document.getElementById('stat-total-reservations');
    if (statTotalReservations) {
        statTotalReservations.textContent = totalReservations;
    }

    // Total revenus (somme des factures payées)
    const factures = dataManager.getAll('factures');
    const totalRevenus = factures
        .filter(f => f.statut === 'Payee')
        .reduce((sum, f) => sum + (f.montant || 0), 0);
    const statTotalRevenus = document.getElementById('stat-total-revenus');
    if (statTotalRevenus) {
        statTotalRevenus.textContent = totalRevenus + ' DH';
    }

    // Voitures disponibles
    const voitures = dataManager.getAll('voitures');
    const voituresDisponibles = voitures.filter(v => v.statut === 'Disponible').length;
    const statVoituresDisponibles = document.getElementById('stat-voitures-disponibles');
    if (statVoituresDisponibles) {
        statVoituresDisponibles.textContent = voituresDisponibles;
    }
}

