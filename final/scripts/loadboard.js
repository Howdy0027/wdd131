document.addEventListener('DOMContentLoaded', () => {
    loadInitialData();
    attachEventListeners();
    loadCustomerData();
    loadEquipmentData();
    loadStatusOptions();
    loadTrackingOptions();
});

let loads = [];
let loadNotes = loadNotesFromStorage() || {};
let loadAccessorials = loadAccessorialsFromStorage() || {};

function loadInitialData() {
    const savedLoads = localStorage.getItem('loads');
    if (savedLoads) {
        loads = JSON.parse(savedLoads);
    } else {
        loads = [{
            loadNumber: '12345',
            customer: 'Customer A',
            equipment: 'Dry Van',
            originCity: 'Los Angeles',
            originState: 'CA',
            originZip: '90001',
            destinationCity: 'New York',
            destinationState: 'NY',
            destinationZip: '10001',
            weight: 20000,
            pallet: 10,
            temp: 70,
            poRef: 'PO-12345',
            puApptDate: '2024-05-07',
            puApptTime: '08:00',
            puActualDate: '',
            puActualTime: '',
            puConf: 'CONF-12345',
            delApptDate: '2024-05-10',
            delApptTime: '12:00',
            delActualDate: '',
            delActualTime: '',
            delConf: 'CONF-12345',
            status: 'Delivered',
            tracking: 'Tracking',
            notes: [],
            mcn: '12345',
            dot: '12345',
            carrierName: 'Carrier A',
            dispatchName: 'Dispatch A',
            dispatchNumber: '(123) 456-7890',
            dispatchEmail: 'pLjzU@example.com',
            driverName: 'Driver A',
            driverNumber: '(123) 456-7890',
            revenue: 2700,
            cost: 2200,
            accessorialTotal: 500,
            opsID: 'ataylor'
        }];
    }
    populateLoadTable();
}

function saveLoadsToLocalStorage() {
    localStorage.setItem('loads', JSON.stringify(loads));
}

function saveNotesToStorage() {
    localStorage.setItem('loadNotes', JSON.stringify(loadNotes));
}

function loadNotesFromStorage() {
    const savedNotes = localStorage.getItem('loadNotes');
    return savedNotes ? JSON.parse(savedNotes) : {};
}

