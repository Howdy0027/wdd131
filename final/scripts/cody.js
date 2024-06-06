/*
1. Event Listeners:
    - This group contains event listeners set up for various page elements. These listeners trigger functions when the page loads or when certain elements are interacted with.
*/
document.addEventListener('DOMContentLoaded', () => {
    // Load initial data from Local Storage
    loadInitialData();
    // Attach event listeners
    document.getElementById('createLoadButton').addEventListener('click', openModal);
    document.getElementById('logoutButton').addEventListener('click', handleLogout);
    document.getElementById('columnConfigButton').addEventListener('click', openColumnConfigModal);
    document.getElementById('addNoteButton').addEventListener('click', () => {
        const loadNumber = getCurrentLoadNumber(); // Replace this with the function to get the current load number
        addNoteToLoad(loadNumber);
    });
    document.getElementById('openNotesButton').addEventListener('click', () => {
        const loadNumber = getCurrentLoadNumber(); // Replace this with the function to get the current load number
        openNotesPopupForLoad(loadNumber);
    });
    document.getElementById('closeNotesButton').addEventListener('click', closeNotesPopup);
    // Load forms and table
    document.getElementById('loadForm').addEventListener('submit', handleLoadForm);
    document.getElementById('columnConfigForm').addEventListener('submit', handleColumnConfigForm);
});
/*
2. Data Loading and Saving:
- Functions in this group handle loading data from and saving data to Local Storage.
- 'loadInitialData' loads data from Local Storage and populates the load table.
- 'saveLoadsToLocalStorage' saves the loads array to Local Storage.
- 'loadNotesFromStorage' loads notes from local storage.
*/
// Declare arrays for loads
let loads = []; // Load data array
// Load initial data from Local Storage and populate the load table
function loadInitialData() {
    const savedLoads = localStorage.getItem('loads');
    if (savedLoads) {
        loads = JSON.parse(savedLoads);
    } else {
        // Provide an array with a sample data object if no data is saved in local storage
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
            accessorialTotal,
            opsID
        }];
    }
    // Populate the load table with data
    populateLoadTable();
}
// Save the loads array to Local Storage
function saveLoadsToLocalStorage() {
    localStorage.setItem('loads', JSON.stringify(loads));
}
// Function to save notes for each load number to localStorage
function saveNotesToStorage() {
    localStorage.setItem('loadNotes', JSON.stringify(loadNotes));
}
// Function to load notes for each load number from localStorage
function loadNotesFromStorage() {
    const savedNotes = localStorage.getItem('loadNotes');
    return savedNotes ? JSON.parse(savedNotes) : {};
}
/*
3. UI Functions:
- This group includes functions that open and close modals, and handle user interaction.
- 'openModal' and 'closeModal' control the visibility of the load form modal.
- 'openColumnConfigModal' and 'closeColumnConfigModal' control the visibility of the column configuration modal.
- 'openNotesPopup' and 'closeNotesPopup' handle opening and closing the notes popup window.
*/
// Function to open the load form modal
function openModal() {
    document.getElementById('loadForm').reset();
    document.getElementById('modalTitle').innerText = 'Create New Load';
    document.getElementById('loadModal').style.display = 'block';
}
// Function to close the load form modal
function closeModal() {
    document.getElementById('loadModal').style.display = 'none';
}
// Function to open the column configuration modal
function openColumnConfigModal() {
    document.getElementById('columnConfigModal').style.display = 'block';
}
// Function to close the column configuration modal
function closeColumnConfigModal() {
    document.getElementById('columnConfigModal').style.display = 'none';
}
// Function to open the notes popup window for a specific load
function openNotesPopupForLoad(loadNumber) {
    // Store the current load number in a global variable for later use
    currentLoadNumber = loadNumber;
    // Display the notes popup
    document.getElementById('notesPopup').style.display = 'block';
    document.getElementById('popupOverlay').style.display = 'block';
    // Display notes for the current load
    displayNotesForLoad(loadNumber);
}
// Function to close the notes popup window
function closeNotesPopup() {
    document.getElementById('notesPopup').style.display = 'none';
    document.getElementById('popupOverlay').style.display = 'none';
}
/*
4. Form Handling:
- Functions in this group handle form submissions and updates to load data.
- 'handleLoadForm' handles form submission for creating or editing loads.
- 'editLoad' opens the load form modal for editing an existing load.
- 'deleteLoad' removes a load from the loads array.
*/
// Handle form submission for creating or editing loads
function handleLoadForm(event) {
    event.preventDefault();
    // Gather form input values
    const loadNumber = parseInt(document.getElementById('loadNumberInput').value);
    const customer = document.getElementById('customerInput').value;
    const equipment = document.getElementById('equipmentInput').value;
    const originCity = document.getElementById('originCityInput').value;
    const originState = document.getElementById('originStateInput').value;
    const originZip = document.getElementById('originZipInput').value;
    const destinationCity = document.getElementById('destinationCityInput').value;
    const destinationState = document.getElementById('destinationStateInput').value;
    const destinationZip = document.getElementById('destinationZipInput').value;
    const weight = parseInt(document.getElementById('weightInput').value);
    const pallet = parseInt(document.getElementById('palletInput').value);
    const temp = parseInt(document.getElementById('tempInput').value);
    const poRef = document.getElementById('poRefInput').value;
    const puApptDate = document.getElementById('puApptDateInput').value;
    const puApptTime = document.getElementById('puApptTimeInput').value;
    const puActualDate = document.getElementById('puActualDateInput').value;
    const puActualTime = document.getElementById('puActualTimeInput').value;
    const puConf = document.getElementById('puConfInput').value;
    const delApptDate = document.getElementById('delApptDateInput').value;
    const delApptTime = document.getElementById('delApptTimeInput').value;
    const delActualDate = document.getElementById('delActualDateInput').value;
    const delActualTime = document.getElementById('delActualTimeInput').value;
    const delConf = document.getElementById('delConfInput').value;
    const status = document.getElementById('statusInput').value;
    const tracking = document.getElementById('trackingInput').value;
    const mcn = parseInt(document.getElementById('mcnInput').value);
    const dot = parseInt(document.getElementById('dotInput').value);
    const carrierName = document.getElementById('carrierNameInput').value;
    const dispatchName = document.getElementById('dispatchNameInput').value;
    const dispatchNumber = document.getElementById('dispatchNumberInput').value;
    const dispatchEmail = document.getElementById('dispatchEmailInput').value;
    const driverName = document.getElementById('driverNameInput').value;
    const driverNumber = document.getElementById('driverNumberInput').value;
    const revenue = parseFloat(document.getElementById('revenueInput').value);
    const cost = parseFloat(document.getElementById('costInput').value);
    const accessorialTotal = parseFloat(document.getElementById('accessorialTotalInput').value);
    const opsID = document.getElementById('opsIDInput').value;
    // Create a load object with the form input values
    const newLoad = {
        loadNumber,
        customer,
        equipment,
        originCity,
        originState,
        originZip,
        destinationCity,
        destinationState,
        destinationZip,
        weight,
        pallet,
        temp,
        poRef,
        puApptDate,
        puApptTime,
        puActualDate,
        puActualTime,
        puConf,
        delApptDate,
        delApptTime,
        delActualDate,
        delActualTime,
        delConf,
        status,
        tracking,
        notes,
        mcn,
        dot,
        carrierName,
        dispatchName,
        dispatchNumber,
        dispatchEmail,
        driverName,
        driverNumber,
        revenue,
        cost,
        accessorialTotal,
        opsID
    };
    // Check if a load with the same loadNumber already exists
    const existingLoadIndex = loads.findIndex(load => load.loadNumber === loadNumber);
    if (existingLoadIndex !== -1) {
        // Update the existing load with the new data
        loads[existingLoadIndex] = newLoad;
    } else {
        // Add the new load to the loads array if it doesn't already exist
        loads.push(newLoad);
    }
    // Save the loads array to Local Storage
    saveLoadsToLocalStorage();
    // Update the load table
    populateLoadTable();
    // Close the modal
    closeModal();
}
// Open the load form modal for editing an existing load
function editLoad(index) {
    const load = loads[index];
    // Set form values based on the load data
    document.getElementById('modalTitle').innerText = `Edit Load # ${load.loadNumber}`;
    document.getElementById('loadNumberInput').value = load.loadNumber;
    document.getElementById('customerInput').value = load.customer;
    document.getElementById('equipmentInput').value = load.equipment;
    document.getElementById('originCityInput').value = load.originCity;
    document.getElementById('originStateInput').value = load.originState;
    document.getElementById('originZipInput').value = load.originZip;
    document.getElementById('destinationCityInput').value = load.destinationCity;
    document.getElementById('destinationStateInput').value = load.destinationState;
    document.getElementById('destinationZipInput').value = load.destinationZip;
    document.getElementById('weightInput').value = load.weight;
    document.getElementById('palletInput').value = load.pallet;
    document.getElementById('tempInput').value = load.temp;
    document.getElementById('poRefInput').value = load.poRef;
    document.getElementById('puApptDateInput').value = load.puApptDate;
    document.getElementById('puApptTimeInput').value = load.puApptTime;
    document.getElementById('puActualDateInput').value = load.puActualDate;
    document.getElementById('puActualTimeInput').value = load.puActualTime;
    document.getElementById('puConfInput').value = load.puConf;
    document.getElementById('delApptDateInput').value = load.delApptDate;
    document.getElementById('delApptTimeInput').value = load.delApptTime;
    document.getElementById('delActualDateInput').value = load.delActualDate;
    document.getElementById('delActualTimeInput').value = load.delActualTime;
    document.getElementById('delConfInput').value = load.delConf;
    document.getElementById('statusInput').value = load.status;
    document.getElementById('trackingInput').value = load.tracking;
    document.getElementById('mcnInput').value = load.mcn;
    document.getElementById('dotInput').value = load.dot;
    document.getElementById('carrierNameInput').value = load.carrierName;
    document.getElementById('dispatchNameInput').value = load.dispatchName;
    document.getElementById('dispatchNumberInput').value = load.dispatchNumber;
    document.getElementById('dispatchEmailInput').value = load.dispatchEmail;
    document.getElementById('driverNameInput').value = load.driverName;
    document.getElementById('driverNumberInput').value = load.driverNumber;
    document.getElementById('revenueInput').value = load.revenue;
    document.getElementById('costInput').value = load.cost;
    document.getElementById('accessorialTotalInput').value = load.accessorialTotal;
    document.getElementById('opsIDInput').value = load.opsID;

    // Set the form submission handler
    document.getElementById('loadForm').onsubmit = (event) => {
        event.preventDefault();
        // Update the load data with form input values
        load.loadNumber = parseInt(document.getElementById('loadNumberInput').value);
        load.customer = document.getElementById('customerInput').value;
        load.equipment = document.getElementById('equipmentInput').value;
        load.originCity = document.getElementById('originCityInput').value;
        load.originState = document.getElementById('originStateInput').value;
        load.originZip = document.getElementById('originZipInput').value;
        load.destinationCity = document.getElementById('destinationCityInput').value;
        load.destinationState = document.getElementById('destinationStateInput').value;
        load.destinationZip = document.getElementById('destinationZipInput').value;
        load.weight = parseInt(document.getElementById('weightInput').value);
        load.pallet = parseInt(document.getElementById('palletInput').value);
        load.temp = parseInt(document.getElementById('tempInput').value);
        load.poRef = document.getElementById('poRefInput').value;
        load.puApptDate = document.getElementById('puApptDateInput').value;
        load.puApptTime = document.getElementById('puApptTimeInput').value;
        load.puActualDate = document.getElementById('puActualDateInput').value;
        load.puActualTime = document.getElementById('puActualTimeInput').value;
        load.puConf = document.getElementById('puConfInput').value;
        load.delApptDate = document.getElementById('delApptDateInput').value;
        load.delApptTime = document.getElementById('delApptTimeInput').value;
        load.delActualDate = document.getElementById('delActualDateInput').value;
        load.delActualTime = document.getElementById('delActualTimeInput').value;
        load.delConf = document.getElementById('delConfInput').value;
        load.status = document.getElementById('statusInput').value;
        load.tracking = document.getElementById('trackingInput').value;
        load.mcn = parseInt(document.getElementById('mcnInput').value);
        load.dot = parseInt(document.getElementById('dotInput').value);
        load.carrierName = document.getElementById('carrierNameInput').value;
        load.dispatchName = document.getElementById('dispatchNameInput').value;
        load.dispatchNumber = document.getElementById('dispatchNumberInput').value;
        load.dispatchEmail = document.getElementById('dispatchEmailInput').value;
        load.driverName = document.getElementById('driverNameInput').value;
        load.driverNumber = document.getElementById('driverNumberInput').value;
        load.revenue = parseFloat(document.getElementById('revenueInput').value);
        load.cost = parseFloat(document.getElementById('costInput').value);
        load.accessorialTotal = parseFloat(document.getElementById('accessorialTotalInput').value);
        load.opsID = document.getElementById('opsIDInput').value;
        // Save the loads array to Local Storage
        saveLoadsToLocalStorage();
        // Update the load table
        populateLoadTable();
        // Close the modal
        closeModal();
    };
    // Show the load form modal
    document.getElementById('loadModal').style.display = 'block';
}
// Delete a load from the loads array
function deleteLoad(index) {
    // Prompt the user for confirmation
    if (confirm('Are you sure you want to delete this load?')) {
        // Remove the load at the specified index
        loads.splice(index, 1);
        // Save the updated loads array to Local Storage
        saveLoadsToLocalStorage();
        // Update the load table to reflect the changes
        populateLoadTable();
    }
}
// Duplicate a load and add it to the loads array
function duplicateLoad(index) {
    const loadToDuplicate = loads[index];
    // Create a new load object with the same information as the selected load
    const newLoad = {
        ...loadToDuplicate,
        // You may need to generate a new unique loadNumber for the duplicate load
        loadNumber: generateNewLoadNumber(), // Implement this function as needed
    };
    // Add the new load to the loads array
    loads.push(newLoad);
    // Save the updated loads array to Local Storage
    saveLoadsToLocalStorage();
    // Update the load table
    populateLoadTable();
}
// Example function to generate a new unique load number
function generateNewLoadNumber() {
    // For now, just increment the last load number by one
    const lastLoadNumber = loads.length > 0 ? loads[loads.length - 1].loadNumber : 0;
    return lastLoadNumber + 1;
}
/*
5. Table Population and Configuration:
- Functions in this group handle populating and configuring the load table.
- 'populateLoadTable' populates the load table with data from the loads array.
- 'setDateClass' and 'setStatusClass' set appropriate classes for date and status cells.
*/
// Function to populate the load table with load data
function populateLoadTable() {
    const loadTableBody = document.getElementById('loadTableBody');
    loadTableBody.innerHTML = '';

    // Iterate through sorted loads and create table rows
    loads.forEach((load, index) => {
        const row = document.createElement('tr');
        row.dataset.loadNumber = load.loadNumber; // Add this line to set data attribute for the load number
        // Populate row with load data
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
        // Set class for the status cell based on load status
        const statusCell = row.querySelector('.status-cell');
        setStatusClass(statusCell, load.status);
        // Set class for the status cell based on load status
        const trackingCell = row.querySelector('.tracking-cell');
        setTrackingClass(trackingCell, load.tracking);
        // Set class for date cells based on the date's proximity to today
        const dateCells = row.querySelectorAll('.date-cell');
        dateCells.forEach((dateCell) => {
            setDateClass(dateCell, dateCell.textContent, load.status);
        });
        loadTableBody.appendChild(row);
    });

    // Update the accessorial totals after populating the table
    updateLoadAccessorialTotal();
}
// Function to set class for date cells based on proximity to today and load status
function setDateClass(dateCell, dateValue, status) {
    // Clear existing classes
    dateCell.className = '';
    // Parse the date value and get the current date and time
    const date = new Date(dateValue);
    const now = new Date();
    // Calculate the difference in time in milliseconds and convert to minutes
    const diffMinutes = (date.getTime() - now.getTime()) / (1000 * 60);
    // Check the status
    if (status === 'Delivered') {
        // Reset the color formatting for date cells if the load is delivered
        dateCell.classList.remove('date-past', 'date-today', 'date-very-close', 'date-close');
    } else {
        // Apply color formatting based on the difference in time to the appointment
        if (diffMinutes < 0) {
            // The date is in the past (or the load is overdue)
            dateCell.classList.add('date-past');
        } else if (diffMinutes <= 60 * 24) {
            // The date is within the next 24 hours (or today)
            dateCell.classList.add('date-today');
        } else if (diffMinutes <= 60 * 24 * 7) {
            // The date is within the next 7 days
            dateCell.classList.add('date-very-close');
        } else if (diffMinutes <= 60 * 24 * 14) {
            // The date is within the next 14 days
            dateCell.classList.add('date-close');
        }
    }
}
// Function to set class for status cell based on status value
function setStatusClass(statusCell, status) {
    // Remove any existing status class
    statusCell.className = '';
    // Add the appropriate class based on status value
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
            break; // No class for unrecognized status
    }
}
// Function to set class for status cell based on status value
function setTrackingClass(trackingCell, tracking) {
    // Remove any existing status class
    trackingCell.className = '';
    // Add the appropriate class based on status value
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
            break; // No class for unrecognized status
    }
}
/*
6. Column Configuration Handling:
- Functions in this group handle the column configuration of the load table.
- 'handleColumnConfigForm' manages form submission for column configuration.
- Event listener setup to handle opening and closing the column configuration modal.
*/
// Handle form submission for column configuration
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
    // Iterate over each checkbox ID and adjust the visibility of columns accordingly
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
// Load saved column configuration
function loadColumnConfig() {
    const config = JSON.parse(localStorage.getItem('columnConfig')) || {};
    Object.keys(config).forEach(checkboxId => {
        document.getElementById(checkboxId).checked = config[checkboxId];
        const columnIndex = checkboxIds.indexOf(checkboxId) + 1;
        const selector = `#loadTable th:nth-child(${columnIndex}), #loadTable td:nth-child(${columnIndex})`;
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.style.display = config[checkboxId] ? '' : 'none';
        });
    });
}
document.addEventListener('DOMContentLoaded', () => {
    loadColumnConfig();
});
// Event listeners for modal opening and closing
document.addEventListener("DOMContentLoaded", function () {
    // Select necessary elements
    const columnConfigButton = document.getElementById("columnConfigButton");
    const columnConfigModal = document.getElementById("columnConfigModal");
    const closeColumnConfigModalButton = document.querySelector("#columnConfigModal .close-button");
    const cancelColumnConfigButton = document.getElementById("cancelColumnConfigButton");
    const selectAllButton = document.getElementById("selectAllButton");
    const deselectAllButton = document.getElementById("deselectAllButton");
    const columnConfigForm = document.getElementById("columnConfigForm");
    const checkboxes = columnConfigForm.querySelectorAll('input[type="checkbox"]');
    // Open the column configuration modal
    columnConfigButton.addEventListener("click", () => {
        columnConfigModal.style.display = "block";
    });
    // Close the column configuration modal
    closeColumnConfigModalButton.addEventListener("click", () => {
        columnConfigModal.style.display = "none";
    });
    // Close modal when cancel button is clicked
    cancelColumnConfigButton.addEventListener("click", () => {
        columnConfigModal.style.display = "none";
    });
    // Event listeners for "Select All" and "Deselect All" buttons
    selectAllButton.addEventListener("click", () => {
        checkboxes.forEach(checkbox => {
            checkbox.checked = true;
        });
    });
    deselectAllButton.addEventListener("click", () => {
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
    });
    // Event listener for form submission
    columnConfigForm.addEventListener("submit", handleColumnConfigForm);
});

