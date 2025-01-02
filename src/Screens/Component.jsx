import { useState } from 'react';
import './component.css';
import { GetData } from '../Context';

function Component(params) {
    const [quantity, setQuantity] = useState(1);
    const { updateBill } = GetData();

    // Create unique IDs for each component instance
    const statusId = `status-${params.name}`;
    const quantityId = `quantity-${params.name}`;

    // #status{
    //     background-color: rgb(205, 254, 205);
    //     color: rgb(27, 255, 27);
    //     height: 0rem;
    //     font-size: 0.6rem;
    //     padding: 0.2rem;
    //     font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    
    // }

    function handleMinus(e) {
        e.preventDefault();
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    }

    function handleItem(e) {
        e.preventDefault();
        let item = {
            food: params.name,
            price: params.price,
            quantity: quantity,
            total: quantity * parseInt(params.price),
        };
        console.log(item);
        updateBill(item);

        // Use unique ID to target the correct status element
        let element = document.getElementById(statusId);
        element.style.backgroundColor = 'rgb(205, 254, 205)';
        element.style.color = 'rgb(67, 255, 67)';
        element.style.display = 'block';
        element.style.padding = '0.2rem';
        element.style.fontSize = '0.8rem';
        element.style.fontFamily = '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif';
        element.innerHTML = "Item added to cart";

        setTimeout(() => {
            element.style.display = 'none';
        }, 2000);
    }

    return (
        <div className='component'>
            <section id={statusId} style={{ display: 'none' }}></section>
            <section>{params.name && params.name}</section>
            <section>₹ {params.price && " " + params.price}</section>
            <section style={{ display: "flex", flexDirection: "row", gap: "0.5rem" }}>
                <input
                    id={quantityId}
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                />
                <button id='quantity' onClick={() => setQuantity(quantity + 1)}>+</button>
                <button id='quantity' onClick={handleMinus}>-</button>
            </section>
            <button onClick={handleItem}>Add Item</button>
        </div>
    );
}

export default Component;
