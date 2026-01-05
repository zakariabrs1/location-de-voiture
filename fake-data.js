/**
 * DONNÉES FAKE STATIQUES - Pour démonstration et tests
 * Pack de données pré-remplies pour tester le dashboard et les fonctionnalités
 * Les données sont maintenant persistées dans localStorage
 */

// Données par défaut (fake data)
const defaultDataStore = {
    voitures: [
        { id: 1, marque: 'Dacia', modele: 'Logan', prix: 250, statut: 'Disponible', annee: 2020, couleur: 'Blanc' },
        { id: 2, marque: 'Renault', modele: 'Clio', prix: 300, statut: 'En location', annee: 2019, couleur: 'Rouge' },
        { id: 3, marque: 'Peugeot', modele: '208', prix: 280, statut: 'Disponible', annee: 2021, couleur: 'Gris' },
        { id: 4, marque: 'Toyota', modele: 'Yaris', prix: 320, statut: 'Disponible', annee: 2022, couleur: 'Bleu' },
        { id: 5, marque: 'Ford', modele: 'Focus', prix: 350, statut: 'En maintenance', annee: 2018, couleur: 'Noir' },
        { id: 6, marque: 'Volkswagen', modele: 'Golf', prix: 400, statut: 'Disponible', annee: 2020, couleur: 'Blanc' },
        { id: 7, marque: 'BMW', modele: 'Serie 3', prix: 600, statut: 'En location', annee: 2021, couleur: 'Noir' },
        { id: 8, marque: 'Mercedes', modele: 'Classe A', prix: 550, statut: 'Disponible', annee: 2022, couleur: 'Gris' },
        { id: 9, marque: 'Audi', modele: 'A3', prix: 500, statut: 'Disponible', annee: 2020, couleur: 'Rouge' },
        { id: 10, marque: 'Dacia', modele: 'Duster', prix: 380, statut: 'Disponible', annee: 2021, couleur: 'Bleu' },
        { id: 11, marque: 'Renault', modele: 'Megane', prix: 420, statut: 'En location', annee: 2019, couleur: 'Blanc' },
        { id: 12, marque: 'Peugeot', modele: '3008', prix: 450, statut: 'Disponible', annee: 2022, couleur: 'Gris' }
    ],
    clients: [
        { id: 1, nom: 'Ali Alami', email: 'ali.alami@email.com', telephone: '0612345678', adresse: '15 Rue Alami, Casablanca', dateInscription: '2023-01-15' },
        { id: 2, nom: 'Fatima Benali', email: 'fatima.benali@email.com', telephone: '0623456789', adresse: '42 Rue Benali, Rabat', dateInscription: '2023-02-20' },
        { id: 3, nom: 'Mohamed Bennani', email: 'mohamed.bennani@email.com', telephone: '0634567890', adresse: '28 Rue Bennani, Marrakech', dateInscription: '2023-03-10' },
        { id: 4, nom: 'Aicha Idrissi', email: 'aicha.idrissi@email.com', telephone: '0645678901', adresse: '67 Rue Idrissi, Fes', dateInscription: '2023-04-05' },
        { id: 5, nom: 'Hassan Tazi', email: 'hassan.tazi@email.com', telephone: '0656789012', adresse: '33 Rue Tazi, Tanger', dateInscription: '2023-05-12' },
        { id: 6, nom: 'Said El Amrani', email: 'said.elamrani@email.com', telephone: '0667890123', adresse: '89 Rue El Amrani, Agadir', dateInscription: '2023-06-18' },
        { id: 7, nom: 'Khadija Sefrioui', email: 'khadija.sefrioui@email.com', telephone: '0678901234', adresse: '12 Rue Sefrioui, Meknes', dateInscription: '2023-07-22' },
        { id: 8, nom: 'Omar Fassi', email: 'omar.fassi@email.com', telephone: '0689012345', adresse: '55 Rue Fassi, Casablanca', dateInscription: '2023-08-30' },
        { id: 9, nom: 'Layla Berrada', email: 'layla.berrada@email.com', telephone: '0690123456', adresse: '21 Rue Berrada, Rabat', dateInscription: '2023-09-14' },
        { id: 10, nom: 'Youssef Alaoui', email: 'youssef.alaoui@email.com', telephone: '0601234567', adresse: '78 Rue Alaoui, Marrakech', dateInscription: '2023-10-08' },
        { id: 11, nom: 'Nadia Amrani', email: 'nadia.amrani@email.com', telephone: '0613456789', adresse: '44 Rue Amrani, Fes', dateInscription: '2023-11-25' },
        { id: 12, nom: 'Rachid Bensaid', email: 'rachid.bensaid@email.com', telephone: '0624567890', adresse: '91 Rue Bensaid, Tanger', dateInscription: '2023-12-03' },
        { id: 13, nom: 'Sanae Chraibi', email: 'sanae.chraibi@email.com', telephone: '0635678901', adresse: '26 Rue Chraibi, Agadir', dateInscription: '2024-01-11' },
        { id: 14, nom: 'Karim Lahlou', email: 'karim.lahlou@email.com', telephone: '0646789012', adresse: '58 Rue Lahlou, Casablanca', dateInscription: '2024-02-19' },
        { id: 15, nom: 'Sara Amzil', email: 'sara.amzil@email.com', telephone: '0657890123', adresse: '73 Rue Amzil, Rabat', dateInscription: '2024-03-27' }
    ],
    reservations: [
        { id: 1, clientNom: 'Ali Alami', voitureId: 2, voitureNom: 'Renault Clio', dateDebut: '2024-01-10', dateFin: '2024-01-15', prixTotal: 1500, statut: 'Active' },
        { id: 2, clientNom: 'Mohamed Bennani', voitureId: 7, voitureNom: 'BMW Serie 3', dateDebut: '2024-01-20', dateFin: '2024-01-25', prixTotal: 3000, statut: 'Active' },
        { id: 3, clientNom: 'Fatima Benali', voitureId: 1, voitureNom: 'Dacia Logan', dateDebut: '2023-12-05', dateFin: '2023-12-10', prixTotal: 1250, statut: 'Terminee' },
        { id: 4, clientNom: 'Hassan Tazi', voitureId: 11, voitureNom: 'Renault Megane', dateDebut: '2024-02-01', dateFin: '2024-02-08', prixTotal: 2940, statut: 'Active' },
        { id: 5, clientNom: 'Aicha Idrissi', voitureId: 4, voitureNom: 'Toyota Yaris', dateDebut: '2023-11-15', dateFin: '2023-11-20', prixTotal: 1600, statut: 'Terminee' },
        { id: 6, clientNom: 'Khadija Sefrioui', voitureId: 3, voitureNom: 'Peugeot 208', dateDebut: '2023-10-22', dateFin: '2023-10-27', prixTotal: 1400, statut: 'Terminee' },
        { id: 7, clientNom: 'Said El Amrani', voitureId: 9, voitureNom: 'Audi A3', dateDebut: '2024-01-12', dateFin: '2024-01-18', prixTotal: 3000, statut: 'Terminee' },
        { id: 8, clientNom: 'Layla Berrada', voitureId: 6, voitureNom: 'Volkswagen Golf', dateDebut: '2024-02-10', dateFin: '2024-02-15', prixTotal: 2000, statut: 'Active' },
        { id: 9, clientNom: 'Omar Fassi', voitureId: 8, voitureNom: 'Mercedes Classe A', dateDebut: '2023-12-20', dateFin: '2023-12-25', prixTotal: 2750, statut: 'Terminee' },
        { id: 10, clientNom: 'Youssef Alaoui', voitureId: 10, voitureNom: 'Dacia Duster', dateDebut: '2024-01-25', dateFin: '2024-01-30', prixTotal: 1900, statut: 'Terminee' },
        { id: 11, clientNom: 'Rachid Bensaid', voitureId: 1, voitureNom: 'Dacia Logan', dateDebut: '2024-02-05', dateFin: '2024-02-12', prixTotal: 1750, statut: 'Active' },
        { id: 12, clientNom: 'Nadia Amrani', voitureId: 5, voitureNom: 'Ford Focus', dateDebut: '2023-11-10', dateFin: '2023-11-15', prixTotal: 1750, statut: 'Annulee' },
        { id: 13, clientNom: 'Sanae Chraibi', voitureId: 12, voitureNom: 'Peugeot 3008', dateDebut: '2024-02-15', dateFin: '2024-02-22', prixTotal: 3150, statut: 'Active' },
        { id: 14, clientNom: 'Karim Lahlou', voitureId: 3, voitureNom: 'Peugeot 208', dateDebut: '2023-12-10', dateFin: '2023-12-17', prixTotal: 1960, statut: 'Terminee' },
        { id: 15, clientNom: 'Sara Amzil', voitureId: 4, voitureNom: 'Toyota Yaris', dateDebut: '2024-01-05', dateFin: '2024-01-10', prixTotal: 1600, statut: 'Terminee' },
        { id: 16, clientNom: 'Ali Alami', voitureId: 8, voitureNom: 'Mercedes Classe A', dateDebut: '2024-02-20', dateFin: '2024-02-27', prixTotal: 3850, statut: 'Active' },
        { id: 17, clientNom: 'Mohamed Bennani', voitureId: 9, voitureNom: 'Audi A3', dateDebut: '2023-10-05', dateFin: '2023-10-12', prixTotal: 3500, statut: 'Terminee' },
        { id: 18, clientNom: 'Hassan Tazi', voitureId: 6, voitureNom: 'Volkswagen Golf', dateDebut: '2023-11-25', dateFin: '2023-12-02', prixTotal: 2800, statut: 'Terminee' },
        { id: 19, clientNom: 'Khadija Sefrioui', voitureId: 10, voitureNom: 'Dacia Duster', dateDebut: '2024-01-15', dateFin: '2024-01-22', prixTotal: 2660, statut: 'Terminee' },
        { id: 20, clientNom: 'Layla Berrada', voitureId: 12, voitureNom: 'Peugeot 3008', dateDebut: '2024-02-01', dateFin: '2024-02-08', prixTotal: 3150, statut: 'Active' }
    ],
    factures: [
        { id: 1, numero: 'F-001', reservationId: 3, clientNom: 'Fatima Benali', montant: 1250, date: '2023-12-10', statut: 'Payee' },
        { id: 2, numero: 'F-002', reservationId: 5, clientNom: 'Aicha Idrissi', montant: 1600, date: '2023-11-20', statut: 'Payee' },
        { id: 3, numero: 'F-003', reservationId: 6, clientNom: 'Khadija Sefrioui', montant: 1400, date: '2023-10-27', statut: 'Payee' },
        { id: 4, numero: 'F-004', reservationId: 7, clientNom: 'Said El Amrani', montant: 3000, date: '2024-01-18', statut: 'Payee' },
        { id: 5, numero: 'F-005', reservationId: 9, clientNom: 'Omar Fassi', montant: 2750, date: '2023-12-25', statut: 'Payee' },
        { id: 6, numero: 'F-006', reservationId: 10, clientNom: 'Youssef Alaoui', montant: 1900, date: '2024-01-30', statut: 'Payee' },
        { id: 7, numero: 'F-007', reservationId: 14, clientNom: 'Karim Lahlou', montant: 1960, date: '2023-12-17', statut: 'Payee' },
        { id: 8, numero: 'F-008', reservationId: 15, clientNom: 'Sara Amzil', montant: 1600, date: '2024-01-10', statut: 'Payee' },
        { id: 9, numero: 'F-009', reservationId: 17, clientNom: 'Mohamed Bennani', montant: 3500, date: '2023-10-12', statut: 'Payee' },
        { id: 10, numero: 'F-010', reservationId: 18, clientNom: 'Hassan Tazi', montant: 2800, date: '2023-12-02', statut: 'Payee' },
        { id: 11, numero: 'F-011', reservationId: 19, clientNom: 'Khadija Sefrioui', montant: 2660, date: '2024-01-22', statut: 'Payee' },
        { id: 12, numero: 'F-012', reservationId: 1, clientNom: 'Ali Alami', montant: 1500, date: '2024-01-15', statut: 'En attente' },
        { id: 13, numero: 'F-013', reservationId: 2, clientNom: 'Mohamed Bennani', montant: 3000, date: '2024-01-25', statut: 'En attente' },
        { id: 14, numero: 'F-014', reservationId: 4, clientNom: 'Hassan Tazi', montant: 2940, date: '2024-02-08', statut: 'Impayee' },
        { id: 15, numero: 'F-015', reservationId: 8, clientNom: 'Layla Berrada', montant: 2000, date: '2024-02-15', statut: 'Payee' }
    ],
    utilisateurs: [
        { id: 1, nom: 'Admin 1', email: 'admin1@location.com', role: 'Administrateur', statut: 'Actif', dateCreation: '2024-01-01' },
        { id: 2, nom: 'Manager 2', email: 'manager2@location.com', role: 'Gestionnaire', statut: 'Actif', dateCreation: '2024-01-05' },
        { id: 3, nom: 'Responsable 3', email: 'responsable3@location.com', role: 'Superviseur', statut: 'Actif', dateCreation: '2024-01-10' },
        { id: 4, nom: 'Operateur 4', email: 'operateur4@location.com', role: 'Operateur', statut: 'Actif', dateCreation: '2024-01-15' },
        { id: 5, nom: 'Superviseur 5', email: 'superviseur5@location.com', role: 'Superviseur', statut: 'Inactif', dateCreation: '2024-01-20' }
    ]
};