/*
7. Data Fetching and Dropdown Population:
- Functions in this group fetch and parse data from CSV files and populate dropdown lists.
- 'initializePage' sets up initialization tasks and event listeners.
- 'fetchCSVData' fetches and parses CSV files.
- 'populateDropdown' populates a dropdown list with data.
- 'loadCustomerData' and 'loadEquipmentData' fetch and populate data for customer and equipment, respectively.
*/
// Call the initialize function when the window loads
window.onload = initializePage;

// Function to initialize data and set up event listeners
function initializePage() {
    // Initialize customer, equipment and Asscessorial data
    loadCustomerData();
    loadEquipmentData();
    loadAccessorialsFromStorage();
    openAccessorialModalFromLoadModal();
    updateLoadAccessorialTotal();
    // Add additional initialization tasks and event listeners here as needed
}

// Function to fetch and parse CSV files
function fetchCSVData(url, callback) {
    fetch(url)
        .then(response => response.text())
        .then(csvData => {
            const rows = csvData.split('\n');
            const data = rows.map(row => row.split(','));
            // Remove the header row if necessary
            if (data.length > 0 && (data[0][0].includes('ID') || data[0][0].includes('id'))) {
                data.shift();
            }
            callback(data);
        })
        .catch(error => {
            console.error('Error fetching CSV:', error);
        });
}

