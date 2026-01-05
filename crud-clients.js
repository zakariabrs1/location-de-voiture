/**
 * CRUD CLIENTS - Create, Read, Update, Delete
 * Gestion complète des opérations CRUD pour les clients
 */

let editingClientId = null;
let currentClientId = null;

document.addEventListener('DOMContentLoaded', function() {
    loadClients();
    setupClientsForm();
    setupClientsFilter();
    setupExportClients();
});

function setupClientsForm() {
    const form = document.getElementById('form-client');
    const formEdit = document.getElementById('form-client-edit');
    const btnCancel = document.getElementById('btn-client-cancel');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            saveClient();
        });
    }

    if (formEdit) {
        formEdit.addEventListener('submit', function(e) {
            e.preventDefault();
            saveClientEdit();
        });
    }

    if (btnCancel) {
        btnCancel.addEventListener('click', function() {
            resetClientForm();
        });
    }
}

function saveClientEdit() {
    const id = parseInt(document.getElementById('client-edit-id').value);
    const nom = document.getElementById('client-edit-nom').value.trim();
    const email = document.getElementById('client-edit-email').value.trim();
    const telephone = document.getElementById('client-edit-telephone').value.trim();
    const adresse = document.getElementById('client-edit-adresse').value.trim();

    if (!nom || !email || !telephone || !adresse) {
        alert('Veuillez remplir tous les champs');
        return;
    }

    dataManager.update('clients', id, { nom, email, telephone, adresse });
    loadClients();
    updateDashboardStats();
    showPage('clients');
    document.querySelectorAll('.nav-link').forEach(l => {
        if (l.getAttribute('data-page') === 'clients') {
            l.classList.add('active');
        }
    });
}

function loadClients(filterText = '') {
    const tbody = document.getElementById('table-clients-body');
    if (!tbody) return;

    let clients = dataManager.getAll('clients');

    if (filterText) {
        const filter = filterText.toLowerCase();
        clients = clients.filter(c => 
            c.nom.toLowerCase().includes(filter) ||
            c.email.toLowerCase().includes(filter) ||
            c.telephone.includes(filter)
        );
    }

    tbody.innerHTML = '';

    clients.forEach(client => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${client.id}</td>
            <td>${client.nom}</td>
            <td>${client.email}</td>
            <td>${client.telephone}</td>
            <td>
                <a href="#" class="details-link" data-details="client-details" data-id="${client.id}">Détails</a>
                <button class="btn-edit" data-id="${client.id}">Modifier</button>
                <button class="btn-delete" data-id="${client.id}">Supprimer</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', function() {
            editClient(parseInt(this.getAttribute('data-id')));
        });
    });

    tbody.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', function() {
            deleteClient(parseInt(this.getAttribute('data-id')));
        });
    });

    tbody.querySelectorAll('.details-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const id = parseInt(this.getAttribute('data-id'));
            showClientDetails(id);
        });
    });
}

function saveClient() {
    const nom = document.getElementById('client-nom').value.trim();
    const email = document.getElementById('client-email').value.trim();
    const telephone = document.getElementById('client-telephone').value.trim();
    const adresse = document.getElementById('client-adresse').value.trim();

    if (!nom || !email || !telephone || !adresse) {
        alert('Veuillez remplir tous les champs');
        return;
    }

    const clientData = { nom, email, telephone, adresse };
    dataManager.create('clients', clientData);
    document.getElementById('form-client').reset();
    loadClients();
    updateDashboardStats();
}

function editClient(id) {
    const client = dataManager.getById('clients', id);
    if (!client) return;

    document.getElementById('client-edit-id').value = id;
    document.getElementById('client-edit-nom').value = client.nom;
    document.getElementById('client-edit-email').value = client.email;
    document.getElementById('client-edit-telephone').value = client.telephone;
    document.getElementById('client-edit-adresse').value = client.adresse;
    
    showPage('client-edit');
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
}

function deleteClient(id) {
    const client = dataManager.getById('clients', id);
    if (!client) return;

    const detailsList = document.getElementById('client-delete-details');
    if (detailsList) {
        detailsList.innerHTML = `
            <li><strong>ID :</strong> ${client.id}</li>
            <li><strong>Nom :</strong> ${client.nom}</li>
            <li><strong>Email :</strong> ${client.email}</li>
            <li><strong>Téléphone :</strong> ${client.telephone}</li>
            <li><strong>Adresse :</strong> ${client.adresse}</li>
        `;
    }

    const btnConfirm = document.getElementById('btn-confirm-delete-client');
    if (btnConfirm) {
        btnConfirm.onclick = function() {
            dataManager.delete('clients', id);
            loadClients();
            updateDashboardStats();
            showPage('clients');
            document.querySelectorAll('.nav-link').forEach(l => {
                if (l.getAttribute('data-page') === 'clients') {
                    l.classList.add('active');
                }
            });
        };
    }
    
    showPage('client-delete');
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
}

function resetClientForm() {
    document.getElementById('form-client').reset();
    document.getElementById('client-id').value = '';
}

function setupClientsFilter() {
    const filterInput = document.getElementById('filter-clients');
    if (filterInput) {
        filterInput.addEventListener('input', function() {
            loadClients(this.value);
        });
    }
}

function showClientDetails(id) {
    const client = dataManager.getById('clients', id);
    if (!client) return;

    currentClientId = id;
    const reservations = dataManager.getAll('reservations').filter(r => r.clientNom === client.nom);
    
    const detailsList = document.getElementById('client-details-list');
    if (detailsList) {
        detailsList.innerHTML = `
            <li><strong>ID :</strong> ${client.id}</li>
            <li><strong>Nom :</strong> ${client.nom}</li>
            <li><strong>Email :</strong> ${client.email}</li>
            <li><strong>Téléphone :</strong> ${client.telephone}</li>
            <li><strong>Adresse :</strong> ${client.adresse}</li>
            <li><strong>Nombre de réservations :</strong> ${reservations.length}</li>
            ${client.dateInscription ? `<li><strong>Date d'inscription :</strong> ${client.dateInscription}</li>` : ''}
        `;
    }
}

function setupExportClients() {
    const btnExport = document.getElementById('btn-export-clients');
    if (btnExport) {
        btnExport.addEventListener('click', function() {
            const clients = dataManager.getAll('clients');
            const csv = [
                ['ID', 'Nom', 'Email', 'Téléphone', 'Adresse'].join(','),
                ...clients.map(c => [c.id, c.nom, c.email, c.telephone, c.adresse].join(','))
            ].join('\n');
            
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'clients.csv';
            a.click();
        });
    }

    const btnExportPdf = document.getElementById('btn-export-client-pdf');
    if (btnExportPdf) {
        btnExportPdf.addEventListener('click', function() {
            if (currentClientId) {
                const client = dataManager.getById('clients', currentClientId);
                alert(`Export PDF pour le client ${client.nom}\n\nFonctionnalité PDF à implémenter.`);
            }
        });
    }
}