function openModal() {
    document.getElementById('loadForm').reset();
    document.getElementById('modalTitle').innerText = 'Create New Load';
    document.getElementById('loadModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('loadModal').style.display = 'none';
}

function openColumnConfigModal() {
    document.getElementById('columnConfigModal').style.display = 'block';
}

function closeColumnConfigModal() {
    document.getElementById('columnConfigModal').style.display = 'none';
}

function openNotesPopupForLoad(loadNumber) {
    currentLoadNumber = loadNumber;
    document.getElementById('notesPopup').style.display = 'block';
    document.getElementById('popupOverlay').style.display = 'block';
    displayNotesForLoad(loadNumber);
}

function closeNotesPopup() {
    document.getElementById('notesPopup').style.display = 'none';
    document.getElementById('popupOverlay').style.display = 'none';
}

function handleLoadForm(event) {
    event.preventDefault();
    const newLoad = getFormData();
    const existingLoadIndex = loads.findIndex(load => load.loadNumber === newLoad.loadNumber);
    if (existingLoadIndex !== -1) {
        loads[existingLoadIndex] = newLoad;
    } else {
        loads.push(newLoad);
    }
    saveLoadsToLocalStorage();
    populateLoadTable();
    closeModal();
}

function getFormData() {
    return {
        loadNumber: parseInt(document.getElementById('loadNumberInput').value),
        customer: document.getElementById('customerInput').value,
        equipment: document.getElementById('equipmentInput').value,
        originCity: document.getElementById('originCityInput').value,
        originState: document.getElementById('originStateInput').value,
        originZip: document.getElementById('originZipInput').value,
        destinationCity: document.getElementById('destinationCityInput').value,
        destinationState: document.getElementById('destinationStateInput').value,
        destinationZip: document.getElementById('destinationZipInput').value,
        weight: parseInt(document.getElementById('weightInput').value),
        pallet: parseInt(document.getElementById('palletInput').value),
        temp: parseInt(document.getElementById('tempInput').value),
        poRef: document.getElementById('poRefInput').value,
        puApptDate: document.getElementById('puApptDateInput').value,
        puApptTime: document.getElementById('puApptTimeInput').value,
        puActualDate: document.getElementById('puActualDateInput').value,
        puActualTime: document.getElementById('puActualTimeInput').value,
        puConf: document.getElementById('puConfInput').value,
        delApptDate: document.getElementById('delApptDateInput').value,
        delApptTime: document.getElementById('delApptTimeInput').value,
        delActualDate: document.getElementById('delActualDateInput').value,
        delActualTime: document.getElementById('delActualTimeInput').value,
        delConf: document.getElementById('delConfInput').value,
        status: document.getElementById('statusInput').value,
        tracking: document.getElementById('trackingInput').value,
        mcn: parseInt(document.getElementById('mcnInput').value),
        dot: parseInt(document.getElementById('dotInput').value),
        carrierName: document.getElementById('carrierNameInput').value,
        dispatchName: document.getElementById('dispatchNameInput').value,
        dispatchNumber: document.getElementById('dispatchNumberInput').value,
        dispatchEmail: document.getElementById('dispatchEmailInput').value,
        driverName: document.getElementById('driverNameInput').value,
        driverNumber: document.getElementById('driverNumberInput').value,
        revenue: parseFloat(document.getElementById('revenueInput').value),
        cost: parseFloat(document.getElementById('costInput').value),
        accessorialTotal: parseFloat(document.getElementById('accessorialTotalInput').value),
        opsID: document.getElementById('opsIDInput').value
    };
}

function attachEventListeners() {
    document.getElementById('createLoadButton').addEventListener('click', openModal);
    document.getElementById('logoutButton').addEventListener('click', handleLogout);
    document.getElementById('columnConfigButton').addEventListener('click', openColumnConfigModal);
    document.getElementById('loadForm').addEventListener('submit', handleLoadForm);
    document.getElementById('columnConfigForm').addEventListener('submit', handleColumnConfigForm);
    document.getElementById('searchButton').addEventListener('click', handleSearch);
    document.getElementById('sortForm').addEventListener('submit', handleSortForm);
    document.getElementById('downloadButton').addEventListener('click', downloadCSV);
}

function handleLogout() {
    alert('You have been logged out.');
    window.location.href = '/final/html/login.html';
}

function saveAccessorialsToStorage() {
    localStorage.setItem('loadAccessorials', JSON.stringify(loadAccessorials));
}

function loadAccessorialsFromStorage() {
    const storedAccessorials = localStorage.getItem('loadAccessorials');
    return storedAccessorials ? JSON.parse(storedAccessorials) : {};
}

function fetchCSVData(url, callback) {
    fetch(url)
        .then(response => response.text())
        .then(csvData => {
            const rows = csvData.split('\n');
            const data = rows.map(row => row.split(','));
            if (data.length > 0 && (data[0][0].includes('ID') || data[0][0].includes('id'))) {
                data.shift();
            }
            callback(data);
        })
        .catch(error => {
            console.error('Error fetching CSV:', error);
        });
}

function populateDropdown(dropdownId, data) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.innerHTML = '';
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select...';
    dropdown.appendChild(defaultOption);
    data.forEach(item => {
        const option = document.createElement('option');
        option.value = item[0];
        option.textContent = item[1];
        dropdown.appendChild(option);
    });
}

function loadCustomerData() {
    fetchCSVData('/final/files/jones_customers.csv', data => {
        populateDropdown('customerInput', data);
    });
}

function loadEquipmentData() {
    fetchCSVData('/final/files/equip_types.csv', data => {
        populateDropdown('equipmentInput', data);
    });
}