// Function to populate a dropdown list with provided data
function populateDropdown(dropdownId, data) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.innerHTML = ''; // Clear existing options
    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select...';
    dropdown.appendChild(defaultOption);
    // Populate options from data
    data.forEach(item => {
        const option = document.createElement('option');
        option.value = item[0];
        option.textContent = item[1];
        dropdown.appendChild(option);
    });
}

// Function to load and populate customer data from a CSV file
function loadCustomerData() {
    fetchCSVData('files/jones_customers.csv', data => {
        populateDropdown('customerInput', data);
    });
}

// Function to load and populate equipment data from a CSV file
function loadEquipmentData() {
    fetchCSVData('files/equip_types.csv', data => {
        populateDropdown('equipmentInput', data);
    });
}
/*
8. Notes, logout and Accessorial Management:
- Functions in this group handle the notes feature, including opening and closing the notes popup and adding new notes.
- 'displayNotes' displays notes in the notes popup.
- 'addNote' adds a new note to the notes array.
*/
// Load notes from local storage as an object where each key is a load number
let loadNotes = loadNotesFromStorage() || {};

// Function to display notes for a specific load number in the notes popup window
function displayNotesForLoad(loadNumber) {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = ''; // Clear previous list
    const notes = loadNotes[loadNumber] || [];
    notes.forEach((note, index) => {
        const noteDiv = document.createElement('div');
        noteDiv.textContent = note;
        // Add event to select note for editing
        noteDiv.addEventListener('click', () => {
            document.getElementById('noteInput').value = note.split(' ')[0]; // Get note part
            document.getElementById('userIdInput').value = note.split(' ')[1]; // Get user ID part
            noteDiv.dataset.index = index; // Store the index of the note for editing
        });
        notesList.appendChild(noteDiv);
    });
}

