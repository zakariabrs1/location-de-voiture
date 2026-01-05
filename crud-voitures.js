/**
 * CRUD VOITURES - Create, Read, Update, Delete
 * Gestion complète des opérations CRUD pour les voitures
 */

let editingVoitureId = null;
let currentVoitureId = null;

document.addEventListener('DOMContentLoaded', function() {
    loadVoitures();
    setupVoituresForm();
    setupVoituresFilter();
    setupExportVoitures();
});

/**
 * Configurer le formulaire d'ajout/modification de voiture
 */
function setupVoituresForm() {
    const form = document.getElementById('form-voiture');
    const formEdit = document.getElementById('form-voiture-edit');
    const btnCancel = document.getElementById('btn-voiture-cancel');
    const btnSubmit = document.getElementById('btn-voiture-submit');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            saveVoiture();
        });
    }

    if (formEdit) {
        formEdit.addEventListener('submit', function(e) {
            e.preventDefault();
            saveVoitureEdit();
        });
    }

    if (btnCancel) {
        btnCancel.addEventListener('click', function() {
            resetVoitureForm();
        });
    }
}

/**
 * Sauvegarder une modification de voiture
 */
function saveVoitureEdit() {
    const id = parseInt(document.getElementById('voiture-edit-id').value);
    const marque = document.getElementById('voiture-edit-marque').value.trim();
    const modele = document.getElementById('voiture-edit-modele').value.trim();
    const prix = parseInt(document.getElementById('voiture-edit-prix').value);
    const statut = document.getElementById('voiture-edit-statut').value;

    if (!marque || !modele || !prix) {
        alert('Veuillez remplir tous les champs');
        return;
    }

    const voitureData = { marque, modele, prix, statut };
    dataManager.update('voitures', id, voitureData);
    
    loadVoitures();
    updateDashboardStats();
    showPage('voitures');
    
    // Remettre la navigation active
    document.querySelectorAll('.nav-link').forEach(l => {
        if (l.getAttribute('data-page') === 'voitures') {
            l.classList.add('active');
        }
    });
}

/**
 * Charger et afficher toutes les voitures
 */
function loadVoitures(filterText = '') {
    const tbody = document.getElementById('table-voitures-body');
    if (!tbody) return;

    let voitures = dataManager.getAll('voitures');

    // Appliquer le filtre
    if (filterText) {
        const filter = filterText.toLowerCase();
        voitures = voitures.filter(v => 
            v.marque.toLowerCase().includes(filter) ||
            v.modele.toLowerCase().includes(filter) ||
            v.statut.toLowerCase().includes(filter)
        );
    }

    // Vider le tableau
    tbody.innerHTML = '';

    // Afficher les voitures
    voitures.forEach(voiture => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${voiture.id}</td>
            <td>${voiture.marque}</td>
            <td>${voiture.modele}</td>
            <td>${voiture.prix} DH</td>
            <td>${voiture.statut || 'Disponible'}</td>
            <td>
                <a href="#" class="details-link" data-details="voiture-details" data-id="${voiture.id}">Détails</a>
                <button class="btn-edit" data-id="${voiture.id}">Modifier</button>
                <button class="btn-delete" data-id="${voiture.id}">Supprimer</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // Ajouter les événements pour les boutons
    tbody.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', function() {
            editVoiture(parseInt(this.getAttribute('data-id')));
        });
    });

    tbody.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', function() {
            deleteVoiture(parseInt(this.getAttribute('data-id')));
        });
    });

    // Gérer les liens de détails
    tbody.querySelectorAll('.details-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const id = parseInt(this.getAttribute('data-id'));
            showVoitureDetails(id);
        });
    });
}

/**
 * Sauvegarder une voiture (Create ou Update)
 */
function saveVoiture() {
    const marque = document.getElementById('voiture-marque').value.trim();
    const modele = document.getElementById('voiture-modele').value.trim();
    const prix = parseInt(document.getElementById('voiture-prix').value);

    if (!marque || !modele || !prix) {
        alert('Veuillez remplir tous les champs');
        return;
    }

    const voitureData = {
        marque: marque,
        modele: modele,
        prix: prix,
        statut: 'Disponible'
    };

    // Create seulement (pas d'update ici, ça se fait dans saveVoitureEdit)
    dataManager.create('voitures', voitureData);
    document.getElementById('form-voiture').reset();
    loadVoitures();
    updateDashboardStats();
}

/**
 * Éditer une voiture - Redirige vers la section d'édition
 */