// Clé pour localStorage
const STORAGE_KEY = 'location_voiture_data';

// Fonction pour sauvegarder dans localStorage
function saveToLocalStorage() {
    try {
        if (!dataStore) {
            console.error('[DataManager] ERREUR: dataStore n\'est pas défini lors de la sauvegarde!');
            return false;
        }
        
        if (typeof Storage !== 'undefined' && localStorage) {
            const dataToSave = JSON.stringify(dataStore);
            localStorage.setItem(STORAGE_KEY, dataToSave);
            // Vérifier que la sauvegarde a bien fonctionné
            const verification = localStorage.getItem(STORAGE_KEY);
            if (!verification || verification !== dataToSave) {
                console.error('[DataManager] ERREUR: La sauvegarde dans localStorage a échoué!');
                console.error('[DataManager] Données à sauvegarder:', dataToSave.substring(0, 100) + '...');
                console.error('[DataManager] Données vérifiées:', verification ? verification.substring(0, 100) + '...' : 'null');
                return false;
            } else {
                console.log('[DataManager] ✓ Données sauvegardées avec succès dans localStorage');
                return true;
            }
        } else {
            console.error('[DataManager] ERREUR: localStorage n\'est pas disponible dans ce navigateur');
            return false;
        }
    } catch (error) {
        console.error('[DataManager] ERREUR lors de la sauvegarde dans localStorage:', error);
        console.error('[DataManager] Stack trace:', error.stack);
        // Si le localStorage est plein, essayer de nettoyer ou avertir l'utilisateur
        if (error.name === 'QuotaExceededError') {
            console.error('[DataManager] Le localStorage est plein. Impossible de sauvegarder les données.');
            alert('Attention: Le stockage local est plein. Les données ne peuvent pas être sauvegardées.');
        }
        return false;
    }
}