function loadStatusOptions() {
    const statusOptions = [
        "Available", "Packet", "Booked", "Quote", "Cancelled",
        "At Origin", "In Transit", "Delayed", "At Destination", "Delivered", "On Hold"
    ];
    populateOptions('statusInput', statusOptions);
}

function loadTrackingOptions() {
    const trackingOptions = [
        "NLY", "T", "I", "NT", "NTN"
    ];
    populateOptions('trackingInput', trackingOptions);
}

function populateOptions(dropdownId, options) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.innerHTML = '';
    const defaultOption = document.createElement('option');
    defaultOption.value = 'Select...';
    defaultOption.textContent = 'Select...';
    dropdown.appendChild(defaultOption);
    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        dropdown.appendChild(opt);
    });
}

function populateLoadTable(loadsToDisplay = loads) {
    const loadTableBody = document.getElementById('loadTableBody');
    loadTableBody.innerHTML = '';

    loadsToDisplay.forEach((load, index) => {
        const row = document.createElement('tr');
        row.dataset.loadNumber = load.loadNumber;
        row.innerHTML = `
            <td>${load.loadNumber}</td>
            <td>${load.customer}</td>
            <td>${load.equipment}</td>
            <td>${load.originCity}</td>
            <td>${load.originState}</td>
            <td>${load.originZip}</td>
            <td>${load.destinationCity}</td>
            <td>${load.destinationState}</td>
            <td>${load.destinationZip}</td>
            <td>${load.weight}</td>
            <td>${load.pallet ? load.pallet : ''}</td>
            <td>${load.temp ? load.temp : ''}</td>
            <td>${load.poRef ? load.poRef : ''}</td>
            <td class="date-cell">${load.puApptDate}</td>
            <td>${load.puApptTime}</td>
            <td>${load.puActualDate ? load.puActualDate : ''}</td>
            <td>${load.puActualTime ? load.puActualTime : ''}</td>
            <td>${load.puConf}</td>
            <td class="date-cell">${load.delApptDate}</td>
            <td>${load.delApptTime}</td>
            <td>${load.delActualDate ? load.delActualDate : ''}</td>
            <td>${load.delActualTime ? load.delActualTime : ''}</td>
            <td>${load.delConf}</td>
            <td class="status-cell">${load.status}</td>
            <td class="tracking-cell">${load.tracking}</td>
            <td>
                <div>${load.notes}</div>
                <button onclick="openNotesPopupForLoad('${load.loadNumber}')">Add/Edit Notes</button>
            </td>
            <td>${load.mcn ? load.mcn : ''}</td>
            <td>${load.dot ? load.dot : ''}</td>
            <td>${load.carrierName ? load.carrierName : ''}</td>
            <td>${load.dispatchName ? load.dispatchName : ''}</td>
            <td><a href="tel:${load.dispatchNumber ? load.dispatchNumber : ''}">${load.dispatchNumber ? load.dispatchNumber : ''}</a></td>
            <td>${load.dispatchEmail ? `<a href="mailto:${load.dispatchEmail}">${load.dispatchEmail}</a>` : ''}</td>
            <td>${load.driverName ? load.driverName : ''}</td>
            <td><a href="tel:${load.driverNumber ? load.driverNumber : ''}">${load.driverNumber ? load.driverNumber : ''}</a></td>
            <td>$${load.revenue}</td>
            <td>$${load.cost}</td>
            <td>$${load.accessorialTotal}</td>
            <td>$${load.revenue - load.cost + load.accessorialTotal}</td>
            <td>${load.opsID}</td>
            <td><button onclick="editLoad(${index})">Edit</button><button onclick="deleteLoad(${index})">Delete</button><button onclick="duplicateLoad(${index})">Duplicate</button></td>
        `;
        const statusCell = row.querySelector('.status-cell');
        setStatusClass(statusCell, load.status);
        const trackingCell = row.querySelector('.tracking-cell');
        setTrackingClass(trackingCell, load.tracking);
        const dateCells = row.querySelectorAll('.date-cell');
        dateCells.forEach((dateCell) => {
            setDateClass(dateCell, dateCell.textContent, load.status);
        });
        loadTableBody.appendChild(row);
    });

    updateLoadAccessorialTotal();
}