// Function to add a new note to a specific load number
function addNoteToLoad(loadNumber) {
    const noteInput = document.getElementById('noteInput').value;
    const userIdInput = document.getElementById('userIdInput').value;
    if (userIdInput.trim() === '') {
        alert('User ID is required.');
        return;
    }
    // Ensure there is an array for the load number in loadNotes
    if (!loadNotes[loadNumber]) {
        loadNotes[loadNumber] = [];
    }
    const timestamp = new Date().toLocaleString();
    const newNote = `${noteInput} ${userIdInput} ${timestamp}`;
    loadNotes[loadNumber].push(newNote);
    // Save notes to local storage
    saveNotesToStorage();
    // Clear inputs
    document.getElementById('noteInput').value = '';
    document.getElementById('userIdInput').value = '';
    // Display updated notes for the current load
    displayNotesForLoad(loadNumber);
}
// Function to edit a note for a specific load number
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
        selectedNote.removeAttribute('data-index'); // Clear the data-index attribute
        // Clear inputs
        document.getElementById('noteInput').value = '';
        document.getElementById('userIdInput').value = '';
        // Save notes to local storage
        saveNotesToStorage();
        // Display updated notes for the current load
        displayNotesForLoad(loadNumber);
    } else {
        alert('Please select a note to edit.');
    }
}
// Function to delete a note for a specific load number
function deleteNoteForLoad(loadNumber) {
    const notesList = document.getElementById('notesList');
    const selectedNote = notesList.querySelector('div[data-index]');
    if (selectedNote) {
        const index = parseInt(selectedNote.dataset.index);
        loadNotes[loadNumber].splice(index, 1);
        selectedNote.removeAttribute('data-index'); // Clear the data-index attribute
        // Clear inputs
        document.getElementById('noteInput').value = '';
        document.getElementById('userIdInput').value = '';
        // Save notes to local storage
        saveNotesToStorage();
        // Display updated notes for the current load
        displayNotesForLoad(loadNumber);
    } else {
        alert('Please select a note to delete.');
    }
}

