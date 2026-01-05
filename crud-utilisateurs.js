/**
 * CRUD UTILISATEURS - Create, Read, Update, Delete
 * Gestion complète des opérations CRUD pour les utilisateurs
 */

let editingUtilisateurId = null;
let currentUtilisateurId = null;

document.addEventListener('DOMContentLoaded', function() {
    loadUtilisateurs();
    setupUtilisateursForm();
    setupUtilisateursFilter();
    setupExportUtilisateurs();
});

function setupUtilisateursForm() {
    const form = document.getElementById('form-utilisateur');
    const formEdit = document.getElementById('form-utilisateur-edit');
    const btnCancel = document.getElementById('btn-utilisateur-cancel');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            saveUtilisateur();
        });
    }

    if (formEdit) {
        formEdit.addEventListener('submit', function(e) {
            e.preventDefault();
            saveUtilisateurEdit();
        });
    }

    if (btnCancel) {
        btnCancel.addEventListener('click', function() {
            resetUtilisateurForm();
        });
    }
}

function saveUtilisateurEdit() {
    const id = parseInt(document.getElementById('utilisateur-edit-id').value);
    const nom = document.getElementById('utilisateur-edit-nom').value.trim();
    const email = document.getElementById('utilisateur-edit-email').value.trim();
    const role = document.getElementById('utilisateur-edit-role').value;
    const statut = document.getElementById('utilisateur-edit-statut').value;

    if (!nom || !email || !role || !statut) {
        alert('Veuillez remplir tous les champs');
        return;
    }

    const utilisateur = dataManager.getById('utilisateurs', id);
    dataManager.update('utilisateurs', id, {
        nom, email, role, statut,
        dateCreation: utilisateur.dateCreation
    });
    
    loadUtilisateurs();
    showPage('utilisateurs');
    document.querySelectorAll('.nav-link').forEach(l => {
        if (l.getAttribute('data-page') === 'utilisateurs') {
            l.classList.add('active');
        }
    });
}

function loadUtilisateurs(filterText = '') {
    const tbody = document.getElementById('table-utilisateurs-body');
    if (!tbody) return;

    let utilisateurs = dataManager.getAll('utilisateurs');

    if (filterText) {
        const filter = filterText.toLowerCase();
        utilisateurs = utilisateurs.filter(u => 
            u.nom.toLowerCase().includes(filter) ||
            u.email.toLowerCase().includes(filter) ||
            u.role.toLowerCase().includes(filter)
        );
    }

    tbody.innerHTML = '';

    utilisateurs.forEach(utilisateur => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${utilisateur.id}</td>
            <td>${utilisateur.nom}</td>
            <td>${utilisateur.email}</td>
            <td>${utilisateur.role}</td>
            <td>${utilisateur.statut}</td>
            <td>
                <a href="#" class="details-link" data-details="utilisateur-details" data-id="${utilisateur.id}">Détails</a>
                <button class="btn-edit" data-id="${utilisateur.id}">Modifier</button>
                <button class="btn-delete" data-id="${utilisateur.id}">Supprimer</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', function() {
            editUtilisateur(parseInt(this.getAttribute('data-id')));
        });
    });

    tbody.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', function() {
            deleteUtilisateur(parseInt(this.getAttribute('data-id')));
        });
    });

    tbody.querySelectorAll('.details-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const id = parseInt(this.getAttribute('data-id'));
            showUtilisateurDetails(id);
        });
    });
}

function saveUtilisateur() {
    const nom = document.getElementById('utilisateur-nom').value.trim();
    const email = document.getElementById('utilisateur-email').value.trim();
    const role = document.getElementById('utilisateur-role').value;
    const statut = document.getElementById('utilisateur-statut').value;

    if (!nom || !email || !role || !statut) {
        alert('Veuillez remplir tous les champs');
        return;
    }

    const utilisateurData = {
        nom: nom,
        email: email,
        role: role,
        statut: statut,
        dateCreation: new Date().toISOString().split('T')[0]
    };

    dataManager.create('utilisateurs', utilisateurData);
    document.getElementById('form-utilisateur').reset();
    loadUtilisateurs();
}

