/**
 * DASHBOARD - Point d'entrée principal du tableau de bord
 * Ce fichier coordonne l'initialisation des statistiques et des graphiques
 */

document.addEventListener('DOMContentLoaded', function() {
    // Charger les statistiques et graphiques
    updateDashboardStats();
    initCharts();

    // Actualiser les stats quand on revient sur le dashboard
    const dashboardSection = document.getElementById('dashboard');
    if (dashboardSection) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.target.classList.contains('active')) {
                    updateDashboardStats();
                    updateCharts();
                }
            });
        });
        observer.observe(dashboardSection, { attributes: true, attributeFilter: ['class'] });
    }
});