// Fonction pour charger depuis localStorage
function loadFromLocalStorage() {
    try {
        if (typeof Storage !== 'undefined' && localStorage) {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                console.log('[DataManager] Données chargées depuis localStorage:', {
                    voitures: parsed.voitures ? parsed.voitures.length : 0,
                    clients: parsed.clients ? parsed.clients.length : 0,
                    reservations: parsed.reservations ? parsed.reservations.length : 0,
                    factures: parsed.factures ? parsed.factures.length : 0,
                    utilisateurs: parsed.utilisateurs ? parsed.utilisateurs.length : 0
                });
                return parsed;
            } else {
                console.log('[DataManager] Aucune donnée trouvée dans localStorage');
            }
        } else {
            console.error('[DataManager] localStorage n\'est pas disponible');
        }
    } catch (error) {
        console.error('[DataManager] Erreur lors du chargement depuis localStorage:', error);
    }
    return null;
}

// Initialiser dataStore avec les données sauvegardées ou les données par défaut
let dataStore = loadFromLocalStorage();
if (!dataStore) {
    // Si aucune donnée sauvegardée, utiliser les données par défaut
    console.log('[DataManager] Aucune donnée sauvegardée trouvée. Utilisation des données par défaut.');
    dataStore = JSON.parse(JSON.stringify(defaultDataStore));
    // Sauvegarder les données par défaut
    const dataToSave = JSON.stringify(dataStore);
    try {
        localStorage.setItem(STORAGE_KEY, dataToSave);
        console.log('[DataManager] ✓ Données par défaut sauvegardées avec succès.');
    } catch (error) {
        console.error('[DataManager] ✗ ÉCHEC de la sauvegarde des données par défaut!', error);
    }
} else {
    // S'assurer que toutes les propriétés existent (au cas où la structure change)
    console.log('[DataManager] ✓ Données chargées depuis localStorage.');
    if (!dataStore.voitures) dataStore.voitures = [];
    if (!dataStore.clients) dataStore.clients = [];
    if (!dataStore.reservations) dataStore.reservations = [];
    if (!dataStore.factures) dataStore.factures = [];
    if (!dataStore.utilisateurs) dataStore.utilisateurs = [];
    console.log('[DataManager] État des données:', {
        voitures: dataStore.voitures.length,
        clients: dataStore.clients.length,
        reservations: dataStore.reservations.length,
        factures: dataStore.factures.length,
        utilisateurs: dataStore.utilisateurs.length
    });
}