function editUtilisateur(id) {
    const utilisateur = dataManager.getById('utilisateurs', id);
    if (!utilisateur) return;

    document.getElementById('utilisateur-edit-id').value = id;
    document.getElementById('utilisateur-edit-nom').value = utilisateur.nom;
    document.getElementById('utilisateur-edit-email').value = utilisateur.email;
    document.getElementById('utilisateur-edit-role').value = utilisateur.role;
    document.getElementById('utilisateur-edit-statut').value = utilisateur.statut;
    
    showPage('utilisateur-edit');
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
}

function deleteUtilisateur(id) {
    const utilisateur = dataManager.getById('utilisateurs', id);
    if (!utilisateur) return;

    const detailsList = document.getElementById('utilisateur-delete-details');
    if (detailsList) {
        detailsList.innerHTML = `
            <li><strong>ID :</strong> ${utilisateur.id}</li>
            <li><strong>Nom :</strong> ${utilisateur.nom}</li>
            <li><strong>Email :</strong> ${utilisateur.email}</li>
            <li><strong>Rôle :</strong> ${utilisateur.role}</li>
            <li><strong>Statut :</strong> ${utilisateur.statut}</li>
        `;
    }

    const btnConfirm = document.getElementById('btn-confirm-delete-utilisateur');
    if (btnConfirm) {
        btnConfirm.onclick = function() {
            dataManager.delete('utilisateurs', id);
            loadUtilisateurs();
            showPage('utilisateurs');
            document.querySelectorAll('.nav-link').forEach(l => {
                if (l.getAttribute('data-page') === 'utilisateurs') {
                    l.classList.add('active');
                }
            });
        };
    }
    
    showPage('utilisateur-delete');
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
}

function resetUtilisateurForm() {
    document.getElementById('form-utilisateur').reset();
    document.getElementById('utilisateur-id').value = '';
}

function setupUtilisateursFilter() {
    const filterInput = document.getElementById('filter-utilisateurs');
    if (filterInput) {
        filterInput.addEventListener('input', function() {
            loadUtilisateurs(this.value);
        });
    }
}

function showUtilisateurDetails(id) {
    const utilisateur = dataManager.getById('utilisateurs', id);
    if (!utilisateur) return;

    currentUtilisateurId = id;
    const detailsList = document.getElementById('utilisateur-details-list');
    if (detailsList) {
        detailsList.innerHTML = `
            <li><strong>ID :</strong> ${utilisateur.id}</li>
            <li><strong>Nom :</strong> ${utilisateur.nom}</li>
            <li><strong>Email :</strong> ${utilisateur.email}</li>
            <li><strong>Rôle :</strong> ${utilisateur.role}</li>
            <li><strong>Date de création :</strong> ${utilisateur.dateCreation || 'N/A'}</li>
            <li><strong>Statut :</strong> ${utilisateur.statut}</li>
        `;
    }
}

function setupExportUtilisateurs() {
    const btnExport = document.getElementById('btn-export-utilisateurs');
    if (btnExport) {
        btnExport.addEventListener('click', function() {
            const utilisateurs = dataManager.getAll('utilisateurs');
            const csv = [
                ['ID', 'Nom', 'Email', 'Rôle', 'Statut'].join(','),
                ...utilisateurs.map(u => [u.id, u.nom, u.email, u.role, u.statut].join(','))
            ].join('\n');
            
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'utilisateurs.csv';
            a.click();
        });
    }

    const btnExportPdf = document.getElementById('btn-export-utilisateur-pdf');
    if (btnExportPdf) {
        btnExportPdf.addEventListener('click', function() {
            if (currentUtilisateurId) {
                const utilisateur = dataManager.getById('utilisateurs', currentUtilisateurId);
                alert(`Export PDF pour l'utilisateur ${utilisateur.nom}\n\nFonctionnalité PDF à implémenter.`);
            }
        });
    }
}

