
// have a link to this file

function search() {
    const jobsBanner = document.getElementById("jobs"); // Get reference to empty div object in HTML
    const searchBar = document.getElementById('search'); // Get reference to search bar object in HTML
    const instance = M.Chips.getInstance(searchBar); // Turning the search bar reference variable into materialize object
    const filters = instance.chipsData.map(d => d.tag); // Get array of filters from search bar
    jobsBanner.innerHTML = "";
    fetch("./data.json").then(res => res.json()).then(data => {
        data.forEach(job => {
            var languages = "";
            const langandtools = job.languages.concat(job.tools);
            const checkFilters = filters.every(f => langandtools.includes(f)); // Check whether every element in filters appears in this job's language list
            if (!checkFilters){
                return; // If above is not true, exit out of this loop
            }
            langandtools.forEach(lang => {
                languages += `<div class="chip" style="cursor:pointer;" onclick="addFilter('${lang}')">
                ${lang}
            </div>`
            })
            // Iterate through each job with for loop with a card displaying the info of the job
            const template = `
            <div class="row">
                    <div class="col s12">
                        <div class="card blue-grey darken-1">
                            <div class="card-content white-text">
                                <span class="card-title">${job.company} ${job.new ? '<span class="new badge"></span>' : ""} ${job.featured ? '<span class="new badge deep-orange" data-badge-caption="featured"></span>' : ""}</span>
                                <h6>${job.position}</h6>
                                <p>${job.role} • ${job.level}</p>
                                <div class="right">
                                    ${languages}
                                </div>

                            </div>
                            <br>
                            <div class="card-action">
                                <a class="white-text"><i class="material-icons" style="vertical-align: -5px;">location_city</i> ${job.location}</a>
                                <a class="white-text"><i class="material-icons" style="vertical-align: -5px;">access_time</i> ${job.postedAt}</a>
                                <a class="white-text"><i class="material-icons" style="vertical-align: -5px;">work</i> ${job.contract}</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            jobsBanner.innerHTML += template; // Inintially empty - adding the cards to this empty div
        });
    }
    );
}

function addFilter(lang) { // Function to add a filter to the search bar
    const searchBar = document.getElementById('search');
    const instance = M.Chips.getInstance(searchBar);
    instance.addChip({
        tag: lang,
    });
}

document.addEventListener('DOMContentLoaded', function () { // Sets up what to do when the page loads for the first time
    const searchBar = document.getElementById('search');
    const instances = M.Chips.init(searchBar, { // Set up search bar object
        placeholder: "  Filter jobs", // Set placeholder text
        onChipAdd: search, // Recall search function when new filter is added
        onChipDelete: search, // Recall search function when filter is deleted
    });

    search(); // Call search function once for the first time when the page loads
});       
