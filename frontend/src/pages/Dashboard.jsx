import { useState } from 'react'
import '../styles/Dashboard.css'
import axios from 'axios'

const emojiDictionary = {
    // fruits
    apple: "🍎",
    greenApple: "🍏",
    pear: "🍐",
    peach: "🍑",
    cherries: "🍒",
    grapes: "🍇",
    melon: "🍈",
    watermelon: "🍉",
    strawberry: "🍓",
    blueberries: "🫐",
    kiwi: "🥝",
    banana: "🍌",
    lemon: "🍋",
    orange: "🍊",
    pineapple: "🍍",
    mango: "🥭",
    coconut: "🥥",

    // vegetables
    carrot: "🥕",
    potato: "🥔",
    corn: "🌽",
    tomato: "🍅",
    onion: "🧅",
    garlic: "🧄",
    broccoli: "🥦",
    cucumber: "🥒",
    greens: "🥬",
    mushroom: "🍄",
    pepper: "🫑",
    chili: "🌶️",
    avocado: "🥑",

    // meat & protein
    beef: "🥩",
    chicken: "🍗",
    fish: "🐟",
    shrimp: "🦐",
    crab: "🦀",
    lobster: "🦞",
    bacon: "🥓",
    sausage: "🌭",
    egg: "🥚",
    beans: "🫘",

    // dairy
    milk: "🥛",
    cheese: "🧀",
    butter: "🧈",
    cream: "🍶",
    yogurt: "🥣",
    iceCream: "🍨",

    // grains 
    bread: "🍞",
    baguette: "🥖",
    croissant: "🥐",
    rice: "🍚",
};

function Dashboard() {
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        datePurchased: '',
        expirationDate: '',
        category: '',
        brand: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // temporary sample user
        const user_id = "12345";

        const newItem = {
            name: formData.name,
            quantity: formData.quantity,
            datePurchased: formData.datePurchased,
            expirationDate: formData.expirationDate,
            category: formData.category,
            brand: formData.brand,
            user_id: user_id,
        };

        axios
            .post("http://localhost:5000/api/add-item", newItem)
            .then((response) => {
                console.log("Item added succesfully: ", response.data);
                alert(`Added ${formData.name} to fridge!`);

                // reset form
                setFormData({
                    name: '',
                    quantity: '',
                    datePurchased: '',
                    expirationDate: '',
                    category: '',
                    brand: '',
                });

                setShowForm(false);

            })
            .catch((error) => {
                console.error("Error adding item:", error);
                alert(`Error adding item`);
            });
    };

    const handleCancel = () => {
        setFormData({
        name: '',
        quantity: '',
        datePurchased: '',
        expirationDate: '',
        category: '',
        brand: '',
        })
        setShowForm(false) // close form when canceled
    }

    return (
        <div className="dashboard-container">

        {/* Form Hidden */}
        {!showForm && (
            <button className="add-food-btn" onClick={() => setShowForm(true)}>
            Add Food +
            </button>
        )}

        {/* Form Shown */}
        {showForm && (
            <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div class="form_title">
                <h1>Add a New Item</h1>
                </div>

                {/* Item Name */}
                <div class="item_name">
                <input
                    type="text"
                    class="form-control"
                    placeholder="Item Name *"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                </div>

                {/* Quantity*/}
                <div class="item_quantity">
                <input
                    type="number"
                    class="form-control"
                    placeholder="Quantity *"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    min="1"
                    required
                />
                </div>

                {/* Date Purchased */}
                <div class="date_purchased">
                <label class="form-label">Date Purchased *</label>
                <input
                    type="date"
                    class="form-control"
                    name="datePurchased"
                    value={formData.datePurchased}
                    onChange={handleChange}
                    required
                />
                </div>

                {/* Expiration */}
                <div class="expiration_date">
                <label class="form-label">Expiration Date (optional)</label>
                <input
                    type="date"
                    class="form-control"
                    name="expirationDate"
                    value={formData.expirationDate}
                    onChange={handleChange}
                />
                </div>

                {/* Category */}
                <div class="item_category">
                <select
                    class="form-control"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Category *</option>
                    <option value="fruits">Fruits</option>
                    <option value="vegetables">Vegetables</option>
                    <option value="dairy">Dairy</option>
                    <option value="meat">Meat</option>
                    <option value="grains">Grains</option>
                </select>
                </div>

                {/* Brand */}
                <div class="item_brand">
                <input
                    type="text"
                    class="form-control"
                    placeholder="Brand (optional)"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                />
                </div>

                {/* Buttons */}
                <div class="button-row">
                <div class="cancel">
                    <button
                    type="button"
                    class="form-control form_button form_button_cancel"
                    onClick={handleCancel}
                    >
                    Back
                    </button>
                </div>

                <div class="add">
                    <button
                    type="submit"
                    class="form-control form_button form_button_register"
                    >
                    Add
                    </button>
                </div>
                </div>
            </form>
            </div>
        )}
        </div>
    )
}

export default Dashboard
