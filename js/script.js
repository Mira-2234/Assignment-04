console.log('hello world.!');

let interviewList = [];
let rejectedList = [];
let currentStatus = 'all';

const totalEl = document.getElementById('total');
const interviewCountEl = document.getElementById('interviewCount');
const rejectedCountEl = document.getElementById('rejectedCount');


const allJobsBtn = document.getElementById('all-jobs-btn');
const interviewBtn = document.getElementById('interview-btn');
const rejectedBtn = document.getElementById('rejected-btn');


const allCardSection = document.getElementById('all-cards');
const cardSection = document.getElementById('card-section');
const jobsCountEl = document.getElementById('job-count');



// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    
    allCardSection.classList.remove('hidden');
    cardSection.classList.add('hidden');

    toggleStyle('all-jobs-btn');
    calculate();
    jobsUpdate();
});

// Calculate
function calculate() {
    totalEl.innerText = allCardSection.children.length;
    interviewCountEl.innerText = interviewList.length;
    rejectedCountEl.innerText = rejectedList.length;
}

// Update jobs count
function jobsUpdate() {
    if (jobsCountEl) {
        if (currentStatus === 'all-jobs-btn') {
            jobsCountEl.innerText = `${allCardSection.children.length} Jobs`;
        } else if (currentStatus === 'interview-btn'){
         jobsCountEl.innerText = `${interviewList.length} Jobs`;
        } else if (currentStatus === 'rejected-btn') {
            jobsCountEl.innerText = `${rejectedList.length} Jobs`;
        }
    }
}

// Toggle button style
function toggleStyle(id) {
    // Reset all buttons
    [allJobsBtn, interviewBtn, rejectedBtn].forEach(btn => {
        btn.classList.remove('bg-[#3B82F6]', 'text-white');
        btn.classList.add('bg-white', 'text-[#64748B]');
    });

    // Style selected button
    const selected = document.getElementById(id);
    selected.classList.remove('bg-white', 'text-[#64748B]');
    selected.classList.add('bg-[#3B82F6]', 'text-white');

    currentStatus = id;

    if (id === 'all-jobs-btn') {
        allCardSection.classList.remove('hidden');
        cardSection.classList.add('hidden');
        jobsUpdate();
    } 
    else if (id === 'interview-btn') {
        console.log('Interview button clicked');
        allCardSection.classList.add('hidden');
        cardSection.classList.remove('hidden');

        if (interviewList.length === 0) {
            cardSection.innerHTML = `
                <div class="text-center py-12 bg-white rounded-xl shadow-md mb-10 mt-36">
                    <div class="text-6xl mb-4"><i class="fa-solid fa-file-lines"></i></div>
                    <h3 class="text-2xl font-bold mb-2" style="color: #10B981">No Interview Jobs</h3>
                    <p class="text-gray-500">Mark jobs as interview to see them here</p>
                </div> `;
        } else {
            renderInterviewJobs();
        }
        jobsUpdate();
    } 
    else if (id === 'rejected-btn') {
        console.log('Rejected button clicked');
        allCardSection.classList.add('hidden');
        cardSection.classList.remove('hidden');

        if (rejectedList.length === 0) {
            cardSection.innerHTML = `
                <div class="text-center py-12 bg-white rounded-xl shadow-md mb-10">
                    <div class="text-6xl mb-4"><i class="fa-solid fa-file-lines"></i></div>
                    <h3 class="text-2xl font-bold mb-2" style="color: #EF4444">No Rejected Jobs</h3>
                    <p class="text-gray-500">Mark jobs as rejected to see them here</p>
                </div>`;
        } else {
            renderRejectedJobs();
        }
        jobsUpdate();
    }
}

// Render Interview Jobs
function renderInterviewJobs() {
    let html = '';
    interviewList.forEach(card => {
        const cardClone = card.cloneNode(true);

        const statusBadge = cardClone.querySelector('.bg-[#EEF4FF]');
        if (statusBadge) {
            statusBadge.innerText = 'Interview';
            statusBadge.classList.remove('bg-[#EEF4FF]', 'text-[#002C5C]');
            statusBadge.classList.add('bg-[#10B981]', 'text-white');
        }

        const interviewBtn = cardClone.querySelector('.border-[#10B981]');
        const rejectedBtn = cardClone.querySelector('.border-[#EF4444]');

        if (interviewBtn) {
            interviewBtn.style.opacity = '0.5';
            interviewBtn.style.cursor = 'not-allowed';
            interviewBtn.setAttribute('disabled', 'disabled');
        }

        if (rejectedBtn) {
            rejectedBtn.style.opacity = '0.5';
            rejectedBtn.style.cursor = 'not-allowed';
            rejectedBtn.setAttribute('disabled', 'disabled');
        }

        html += cardClone.outerHTML;
    });
    cardSection.innerHTML = html;
}

