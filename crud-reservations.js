/**
 * CRUD RÉSERVATIONS - Create, Read, Update, Delete
 * Gestion complète des opérations CRUD pour les réservations
 */

let editingReservationId = null;
let currentReservationId = null;

document.addEventListener('DOMContentLoaded', function() {
    populateSelects();
    loadReservations();
    setupReservationsForm();
    setupReservationsFilter();
    setupExportReservations();
});

function populateSelects() {
    const voitureSelect = document.getElementById('reservation-voiture-id');

    if (voitureSelect) {
        const voitures = dataManager.getAll('voitures').filter(v => v.statut === 'Disponible');
        voitureSelect.innerHTML = '<option value="">Sélectionner une voiture</option>';
        voitures.forEach(voiture => {
            const option = document.createElement('option');
            option.value = voiture.id;
            option.textContent = `${voiture.marque} ${voiture.modele} - ${voiture.prix} DH/jour`;
            voitureSelect.appendChild(option);
        });
    }
}

function setupReservationsForm() {
    const form = document.getElementById('form-reservation');
    const formEdit = document.getElementById('form-reservation-edit');
    const btnCancel = document.getElementById('btn-reservation-cancel');
    const dateDebut = document.getElementById('reservation-date-debut');
    const dateFin = document.getElementById('reservation-date-fin');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            saveReservation();
        });
    }

    if (formEdit) {
        formEdit.addEventListener('submit', function(e) {
            e.preventDefault();
            saveReservationEdit();
        });
    }

    if (btnCancel) {
        btnCancel.addEventListener('click', function() {
            resetReservationForm();
        });
    }

    // Calculer le prix total quand les dates changent
    if (dateDebut && dateFin) {
        [dateDebut, dateFin].forEach(input => {
            input.addEventListener('change', calculatePrixTotal);
        });
    }
}

function saveReservationEdit() {
    const id = parseInt(document.getElementById('reservation-edit-id').value);
    const clientNom = document.getElementById('reservation-edit-client-nom').value.trim();
    const voitureId = parseInt(document.getElementById('reservation-edit-voiture-id').value);
    const dateDebut = document.getElementById('reservation-edit-date-debut').value;
    const dateFin = document.getElementById('reservation-edit-date-fin').value;
    const statut = document.getElementById('reservation-edit-statut').value;

    if (!clientNom || !voitureId || !dateDebut || !dateFin) {
        alert('Veuillez remplir tous les champs');
        return;
    }

    const voiture = dataManager.getById('voitures', voitureId);
    if (!voiture) {
        alert('Voiture introuvable');
        return;
    }

    const debut = new Date(dateDebut);
    const fin = new Date(dateFin);
    const jours = Math.ceil((fin - debut) / (1000 * 60 * 60 * 24)) + 1;
    const prixTotal = voiture.prix * jours;

    const reservationAvantUpdate = dataManager.getById('reservations', id);
    const reservationMiseAJour = dataManager.update('reservations', id, {
        clientNom: clientNom,
        voitureId: voitureId,
        voitureNom: `${voiture.marque} ${voiture.modele}`,
        dateDebut: dateDebut,
        dateFin: dateFin,
        prixTotal: prixTotal,
        statut: statut
    });
    
    // Si la réservation vient d'être créée ou modifiée et qu'il n'y a pas de facture associée
    // Ou si le montant a changé, mettre à jour la facture correspondante
    updateFactureFromReservation(reservationMiseAJour);
    
    loadReservations();
    populateSelects();
    updateDashboardStats();
    
    // Recharger la liste des factures si la fonction existe
    if (typeof loadFactures === 'function') {
        loadFactures();
    }
    
    showPage('reservations');
    document.querySelectorAll('.nav-link').forEach(l => {
        if (l.getAttribute('data-page') === 'reservations') {
            l.classList.add('active');
        }
    });
}

/**
 * Mettre à jour ou créer une facture pour une réservation
 */
function updateFactureFromReservation(reservation) {
    const factures = dataManager.getAll('factures');
    const factureExistante = factures.find(f => f.reservationId === reservation.id);
    
    if (factureExistante) {
        // Mettre à jour la facture existante
        dataManager.update('factures', factureExistante.id, {
            clientNom: reservation.clientNom,
            montant: reservation.prixTotal
        });
    } else {
        // Créer une nouvelle facture si elle n'existe pas
        generateFactureFromReservation(reservation);
    }
}

