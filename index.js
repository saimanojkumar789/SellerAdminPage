let form = document.getElementById('form');
let price = document.getElementById('price');
let name = document.getElementById('name');
let category = document.getElementById('category');
let items = document.getElementById('items');
let Electronics = document.getElementById('electronics');
let Food = document.getElementById('food');
let Skincare = document.getElementById('skincare');


form.addEventListener('submit',onSubmit);

items.addEventListener('click',clicked);

window.addEventListener('DOMContentLoaded', () => {
    axios.get('https://crudcrud.com/api/1ac7ad031c244d8e8f40fe26c4205529/products')
    .then( (res) => {
        for(let i=0;i<res.data.length;i++){
            showOutput(res.data[i]);
        }
    })
    .catch( (err) => console.log(err));
})

function onSubmit(e){
    e.preventDefault();

    const obj = {
        price : price.value,
        name : name.value,
        category : category.value
    }

    axios.post('https://crudcrud.com/api/1ac7ad031c244d8e8f40fe26c4205529/products',obj)
    .then ((res) => {
        showOutput(res.data);
    })
    .catch(err => console.log(err));
}

function showOutput(data){
    let price = data.price;
    let name = data.name;
    let category = data.category;

    let li = document.createElement('li');
    li.className = "list-group-item";
    li.setAttribute('data-id',data._id);
    li.innerText = `${price} - ${category} - ${name} `;

    let del = document.createElement('button');
    del.className = "delete";
    del.style.float = "right";
    del.innerText = "delete product";

    li.appendChild(del);

    if(category === 'Food')
        Food.appendChild(li);
    else if(category === 'Electronics')
        Electronics.appendChild(li);
    else
        Skincare.appendChild(li);
}



function clicked(e){
    if(e.target.classList.contains('delete')){
        if(confirm('Are you sure?')){
            let li = e.target.parentElement;
            let id = li.getAttribute('data-id');
            let category = li.textContent.split(" - ")[1];

            axios.delete(`https://crudcrud.com/api/1ac7ad031c244d8e8f40fe26c4205529/products/${id}`)
            .then( (res) => {
                if(category === 'Food')
                    Food.removeChild(li);
                else if(category === 'Electronics')
                    Electronics.removeChild(li);
                else
                    Skincare.removeChild(li);
            })
            .catch( err => console.log(err));
        }
    }
}