// Function to handle user logout
function handleLogout() {
    // Clear user session data if any (e.g., local storage, cookies)
    // Redirect the user to the login page
    alert('You have been logged out.');
    window.location.href = '/Login/login.html'; // Update the URL to the actual login page URL
}

// Load accessorials from local storage as an object where each key is a load number
let loadAccessorials = loadAccessorialsFromStorage() || {};

// Function to populate the accessorial list in the load modal
function populateAccessorialList(loadNumber) {
    const accessorialList = document.getElementById('accessorialsList');
    accessorialList.innerHTML = ''; // Clear previous list
    const accessorials = loadAccessorials[loadNumber] || [];
    accessorials.forEach((accessorial, index) => {
        const accessorialItem = document.createElement('li');
        accessorialItem.innerHTML = `${accessorial.reason} - $${accessorial.amount.toFixed(2)} <button onclick="deleteAccessorial(${index}, '${loadNumber}')">Delete</button>`;
        accessorialList.appendChild(accessorialItem);
    });
    updateAccessorialTotal(loadNumber);
}

// Function to add an accessorial
function addAccessorial() {
    const note = document.getElementById('accessorialNote').value.trim();
    const cost = parseFloat(document.getElementById('accessorialCost').value.trim());
    if (isNaN(cost) || note === '') {
        alert('Please enter a valid note and cost.');
        return;
    }
    const loadNumber = document.getElementById('loadNumberInput').value;
    if (!loadAccessorials[loadNumber]) {
        loadAccessorials[loadNumber] = [];
    }
    loadAccessorials[loadNumber].push({ reason: note, amount: cost });
    populateAccessorialList(loadNumber);
    saveAccessorialsToStorage();
    // Clear inputs
    document.getElementById('accessorialNote').value = '';
    document.getElementById('accessorialCost').value = '';
}