function calculatePrixTotal() {
    const voitureId = document.getElementById('reservation-voiture-id').value;
    const dateDebut = document.getElementById('reservation-date-debut').value;
    const dateFin = document.getElementById('reservation-date-fin').value;

    if (voitureId && dateDebut && dateFin) {
        const voiture = dataManager.getById('voitures', parseInt(voitureId));
        if (voiture) {
            const debut = new Date(dateDebut);
            const fin = new Date(dateFin);
            const jours = Math.ceil((fin - debut) / (1000 * 60 * 60 * 24)) + 1;
            // Le prix sera calculé lors de la sauvegarde
        }
    }
}

function loadReservations(filterText = '') {
    const tbody = document.getElementById('table-reservations-body');
    if (!tbody) return;

    let reservations = dataManager.getAll('reservations');

    if (filterText) {
        const filter = filterText.toLowerCase();
        reservations = reservations.filter(r => 
            r.clientNom.toLowerCase().includes(filter) ||
            r.voitureNom.toLowerCase().includes(filter)
        );
    }

    tbody.innerHTML = '';

    reservations.forEach(reservation => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${reservation.id}</td>
            <td>${reservation.clientNom}</td>
            <td>${reservation.voitureNom}</td>
            <td>${reservation.dateDebut}</td>
            <td>${reservation.dateFin}</td>
            <td>${reservation.prixTotal} DH</td>
            <td>${reservation.statut}</td>
            <td>
                <a href="#" class="details-link" data-details="reservation-details" data-id="${reservation.id}">Détails</a>
                <button class="btn-edit" data-id="${reservation.id}">Modifier</button>
                <button class="btn-delete" data-id="${reservation.id}">Supprimer</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', function() {
            editReservation(parseInt(this.getAttribute('data-id')));
        });
    });

    tbody.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', function() {
            deleteReservation(parseInt(this.getAttribute('data-id')));
        });
    });

    tbody.querySelectorAll('.details-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const id = parseInt(this.getAttribute('data-id'));
            showReservationDetails(id);
        });
    });
}

function saveReservation() {
    const clientNom = document.getElementById('reservation-client-nom').value.trim();
    const voitureId = parseInt(document.getElementById('reservation-voiture-id').value);
    const dateDebut = document.getElementById('reservation-date-debut').value;
    const dateFin = document.getElementById('reservation-date-fin').value;

    if (!clientNom || !voitureId || !dateDebut || !dateFin) {
        alert('Veuillez remplir tous les champs');
        return;
    }

    const voiture = dataManager.getById('voitures', voitureId);
    if (!voiture) {
        alert('Voiture introuvable');
        return;
    }

    const debut = new Date(dateDebut);
    const fin = new Date(dateFin);
    const jours = Math.ceil((fin - debut) / (1000 * 60 * 60 * 24)) + 1;
    const prixTotal = voiture.prix * jours;

    const reservationData = {
        clientNom: clientNom,
        voitureId: voitureId,
        voitureNom: `${voiture.marque} ${voiture.modele}`,
        dateDebut: dateDebut,
        dateFin: dateFin,
        prixTotal: prixTotal,
        statut: 'Active'
    };

    const nouvelleReservation = dataManager.create('reservations', reservationData);
    
    // Générer automatiquement une facture pour cette réservation
    generateFactureFromReservation(nouvelleReservation);
    
    // Marquer la voiture comme "En location"
    dataManager.update('voitures', voitureId, { statut: 'En location' });
    
    document.getElementById('form-reservation').reset();
    loadReservations();
    populateSelects();
    updateDashboardStats();
    
    // Recharger la liste des factures si la fonction existe (après chargement de crud-factures.js)
    if (typeof loadFactures === 'function') {
        loadFactures();
    }
}

/**
 * Générer une facture automatiquement à partir d'une réservation
 */
function generateFactureFromReservation(reservation) {
    // Générer un numéro de facture unique
    const factures = dataManager.getAll('factures');
    let maxNumero = 0;
    
    factures.forEach(f => {
        const match = f.numero.match(/F-(\d+)/);
        if (match) {
            const num = parseInt(match[1]);
            if (num > maxNumero) {
                maxNumero = num;
            }
        }
    });
    
    const nouveauNumero = `F-${String(maxNumero + 1).padStart(3, '0')}`;
    
    // Créer la facture
    const factureData = {
        numero: nouveauNumero,
        reservationId: reservation.id,
        clientNom: reservation.clientNom,
        montant: reservation.prixTotal,
        date: new Date().toISOString().split('T')[0], // Date du jour
        statut: 'En attente' // Statut par défaut : en attente
    };
    
    dataManager.create('factures', factureData);
}