// Vérifier que dataStore est bien défini et accessible
if (!dataStore) {
    console.error('[DataManager] ERREUR CRITIQUE: dataStore n\'est pas défini!');
    dataStore = JSON.parse(JSON.stringify(defaultDataStore));
}

// Objet dataManager avec persistance automatique
const dataManager = {
    getAll(type) {
        if (!dataStore) {
            console.error('[DataManager] ERREUR: dataStore n\'est pas défini dans getAll!');
            return [];
        }
        if (!dataStore[type]) {
            dataStore[type] = [];
        }
        return dataStore[type];
    },
    getById(type, id) {
        const data = this.getAll(type);
        return data.find(item => item.id === id) || null;
    },
    create(type, item) {
        if (!dataStore) {
            console.error('[DataManager] ERREUR: dataStore n\'est pas défini!');
            return null;
        }
        const data = this.getAll(type);
        const newId = data.length > 0 ? Math.max(...data.map(i => i.id)) + 1 : 1;
        const newItem = { ...item, id: newId };
        data.push(newItem);
        
        // Sauvegarder immédiatement après création
        console.log(`[DataManager] Création d'un nouvel élément de type "${type}" avec ID ${newId}`);
        console.log(`[DataManager] Avant sauvegarde - Total ${type}:`, dataStore[type].length);
        const saved = saveToLocalStorage();
        if (saved) {
            console.log(`[DataManager] ✓ Données sauvegardées avec succès. Total ${type}:`, dataStore[type].length);
            // Vérifier que les données sont bien dans localStorage
            const check = localStorage.getItem(STORAGE_KEY);
            if (check) {
                const parsed = JSON.parse(check);
                console.log(`[DataManager] Vérification localStorage - Total ${type}:`, parsed[type] ? parsed[type].length : 0);
            }
        } else {
            console.error(`[DataManager] ✗ ÉCHEC de la sauvegarde pour ${type}!`);
        }
        return newItem;
    },
    update(type, id, updatedItem) {
        if (!dataStore) {
            console.error('[DataManager] ERREUR: dataStore n\'est pas défini!');
            return null;
        }
        const data = this.getAll(type);
        const index = data.findIndex(item => item.id === id);
        if (index !== -1) {
            data[index] = { ...data[index], ...updatedItem };
            // Sauvegarder immédiatement après modification
            console.log(`[DataManager] Modification de l'élément ${id} de type "${type}"`);
            const saved = saveToLocalStorage();
            if (!saved) {
                console.error(`[DataManager] ✗ ÉCHEC de la sauvegarde pour ${type}!`);
            }
            return data[index];
        }
        return null;
    },
    delete(type, id) {
        if (!dataStore) {
            console.error('[DataManager] ERREUR: dataStore n\'est pas défini!');
            return false;
        }
        const data = this.getAll(type);
        const index = data.findIndex(item => item.id === id);
        if (index !== -1) {
            data.splice(index, 1);
            // Sauvegarder immédiatement après suppression
            console.log(`[DataManager] Suppression de l'élément ${id} de type "${type}"`);
            const saved = saveToLocalStorage();
            if (!saved) {
                console.error(`[DataManager] ✗ ÉCHEC de la sauvegarde pour ${type}!`);
            }
            return true;
        }
        return false;
    },
    clearAll(type) {
        dataStore[type] = [];
        // Sauvegarder immédiatement après nettoyage
        saveToLocalStorage();
    },
    count(type) {
        return this.getAll(type).length;
    },
    // Fonction pour réinitialiser toutes les données (optionnel)
    resetToDefault() {
        dataStore = JSON.parse(JSON.stringify(defaultDataStore));
        saveToLocalStorage();
    }
};