function editVoiture(id) {
    const voiture = dataManager.getById('voitures', id);
    if (!voiture) return;

    // Remplir le formulaire d'édition
    document.getElementById('voiture-edit-id').value = id;
    document.getElementById('voiture-edit-marque').value = voiture.marque;
    document.getElementById('voiture-edit-modele').value = voiture.modele;
    document.getElementById('voiture-edit-prix').value = voiture.prix;
    document.getElementById('voiture-edit-statut').value = voiture.statut || 'Disponible';
    
    // Afficher la section d'édition
    showPage('voiture-edit');
    
    // Mettre à jour la navigation
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
}

/**
 * Supprimer une voiture - Redirige vers la section de suppression
 */
function deleteVoiture(id) {
    const voiture = dataManager.getById('voitures', id);
    if (!voiture) return;

    // Afficher les détails à supprimer
    const detailsList = document.getElementById('voiture-delete-details');
    if (detailsList) {
        detailsList.innerHTML = `
            <li><strong>ID :</strong> ${voiture.id}</li>
            <li><strong>Marque :</strong> ${voiture.marque}</li>
            <li><strong>Modèle :</strong> ${voiture.modele}</li>
            <li><strong>Prix/jour :</strong> ${voiture.prix} DH</li>
            <li><strong>Statut :</strong> ${voiture.statut || 'Disponible'}</li>
        `;
    }

    // Configurer le bouton de confirmation
    const btnConfirm = document.getElementById('btn-confirm-delete-voiture');
    if (btnConfirm) {
        btnConfirm.onclick = function() {
            dataManager.delete('voitures', id);
            loadVoitures();
            updateDashboardStats();
            showPage('voitures');
            // Remettre la navigation active
            document.querySelectorAll('.nav-link').forEach(l => {
                if (l.getAttribute('data-page') === 'voitures') {
                    l.classList.add('active');
                }
            });
        };
    }
    
    // Afficher la section de suppression
    showPage('voiture-delete');
    
    // Mettre à jour la navigation
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
}

/**
 * Réinitialiser le formulaire
 */
function resetVoitureForm() {
    document.getElementById('form-voiture').reset();
    document.getElementById('voiture-id').value = '';
}

/**
 * Configurer le filtre
 */
function setupVoituresFilter() {
    const filterInput = document.getElementById('filter-voitures');
    if (filterInput) {
        filterInput.addEventListener('input', function() {
            loadVoitures(this.value);
        });
    }
}

/**
 * Afficher les détails d'une voiture
 */
function showVoitureDetails(id) {
    const voiture = dataManager.getById('voitures', id);
    if (!voiture) return;

    currentVoitureId = id;
    const detailsList = document.getElementById('voiture-details-list');
    if (detailsList) {
        detailsList.innerHTML = `
            <li><strong>ID :</strong> ${voiture.id}</li>
            <li><strong>Marque :</strong> ${voiture.marque}</li>
            <li><strong>Modèle :</strong> ${voiture.modele}</li>
            <li><strong>Prix/jour :</strong> ${voiture.prix} DH</li>
            <li><strong>Statut :</strong> ${voiture.statut || 'Disponible'}</li>
            <li><strong>Année :</strong> ${voiture.annee || 'N/A'}</li>
            <li><strong>Couleur :</strong> ${voiture.couleur || 'N/A'}</li>
        `;
    }
}

/**
 * Exporter les voitures en CSV
 */
function setupExportVoitures() {
    const btnExport = document.getElementById('btn-export-voitures');
    if (btnExport) {
        btnExport.addEventListener('click', function() {
            const voitures = dataManager.getAll('voitures');
            const csv = [
                ['ID', 'Marque', 'Modèle', 'Prix', 'Statut'].join(','),
                ...voitures.map(v => [v.id, v.marque, v.modele, v.prix, v.statut].join(','))
            ].join('\n');
            
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'voitures.csv';
            a.click();
        });
    }

    // Export PDF (simplifié - juste une alerte)
    const btnExportPdf = document.getElementById('btn-export-voiture-pdf');
    if (btnExportPdf) {
        btnExportPdf.addEventListener('click', function() {
            if (currentVoitureId) {
                const voiture = dataManager.getById('voitures', currentVoitureId);
                alert(`Export PDF pour la voiture ${voiture.marque} ${voiture.modele}\n\nFonctionnalité PDF à implémenter avec une bibliothèque comme jsPDF.`);
            }
        });
    }
}