// Render Rejected Jobs
function renderRejectedJobs() {
    let html = '';
    rejectedList.forEach(card => {
        const cardClone = card.cloneNode(true);

        const statusBadge = cardClone.querySelector('.bg-[#EEF4FF]');
        if (statusBadge) {
            statusBadge.innerText = 'Rejected';
            statusBadge.classList.remove('bg-[#EEF4FF]', 'text-[#002C5C]');
            statusBadge.classList.add('bg-[#EF4444]', 'text-white');
        }

        const interviewBtn = cardClone.querySelector('.border-[#10B981]');
        const rejectedBtn = cardClone.querySelector('.border-[#EF4444]');

        if (interviewBtn) {
            interviewBtn.style.opacity = '0.5';
            interviewBtn.style.cursor = 'not-allowed';
            interviewBtn.setAttribute('disabled', 'disabled');
        }

        if (rejectedBtn) {
            rejectedBtn.style.opacity = '0.5';
            rejectedBtn.style.cursor = 'not-allowed';
            rejectedBtn.setAttribute('disabled', 'disabled');
        }

        html += cardClone.outerHTML;
    });
    cardSection.innerHTML = html;
}

allCardSection.addEventListener('click', function(event){
    const target = event.target;
    const jobCard = target.closest('.space-y-2');

    if(!jobCard) return;

    // delete job

    if(target.closest('.fa-trash-can') || target.closest('button')?.classList.contains('bg-white')){
        const jobTitle = jobCard.querySelector('h2')?.innerText || 'Job';

        if(confirm(`Are you sure wat to delete ?`)){
            interviewList = interviewList.filter(card => card !== jobCard);
            rejectedList = rejectedList.filter(card => card !== jobCard);

            jobCard.remove();

            calculate();
            jobsUpdate();


            if(currentStatus === 'interview-btn'){
                if(interviewList.length === 0){
                    cardSection.innerHTML =  `<div class="text-center py-12 bg-white rounded-xl shadow-md mb-10">
                    <div class="text-6xl mb-4"><i class="fa-solid fa-file-lines"></i></div>
                    <h3 class="text-2xl font-bold mb-2" style="color: #10B981">No Interview Jobs</h3>
                    <p class="text-gray-500">Mark jobs as interview to see them here</p>
                </div> `;
                } else {
                    renderInterviewJobs();
                }

            } else if (currentStatus === 'rejected-btn'){
                if (rejectedList.length === 0) {
               cardSection.innerHTML = `<div class="text-center py-12 bg-white rounded-xl shadow-md mb-10">
                    <div class="text-6xl mb-4"><i class="fa-solid fa-file-lines"></i></div>
                    <h3 class="text-2xl font-bold mb-2" style="color: #EF4444">No Rejected Jobs</h3>
                    <p class="text-gray-500">Mark jobs as rejected to see them here</p>
                </div>`;
                } else {
                    renderRejectedJobs();
                }
            } 
        }

        return;
    }

    if(target.classList.contains('border-[#10B981]') && target.innerText.toLowerCase().includes('interview')){

        const statusBadge = jobCard.querySelector('.bg-[#EEF4FF]');

        if(statusBadge){
            statusBadge.innerText = 'Interview';
            statusBadge.classList.remove('bg-[#10B981]', 'text-white');
            statusBadge.classList.add('bg-[#10B981]', 'text-white');
        }

        if(!interviewList.includes(jobCard)){
            interviewList.push(jobCard);
        }

        rejectedList = rejectedList.filter(card => card !== jobCard);

        calculate();
        jobsUpdate();

        if(currentStatus === 'interview-btn'){
            if(interviewList.length === 0){
            cardSection.innerHTML = `<div class="text-center py-12 bg-white rounded-xl shadow-md mb-10">
                    <div class="text-6xl mb-4"><i class="fa-solid fa-file-lines"></i></div>
                    <h3 class="text-2xl font-bold mb-2" style="color: #10B981">No Interview Jobs</h3>
                    <p class="text-gray-500">Mark jobs as interview to see them here</p>
                </div> `;
            } else {
                renderInterviewJobs();
            }
        }
        return;
    }


    if(target.classList.contains('border-[#EF4444]') && target.innerText.toLowerCase().includes('rejected')){

         const statusBadge = jobCard.querySelector('.bg-[#EEF4FF]');

        if(statusBadge){
            statusBadge.innerText = 'Rejected';
            statusBadge.classList.remove('bg-[#EEF4FF]', 'text-white');
            statusBadge.classList.add('bg-[#EF4444]', 'text-white');
        }

        if(!rejectedList.includes(jobCard)){
            rejectedList.push(jobCard);
        }

        interviewList = interviewList.filter(card => card !== jobCard);

        calculate();
        jobsUpdate();

        if(currentStatus === 'rejected-btn'){
            if(rejectedList.length === 0){
                cardSection.innerHTML = `<div class="text-center py-12 bg-white rounded-xl shadow-md mb-10">
                    <div class="text-6xl mb-4"><i class="fa-solid fa-file-lines"></i></div>
                    <h3 class="text-2xl font-bold mb-2" style="color: #EF4444">No Rejected Jobs</h3>
                    <p class="text-gray-500">Mark jobs as rejected to see them here</p>
                </div>`;
            } else{
                renderRejectedJobs();

            }
        }
        return;

    }
});

