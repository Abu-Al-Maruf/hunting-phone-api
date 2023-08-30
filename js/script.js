const loadPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones);
};


// diaplay function
const displayPhones = (phones) => {
  let phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = '';

  const showAll = document.getElementById('show-all')
  if(phones.length > 12){
    showAll.classList.remove('hidden')
  } else {
    showAll.classList.add('hidden')
  }

  phones = phones.slice(0, 12) 

  // loop all the element for each what get from the api
  phones.forEach((phone) => {
    console.log(phone);

    // create a div where all the phone details are store under the div
    const phoneCard = document.createElement("div");
    phoneCard.classList = "card bg-gray-200 shadow-xl p-5";
    phoneCard.innerHTML = `
                <figure><img src="${phone.image}" alt="Shoes" /></figure>
                <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">Buy Now</button>
                </div>
                </div> `;
        // append the div under phone container 
    phoneContainer.appendChild(phoneCard);
  });
};

//when click search button get the search input value  
const handleClick = () => {
    // get input field value 
    const searchField = document.getElementById('search-field');
    const searchValue = searchField.value;
    loadPhone(searchValue);
}
