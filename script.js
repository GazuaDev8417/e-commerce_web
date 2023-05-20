const minValue = document.querySelector('#minValue')
const maxValue = document.querySelector('#maxValue')
const searchByName = document.querySelector('#searchByName')
const sortSelect = document.querySelector('#sort-select')
const url = 'https://e-commerce-server-chi.vercel.app'




const getProducts = ()=>{
    
    fetch(`${url}/products`).then(res=> res.json()).then(data=>{
        document.getElementById('qnt-products').innerHTML = `Quantidade de produtos: ${data.length}`

        document.querySelector('.filters').addEventListener('input', (e)=>{
            if(e.target === minValue){
                const filteredAndOrderedList = data.filter((product) => minValue.value ? product.price < minValue.value : true)

                document.getElementById('qnt-products').innerHTML = `Quantidade de produtos: ${filteredAndOrderedList.length}`

                document.getElementById('productsGrid').innerHTML = filteredAndOrderedList.map(product=>{
                    return `
                    <div class='border border-3 rounded card-container'>
                        <img src=${product.photo} width=350 alt="Imagem do produto">
                        <div class='card-info'>
                            <p>${product.name}</p>
                            <p>R$ ${Math.floor(Math.random() * 1000)},00</p>
                            <div class='addToCart'>
                                <button class='btn btn-dark'
                                    onclick='onAddProductToCart(${JSON.stringify(product)})'>
                                    Adicionar ao carrinho
                                </button>
                            </div>
                        </div>
                    </div>
                            `
                }).join('')

            }else if(e.target === maxValue){
                const filteredAndOrderedList =  data.filter((product) => maxValue.value ? product.price < maxValue.value : true)

                document.getElementById('qnt-products').innerHTML = `Quantidade de produtos: ${filteredAndOrderedList.length}`

                document.getElementById('productsGrid').innerHTML = filteredAndOrderedList.map(product=>{
                    return `
                        <div class='border border-3 rounded card-container'>
                            <img src=${product.photo} width=350 alt="Imagem do produto">
                            <div class='card-info'>
                                <p>${product.name}</p>
                                <p>R$ ${Math.floor(Math.random() * 1000)},00</p>
                                <div class='addToCart'>
                                    <button class='btn btn-dark'
                                        onclick='onAddProductToCart(${JSON.stringify(product)})'>
                                        Adicionar ao carrinho
                                    </button>
                                </div>
                            </div>
                        </div>
                            `
                }).join('')

            }else if(e.target === searchByName){
                const filteredAndOrderedList = data.filter((product) => searchByName.value ? product.name.includes(searchByName.value) : true)

                document.getElementById('qnt-products').innerHTML = `Quantidade de produtos: ${filteredAndOrderedList.length}`

                document.getElementById('productsGrid').innerHTML = filteredAndOrderedList.map(product=>{
                    return `
                        <div class='border border-3 rounded card-container'>
                            <img src=${product.photo} width=350 alt="Imagem do produto">
                            <div class='card-info'>
                                <p>${product.name}</p>
                                <p>R$ ${Math.floor(Math.random() * 1000)},00</p>
                                <div class='addToCart'>
                                    <button class='btn btn-dark'
                                        onclick='onAddProductToCart(${JSON.stringify(product)})'>
                                        Adicionar ao carrinho
                                    </button>
                                </div>
                            </div>
                        </div>
                            `
                }).join('')

            }else if(e.target === sortSelect){
                const filteredAndOrderedList = data.sort((a, b) => sortSelect.value === 'CRESCENTE' ? a.price - b.price : b.price - a.price)

                document.getElementById('productsGrid').innerHTML = filteredAndOrderedList.map(product=>{
                    return `
                    <div class='border border-3 rounded card-container'>
                        <img src=${product.photo} width=350 alt="Imagem do produto">
                        <div class='card-info'>
                            <p>${product.name}</p>
                            <p>R$ ${Math.floor(Math.random() * 1000)},00</p>
                            <div class='addToCart'>
                                <button class='btn btn-dark'
                                    onclick='onAddProductToCart(${JSON.stringify(product)})'>
                                    Adicionar ao carrinho
                                </button>
                            </div>
                        </div>
                    </div>
                            `
                }).join('')
            }
        })
        
        
        document.getElementById('productsGrid').innerHTML = data.map(product=>{
            return `
            <div class='border border-3 rounded card-container'>
                <img src=${product.photo} width=350 alt="Imagem do produto">
                <div class='card-info'>
                    <p>${product.name}</p>
                    <p>R$ ${Math.floor(Math.random() * 1000)},00</p>
                    <div class='addToCart'>
                        <button class='btn btn-dark'
                            onclick='onAddProductToCart(${JSON.stringify(product)})'>
                            Adicionar ao carrinho
                        </button>
                    </div>
                </div>
            </div>
                    `
        }).join('')
                
    }).catch(e=>{
        alert(e.message)
        console.log(e.message)
    })
}
            
getProducts()

            
            
const onAddProductToCart = (product)=>{
        const body = {
            name: product.name,
            price: Math.floor(Math.random() * 1000).toFixed(2)
        }
    
    fetch(`${url}/cart/${product.id}`, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(()=>{
        getProductsInCart()
    }).catch(e=>{
        alert(e.message)
    })
}


const onRemoveProductFromCart = (productId) => {
    fetch(`${url}/cart/${productId}`, {
        method:'DELETE'
    }).then(()=>{
        getProductsInCart()
    }).catch(e=>{
        alert(e.response.data)
    })
}


const getProductsInCart = ()=>{
    fetch(`${url}/cart`).then(res => res.json()).then(data=>{
        document.getElementById('cartContainer').innerHTML = data.map(product=>{
            return `
                <div class='item-container'>
                    <p>${product.quantity}x ${product.name}</p>
                    <button class='btn btn-dark'
                        onclick="onRemoveProductFromCart('${product.id}')">
                        Remover
                    </button>
                </div>
            `
        }).join('')
        
        let totalValue = 0

        for(let product of data) {
            totalValue += product.price * product.quantity
        }
        
        document.getElementById('total').innerHTML = `Valor total R$ ${totalValue}`
    }).catch(e=>{
        console.log(e.message)
    })
}

getProductsInCart()