// Function to delete an accessorial
function deleteAccessorial(index, loadNumber) {
    if (loadAccessorials[loadNumber]) {
        loadAccessorials[loadNumber].splice(index, 1);
        populateAccessorialList(loadNumber); // Re-populate the list
        saveAccessorialsToStorage();
    }
}

// Function to update the accessorial total
function updateAccessorialTotal(loadNumber) {
    const totalElement = document.getElementById('accessorialTotalInput');
    const total = calculateAccessorialTotal(loadNumber);
    totalElement.value = `${total.toFixed(2)}`;
}

// Function to calculate the total cost of accessorials for a load
function calculateAccessorialTotal(loadNumber) {
    const accessorials = loadAccessorials[loadNumber] || [];
    let total = 0;
    accessorials.forEach(accessorial => {
        total += accessorial.amount;
    });
    return total;
}

// Save accessorials to localStorage
function saveAccessorialsToStorage() {
    localStorage.setItem('loadAccessorials', JSON.stringify(loadAccessorials));
}

// Load accessorials from localStorage
function loadAccessorialsFromStorage() {
    const storedAccessorials = localStorage.getItem('loadAccessorials');
    return storedAccessorials ? JSON.parse(storedAccessorials) : {};
}

// Call this function to open the load modal and populate accessorials
function openLoadModal(loadNumber) {
    // Populate existing load details
    // ...

    // Populate accessorials
    populateAccessorialList(loadNumber);

    // Show the modal
    document.getElementById('loadModal').style.display = 'block';
}

