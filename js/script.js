const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
};


// diaplay function
const displayPhones = (phones, isShowAll) => {
  let phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = '';

  const showAll = document.getElementById('show-all')
  if(phones.length > 12 && !isShowAll){
    showAll.classList.remove('hidden')
  } else {
    showAll.classList.add('hidden')
  }


  if(!isShowAll){
    phones = phones.slice(0, 12) 
  }

  // loop all the element for each what get from the api
  phones.forEach((phone) => {
    // console.log(phones);

    // create a div where all the phone details are store under the div
    const phoneCard = document.createElement("div");
    phoneCard.classList = "card bg-gray-200 shadow-xl p-5";
    phoneCard.innerHTML = `
                <figure><img src="${phone.image}" alt="Shoes" /></figure>
                <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-center">
                    <button onclick="showDetails('${phone.slug}')" class="btn btn-primary mt-4">Details</button>
                </div>
                </div> `;
        // append the div under phone container 
    phoneContainer.appendChild(phoneCard);
  });

  toggleLoadingSpinner(false);
};

//when click search button get the search input value  
const handleClick = (isShowAll) => {
    // get input field value 
    const searchField = document.getElementById('search-field');
    const searchValue = searchField.value;
    loadPhone(searchValue, isShowAll);
    toggleLoadingSpinner(true);
}


// loading when click search 
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');

    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
}


// handle show all button 
const handleShowAll = () => {

  handleClick(true);

}

const showDetails = async(id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json();
  // console.log(data);

  const phone = data.data;
  showPhoneDetails(phone)
}

const showPhoneDetails = (phone) => {
  const phoneDetailsName = document.getElementById('phone-details-name');
  phoneDetailsName.innerText = phone.name;

  const phoneDetailsContainer = document.getElementById('phone-details-container');
  phoneDetailsContainer.innerHTML = `
          <p><img src="${phone.image}" alt=""></p>
          <p class="text-gray-700"><span class="text-red-700 font-bold">Bluetooth: </span>${phone?.others?.Bluetooth || 'Not Available!'}</p>
          <p class="text-gray-700"><span class="text-red-700 font-bold">GPS: </span>${phone?.others?.GPS || 'Not Available!'}</p> 
  `
  console.log(phone);
  show_details_modal.showModal();
  
}