function setDateClass(dateCell, dateValue, status) {
    dateCell.className = '';
    const date = new Date(dateValue);
    const now = new Date();
    const diffMinutes = (date.getTime() - now.getTime()) / (1000 * 60);
    if (status === 'Delivered') {
        dateCell.classList.remove('date-past', 'date-today', 'date-very-close', 'date-close');
    } else {
        if (diffMinutes < 0) {
            dateCell.classList.add('date-past');
        } else if (diffMinutes <= 60 * 24) {
            dateCell.classList.add('date-today');
        } else if (diffMinutes <= 60 * 24 * 7) {
            dateCell.classList.add('date-very-close');
        } else if (diffMinutes <= 60 * 24 * 14) {
            dateCell.classList.add('date-close');
        }
    }
}

function setStatusClass(statusCell, status) {
    statusCell.className = '';
    switch (status.toLowerCase()) {
        case 'available':
            statusCell.classList.add('status-available');
            break;
        case 'packet':
            statusCell.classList.add('status-packet');
            break;
        case 'booked':
            statusCell.classList.add('status-booked');
            break;
        case 'quote':
            statusCell.classList.add('status-quote');
            break;
        case 'cancelled':
            statusCell.classList.add('status-cancelled');
            break;
        case 'at origin':
            statusCell.classList.add('status-at-origin');
            break;
        case 'in transit':
            statusCell.classList.add('status-in-transit');
            break;
        case 'delayed':
            statusCell.classList.add('status-delayed');
            break;
        case 'at destination':
            statusCell.classList.add('status-at-destination');
            break;
        case 'delivered':
            statusCell.classList.add('status-delivered');
            break;
        case 'on hold':
            statusCell.classList.add('status-on-hold');
            break;
        default:
            break;
    }
}

function setTrackingClass(trackingCell, tracking) {
    trackingCell.className = '';
    switch (tracking.toLowerCase()) {
        case 'nly':
            trackingCell.classList.add('tracking-nly');
            break;
        case 't':
            trackingCell.classList.add('tracking-t');
            break;
        case 'i':
            trackingCell.classList.add('tracking-i');
            break;
        case 'nt':
            trackingCell.classList.add('tracking-nt');
            break;
        case 'ntn':
            trackingCell.classList.add('tracking-ntn');
            break;
        default:
            break;
    }
}

function handleColumnConfigForm(event) {
    event.preventDefault();
    const checkboxIds = [
        'loadNumberColumn', 'customerColumn', 'equipmentColumn',
        'originCityColumn', 'originStateColumn', 'originZipColumn',
        'destinationCityColumn', 'destinationStateColumn', 'destinationZipColumn',
        'weightColumn', 'palletColumn', 'tempColumn',
        'poRefColumn', 'puApptDateColumn', 'puApptTimeColumn',
        'puActualDateColumn', 'puActualTimeColumn', 'puConfColumn',
        'delApptDateColumn', 'delApptTimeColumn', 'delActualDateColumn',
        'delActualTimeColumn', 'delConfColumn', 'statusColumn', 'trackingColumn',
        'notesColumn', 'mcnColumn', 'dotColumn', 'carrierNameColumn',
        'dispatchNameColumn', 'dispatchNumberColumn', 'dispatchEmailColumn',
        'driverNameColumn', 'driverNumberColumn', 'revenueColumn', 'costColumn',
        'accessorialColumn', 'marginColumn', 'opsIDColumn'
    ];
    const config = {};
    checkboxIds.forEach((checkboxId, index) => {
        const isChecked = document.getElementById(checkboxId).checked;
        const columnIndex = index + 1;
        const selector = `#loadTable th:nth-child(${columnIndex}), #loadTable td:nth-child(${columnIndex})`;
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.style.display = isChecked ? '' : 'none';
        });
        config[checkboxId] = isChecked;
    });
    localStorage.setItem('columnConfig', JSON.stringify(config));
    closeColumnConfigModal();
}