function editReservation(id) {
    const reservation = dataManager.getById('reservations', id);
    if (!reservation) return;

    populateReservationEditSelects();
    document.getElementById('reservation-edit-id').value = id;
    document.getElementById('reservation-edit-client-nom').value = reservation.clientNom || '';
    document.getElementById('reservation-edit-voiture-id').value = reservation.voitureId;
    document.getElementById('reservation-edit-date-debut').value = reservation.dateDebut;
    document.getElementById('reservation-edit-date-fin').value = reservation.dateFin;
    document.getElementById('reservation-edit-statut').value = reservation.statut;
    
    showPage('reservation-edit');
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
}

function populateReservationEditSelects() {
    const voitureSelect = document.getElementById('reservation-edit-voiture-id');

    if (voitureSelect) {
        const voitures = dataManager.getAll('voitures');
        voitureSelect.innerHTML = '<option value="">Sélectionner une voiture</option>';
        voitures.forEach(voiture => {
            const option = document.createElement('option');
            option.value = voiture.id;
            option.textContent = `${voiture.marque} ${voiture.modele} - ${voiture.prix} DH/jour`;
            voitureSelect.appendChild(option);
        });
    }
}

function deleteReservation(id) {
    const reservation = dataManager.getById('reservations', id);
    if (!reservation) return;

    const detailsList = document.getElementById('reservation-delete-details');
    if (detailsList) {
        detailsList.innerHTML = `
            <li><strong>ID :</strong> ${reservation.id}</li>
            <li><strong>Client :</strong> ${reservation.clientNom}</li>
            <li><strong>Voiture :</strong> ${reservation.voitureNom}</li>
            <li><strong>Date début :</strong> ${reservation.dateDebut}</li>
            <li><strong>Date fin :</strong> ${reservation.dateFin}</li>
            <li><strong>Prix total :</strong> ${reservation.prixTotal} DH</li>
            <li><strong>Statut :</strong> ${reservation.statut}</li>
        `;
    }

    const btnConfirm = document.getElementById('btn-confirm-delete-reservation');
    if (btnConfirm) {
        btnConfirm.onclick = function() {
            if (reservation) {
                dataManager.update('voitures', reservation.voitureId, { statut: 'Disponible' });
            }
            dataManager.delete('reservations', id);
            loadReservations();
            populateSelects();
            updateDashboardStats();
            showPage('reservations');
            document.querySelectorAll('.nav-link').forEach(l => {
                if (l.getAttribute('data-page') === 'reservations') {
                    l.classList.add('active');
                }
            });
        };
    }
    
    showPage('reservation-delete');
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
}

function resetReservationForm() {
    document.getElementById('form-reservation').reset();
    document.getElementById('reservation-id').value = '';
    populateSelects();
}

function setupReservationsFilter() {
    const filterInput = document.getElementById('filter-reservations');
    if (filterInput) {
        filterInput.addEventListener('input', function() {
            loadReservations(this.value);
        });
    }
}

function showReservationDetails(id) {
    const reservation = dataManager.getById('reservations', id);
    if (!reservation) return;

    currentReservationId = id;
    const detailsList = document.getElementById('reservation-details-list');
    if (detailsList) {
        detailsList.innerHTML = `
            <li><strong>ID :</strong> ${reservation.id}</li>
            <li><strong>Client :</strong> ${reservation.clientNom}</li>
            <li><strong>Voiture :</strong> ${reservation.voitureNom}</li>
            <li><strong>Date début :</strong> ${reservation.dateDebut}</li>
            <li><strong>Date fin :</strong> ${reservation.dateFin}</li>
            <li><strong>Prix total :</strong> ${reservation.prixTotal} DH</li>
            <li><strong>Statut :</strong> ${reservation.statut}</li>
        `;
    }
}

function setupExportReservations() {
    const btnExport = document.getElementById('btn-export-reservations');
    if (btnExport) {
        btnExport.addEventListener('click', function() {
            const reservations = dataManager.getAll('reservations');
            const csv = [
                ['ID', 'Client', 'Voiture', 'Date début', 'Date fin', 'Prix total', 'Statut'].join(','),
                ...reservations.map(r => [r.id, r.clientNom, r.voitureNom, r.dateDebut, r.dateFin, r.prixTotal, r.statut].join(','))
            ].join('\n');
            
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'reservations.csv';
            a.click();
        });
    }

    const btnExportPdf = document.getElementById('btn-export-reservation-pdf');
    if (btnExportPdf) {
        btnExportPdf.addEventListener('click', function() {
            if (currentReservationId) {
                const reservation = dataManager.getById('reservations', currentReservationId);
                alert(`Export PDF pour la réservation #${reservation.id}\n\nFonctionnalité PDF à implémenter.`);
            }
        });
    }
}