// Function to close the load modal
function closeLoadModal() {
    document.getElementById('loadModal').style.display = 'none';
}

// Event listener for form submission to handle saving load details
document.getElementById('loadForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const loadNumber = document.getElementById('loadNumberInput').value;
    // Handle saving load details including accessorials
    // ...
    closeLoadModal();
});
/*
10. Download CSV:
- Add function to download table data as a CSV file
- Add event listener to download button
*/
// Function to download table data as a CSV file
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

    // Add headers to the CSV
    rows.push(headers.join(','));

    // Add data rows to the CSV
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

        rows.push(row.map(value => `"${value}"`).join(',')); // Wrap each value in quotes to handle commas
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

// Event listener for the download button
document.addEventListener("DOMContentLoaded", function () {
    const downloadButton = document.getElementById("downloadButton");
    downloadButton.addEventListener("click", downloadCSV);
});
/*
11. Sort:
- Add event listener to sort button
- Add function to open the sort modal
- Add function to close the sort modal
- Add function to handle form submission for sorting
- Add function to populate sort columns dropdown
- Add function to sort table
- Add function to populate load table
*/
// Function to open the sort modal
function openSortModal() {
    document.getElementById('sortModal').style.display = 'block';
}

// Function to close the sort modal
function closeSortModal() {
    document.getElementById('sortModal').style.display = 'none';
}