function loadColumnConfig() {
    const config = JSON.parse(localStorage.getItem('columnConfig')) || {};
    const checkboxIds = [
        'loadNumberColumn', 'customerColumn', 'equipmentColumn',
        'originCityColumn', 'originStateColumn', 'originZipColumn',
        'destinationCityColumn', 'destinationStateColumn', 'destinationZipColumn',
        'weightColumn', 'palletColumn', 'tempColumn',
        'poRefColumn', 'puApptDateColumn', 'puApptTimeColumn',
        'puActualDateColumn', 'puActualTimeColumn', 'puConfColumn',
        'delApptDateColumn', 'delApptTimeColumn', 'delActualDateColumn',
        'delActualTimeColumn', 'delConfColumn', 'statusColumn', 'trackingColumn',
        'notesColumn', 'mcnColumn', 'dotColumn', 'carrierNameColumn',
        'dispatchNameColumn', 'dispatchNumberColumn', 'dispatchEmailColumn',
        'driverNameColumn', 'driverNumberColumn', 'revenueColumn', 'costColumn',
        'accessorialColumn', 'marginColumn', 'opsIDColumn'
    ];
    checkboxIds.forEach(checkboxId => {
        const isChecked = config[checkboxId];
        document.getElementById(checkboxId).checked = isChecked;
        const columnIndex = checkboxIds.indexOf(checkboxId) + 1;
        const selector = `#loadTable th:nth-child(${columnIndex}), #loadTable td:nth-child(${columnIndex})`;
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.style.display = isChecked ? '' : 'none';
        });
    });
}

function displayNotesForLoad(loadNumber) {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';
    const notes = loadNotes[loadNumber] || [];
    notes.forEach((note, index) => {
        const noteDiv = document.createElement('div');
        noteDiv.textContent = note;
        noteDiv.addEventListener('click', () => {
            document.getElementById('noteInput').value = note.split(' ')[0];
            document.getElementById('userIdInput').value = note.split(' ')[1];
            noteDiv.dataset.index = index;
        });
        notesList.appendChild(noteDiv);
    });
}

function addNoteToLoad(loadNumber) {
    const noteInput = document.getElementById('noteInput').value;
    const userIdInput = document.getElementById('userIdInput').value;
    if (userIdInput.trim() === '') {
        alert('User ID is required.');
        return;
    }
    if (!loadNotes[loadNumber]) {
        loadNotes[loadNumber] = [];
    }
    const timestamp = new Date().toLocaleString();
    const newNote = `${noteInput} ${userIdInput} ${timestamp}`;
    loadNotes[loadNumber].push(newNote);
    saveNotesToStorage();
    document.getElementById('noteInput').value = '';
    document.getElementById('userIdInput').value = '';
    displayNotesForLoad(loadNumber);
}

function editNoteForLoad(loadNumber) {
    const noteInput = document.getElementById('noteInput').value;
    const userIdInput = document.getElementById('userIdInput').value;
    if (userIdInput.trim() === '') {
        alert('User ID is required.');
        return;
    }
    const timestamp = new Date().toLocaleString();
    const editedNote = `${noteInput} ${userIdInput} ${timestamp}`;
    const notesList = document.getElementById('notesList');
    const selectedNote = notesList.querySelector('div[data-index]');
    if (selectedNote) {
        const index = parseInt(selectedNote.dataset.index);
        loadNotes[loadNumber][index] = editedNote;
        selectedNote.removeAttribute('data-index');
        document.getElementById('noteInput').value = '';
        document.getElementById('userIdInput').value = '';
        saveNotesToStorage();
        displayNotesForLoad(loadNumber);
    } else {
        alert('Please select a note to edit.');
    }
}

