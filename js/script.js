const loadPhone = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/phones?search=iphone"
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones);
};
loadPhone();

const displayPhones = (phones) => {
  let phoneContainer = document.getElementById("phone-container");

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