// Handle form submission for sorting
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

document.getElementById('sortForm').addEventListener('submit', handleSortForm);

// Populate sort columns dropdown
function populateSortColumns() {
    const columns = [
        'loadNumber', 'customer', 'equipment',
        // add all other column keys
    ];
    const sortColumnSelect = document.getElementById('sortColumn');
    columns.forEach(column => {
        const option = document.createElement('option');
        option.value = column;
        option.textContent = column.replace(/([A-Z])/g, ' $1');
        sortColumnSelect.appendChild(option);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    populateSortColumns();
});
/*
11. Search:
- Add event listener to search button
- Add function to populate search columns dropdown
- Add function to handle search functionality
- Add function to populate load table
- Add function to filter loads
- Add function to populate load table
- Add function to clear search
*/
// Handle search functionality
function handleSearch() {
    const searchColumn = document.getElementById('searchColumn').value;
    const searchValue = document.getElementById('searchInput').value.toLowerCase();

    const filteredLoads = loads.filter(load => {
        return load[searchColumn].toLowerCase().includes(searchValue);
    });

    populateLoadTable(filteredLoads);
}

// Populate search columns dropdown
function populateSearchColumns() {
    const columns = [
        'loadNumber', 'customer', 'equipment',
        // add all other column keys
    ];
    const searchColumnSelect = document.getElementById('searchColumn');
    columns.forEach(column => {
        const option = document.createElement('option');
        option.value = column;
        option.textContent = column.replace(/([A-Z])/g, ' $1');
        searchColumnSelect.appendChild(option);
    });
}

document.getElementById('searchButton').addEventListener('click', handleSearch);

document.addEventListener('DOMContentLoaded', () => {
    populateSearchColumns();
});

// Function to populate load table with filtered loads
function populateLoadTable(loadsToDisplay = loads) {
    const loadTableBody = document.getElementById('loadTableBody');
    loadTableBody.innerHTML = '';

    loadsToDisplay.forEach((load, index) => {
        const row = document.createElement('tr');
        row.dataset.loadNumber = load.loadNumber;
        // Populate row with load data
        row.innerHTML = `
            <!-- add row content -->
        `;
        loadTableBody.appendChild(row);
    });
}