cardSection.addEventListener('click', function(event){
    const target = event.target;

    if(target.classList.contains('border-[#10B981]') || target.classList.contains('border-[#EF4444]')){
        alert('please go to "All" view to change job status');
        return;
    }

    if(target.closest('.fa-trash-can') || target.closest('button')?.classList.contains('bg-white')){
        const jobCard = target.closest('.space-y-2');
        if(!jobCard) return;

        const jobTitle = jobCard.querySelector('h2')?.innerText || 'Job';


        if (confirm (`Are you sure you want to delete "${jobTitle}"?`)){
            const allCards = allCardSection.children;
            for(let card of allCards){
                const cardTitle = card.querySelector('h2')?.innerText;
                if(cardTitle === jobTitle){
                    interviewList = interviewList.filter(c => c !== card);
                    rejectedList = rejectedList.filter(c => c !== card);

                    card.remove();
                    break;
                }
            }

            calculate();
            jobsUpdate();

            if(currentStatus === 'interview-btn'){
                if (interviewList.length === 0){
                    cardSection.innerHTML =`<div class="text-center py-12 bg-white rounded-xl shadow-md mb-10">
                    <div class="text-6xl mb-4"><i class="fa-solid fa-file-lines"></i></div>
                    <h3 class="text-2xl font-bold mb-2" style="color: #10B981">No Interview Jobs</h3>
                    <p class="text-gray-500">Mark jobs as interview to see them here</p>
                </div> `;
            } else {
                renderInterviewJobs();
            }
        } else if (currentStatus === 'rejected-btn'){
                cardSection.innerHTML = `<div class="text-center py-12 bg-white rounded-xl shadow-md mb-10">
                <div class="text-6xl mb-4"><i class="fa-solid fa-file-lines"></i></div>
                <h3 class="text-2xl font-bold mb-2" style="color: #EF4444">No Rejected Jobs</h3>
                <p class="text-gray-500">Mark jobs as rejected to see them here</p>
            </div>`;
                if (rejectedList.length === 0){
                } else{
                    renderRejectedJobs();
                }
            }

            
        }
    }
});


function addHoverEffects(){
    [allCardSection, cardSection].forEach(section => {
        section.addEventListener('mouseover', function(event){
            const jobCard = event.target.closest('.space-y-2');
            if (jobCard && !jobCard.querySelector('.text-center')){
                jobCard.style.boxShadow = '0 0 0 2px #10B981';
                jobCard.style.transition = 'all 0.3s ease';
            }
        });

        section.addEventListener('mouseout', function(event){
            const jobCard = event.target.closest('.space-y-2');
            if(jobCard && !jobCard.querySelector('.text-center')){
                jobCard.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)';
            }
        });
    });
}

addHoverEffects();