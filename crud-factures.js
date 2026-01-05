/**
 * CRUD FACTURES - Read (les factures sont générées automatiquement)
 * Gestion de l'affichage et des détails des factures
 */

let currentFactureId = null;

document.addEventListener('DOMContentLoaded', function() {
    loadFactures();
    setupFacturesFilter();
    setupExportFactures();
    setupFactureEditForm();
});

function loadFactures(filterText = '') {
    const tbody = document.getElementById('table-factures-body');
    if (!tbody) return;

    let factures = dataManager.getAll('factures');

    if (filterText) {
        const filter = filterText.toLowerCase();
        factures = factures.filter(f => 
            f.clientNom.toLowerCase().includes(filter) ||
            f.numero.toLowerCase().includes(filter)
        );
    }

    tbody.innerHTML = '';

    factures.forEach(facture => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${facture.numero}</td>
            <td>${facture.clientNom}</td>
            <td>${facture.montant} DH</td>
            <td>${facture.date}</td>
            <td>${facture.statut}</td>
            <td>
                <a href="#" class="details-link" data-details="facture-details" data-id="${facture.id}">Détails</a>
                <button class="btn-edit" data-id="${facture.id}">Modifier</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.details-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const id = parseInt(this.getAttribute('data-id'));
            showFactureDetails(id);
        });
    });

    tbody.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', function() {
            editFacture(parseInt(this.getAttribute('data-id')));
        });
    });
}

// Rendre loadFactures accessible globalement
window.loadFactures = loadFactures;

function setupFacturesFilter() {
    const filterInput = document.getElementById('filter-factures');
    if (filterInput) {
        filterInput.addEventListener('input', function() {
            loadFactures(this.value);
        });
    }
}

function showFactureDetails(id) {
    const facture = dataManager.getById('factures', id);
    if (!facture) return;

    currentFactureId = id;
    const reservation = facture.reservationId ? dataManager.getById('reservations', facture.reservationId) : null;
    
    const detailsList = document.getElementById('facture-details-list');
    if (detailsList) {
        detailsList.innerHTML = `
            <li><strong>Numéro :</strong> ${facture.numero}</li>
            <li><strong>Client :</strong> ${facture.clientNom}</li>
            ${reservation ? `<li><strong>Réservation :</strong> #${reservation.id}</li>` : ''}
            <li><strong>Montant :</strong> ${facture.montant} DH</li>
            <li><strong>Date :</strong> ${facture.date}</li>
            <li><strong>Statut :</strong> ${facture.statut}</li>
        `;
    }
}

/**
 * Configurer le formulaire d'édition de facture
 */
function setupFactureEditForm() {
    const formEdit = document.getElementById('form-facture-edit');
    if (formEdit) {
        formEdit.addEventListener('submit', function(e) {
            e.preventDefault();
            saveFactureEdit();
        });
    }
}

/**
 * Éditer une facture - Redirige vers la section d'édition
 */
function editFacture(id) {
    const facture = dataManager.getById('factures', id);
    if (!facture) return;

    // Remplir le formulaire d'édition
    document.getElementById('facture-edit-id').value = id;
    document.getElementById('facture-edit-statut').value = facture.statut || 'En attente';
    
    // Afficher la section d'édition
    showPage('facture-edit');
    
    // Mettre à jour la navigation
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
}

/**
 * Sauvegarder une modification de facture
 */
function saveFactureEdit() {
    const id = parseInt(document.getElementById('facture-edit-id').value);
    const statut = document.getElementById('facture-edit-statut').value;

    if (!statut) {
        alert('Veuillez sélectionner un statut');
        return;
    }

    dataManager.update('factures', id, { statut: statut });
    
    loadFactures();
    updateDashboardStats();
    showPage('factures');
    
    // Remettre la navigation active
    document.querySelectorAll('.nav-link').forEach(l => {
        if (l.getAttribute('data-page') === 'factures') {
            l.classList.add('active');
        }
    });
}

function setupExportFactures() {
    const btnExport = document.getElementById('btn-export-factures');
    if (btnExport) {
        btnExport.addEventListener('click', function() {
            const factures = dataManager.getAll('factures');
            const csv = [
                ['Numéro', 'Client', 'Montant', 'Date', 'Statut'].join(','),
                ...factures.map(f => [f.numero, f.clientNom, f.montant, f.date, f.statut].join(','))
            ].join('\n');
            
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'factures.csv';
            a.click();
        });
    }

    const btnExportPdf = document.getElementById('btn-export-facture-pdf');
    if (btnExportPdf) {
        btnExportPdf.addEventListener('click', function() {
            if (currentFactureId) {
                const facture = dataManager.getById('factures', currentFactureId);
                alert(`Export PDF pour la facture ${facture.numero}\n\nFonctionnalité PDF à implémenter.`);
            }
        });
    }
}