function deleteNoteForLoad(loadNumber) {
    const notesList = document.getElementById('notesList');
    const selectedNote = notesList.querySelector('div[data-index]');
    if (selectedNote) {
        const index = parseInt(selectedNote.dataset.index);
        loadNotes[loadNumber].splice(index, 1);
        selectedNote.removeAttribute('data-index');
        document.getElementById('noteInput').value = '';
        document.getElementById('userIdInput').value = '';
        saveNotesToStorage();
        displayNotesForLoad(loadNumber);
    } else {
        alert('Please select a note to delete.');
    }
}

function downloadCSV() {
    const rows = [];
    const headers = [
        'Load Number', 'Customer', 'Equipment', 'Origin City', 'Origin State', 'Origin Zip',
        'Destination City', 'Destination State', 'Destination Zip', 'Weight', 'Pallet(s)',
        'Temp.', 'PO / Ref #', 'PU Appt Date', 'PU Appt Time', 'PU Actual Date', 'PU Actual Time',
        'PU Conf. #', 'Del Appt Date', 'Del Appt Time', 'Del Actual Date', 'Del Actual Time',
        'Del Conf. #', 'Load Status', 'Tracking Status', 'Notes', 'MCN', 'DOT', 'Carrier Name',
        'Dispatch Name', 'Dispatch #', 'Dispatch Email', 'Driver Name', 'Driver #', 'Revenue',
        'Cost', 'Accessorials', 'Margin', 'Ops ID'
    ];

    rows.push(headers.join(','));

    loads.forEach(load => {
        const notes = (load.notes || []).join('; ');
        const margin = load.revenue - load.cost + (load.accessorialTotal || 0);

        const row = [
            load.loadNumber, load.customer, load.equipment, load.originCity, load.originState, load.originZip,
            load.destinationCity, load.destinationState, load.destinationZip, load.weight || '', load.pallet || '',
            load.temp || '', load.poRef || '', load.puApptDate || '', load.puApptTime || '', load.puActualDate || '', load.puActualTime || '',
            load.puConf || '', load.delApptDate || '', load.delApptTime || '', load.delActualDate || '', load.delActualTime || '',
            load.delConf || '', load.status || '', load.tracking || '', notes || '', load.mcn || '', load.dot || '', load.carrierName || '',
            load.dispatchName || '', load.dispatchNumber || '', load.dispatchEmail || '', load.driverName || '', load.driverNumber || '',
            load.revenue || '', load.cost || '', load.accessorialTotal || '', margin || '', load.opsID || ''
        ];

        rows.push(row.map(value => `"${value}"`).join(','));
    });

    const csvContent = rows.join('\r\n');
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ops_loadboard_data.csv";
    a.click();
    URL.revokeObjectURL(url);
}

function openSortModal() {
    document.getElementById('sortModal').style.display = 'block';
}

function closeSortModal() {
    document.getElementById('sortModal').style.display = 'none';
}

function handleSortForm(event) {
    event.preventDefault();
    const sortColumn = document.getElementById('sortColumn').value;
    const sortOrder = document.getElementById('sortOrder').value;

    loads.sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    populateLoadTable();
    closeSortModal();
}

function populateSortColumns() {
    const columns = [
        'loadNumber', 'customer', 'equipment',
    ];
    const sortColumnSelect = document.getElementById('sortColumn');
    columns.forEach(column => {
        const option = document.createElement('option');
        option.value = column;
        option.textContent = column.replace(/([A-Z])/g, ' $1');
        sortColumnSelect.appendChild(option);
    });
}

function handleSearch() {
    const searchColumn = document.getElementById('searchColumn').value;
    const searchValue = document.getElementById('searchInput').value.toLowerCase();

    const filteredLoads = loads.filter(load => {
        return load[searchColumn].toLowerCase().includes(searchValue);
    });

    populateLoadTable(filteredLoads);
}

function populateSearchColumns() {
    const columns = [
        'loadNumber', 'customer', 'equipment',
    ];
    const searchColumnSelect = document.getElementById('searchColumn');
    columns.forEach(column => {
        const option = document.createElement('option');
        option.value = column;
        option.textContent = column.replace(/([A-Z])/g, ' $1');
        searchColumnSelect.appendChild(option);
    });
}