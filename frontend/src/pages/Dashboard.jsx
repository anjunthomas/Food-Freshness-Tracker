import { useState, useEffect } from 'react'
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
    cereal: "🥣",
};

function Dashboard() {
    const [items, setItems] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        datePurchased: '',
        expirationDate: '',
        category: '',
        brand: '',
    });

    function getEmoji(name) {
        if (!name) return "❓";
        const key = name.toLowerCase().replace(/\s+/g, "");
        return emojiDictionary[key] || "❓";
    }

    // Fetch items on load
    useEffect(() => {
        const user_id = localStorage.getItem("user_id");

        if (!user_id) {
            console.warn("No user logged in — cannot fetch items.");
            return;
        }

        axios
            .get(`http://127.0.0.1:5000/api/items/${user_id}`)
            .then(res => setItems(res.data))
            .catch(err => console.error("Error fetching items:", err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const user_id = localStorage.getItem("user_id");
        if (!user_id) {
            alert("Error: user not logged in");
            return;
        }

        const newItem = {
            name: formData.name,
            quantity: formData.quantity,
            date_purchased: formData.datePurchased,
            expiration_date: formData.expirationDate,
            category: formData.category,
            brand: formData.brand,
            user_id: user_id,
        };

        axios
            .post("http://127.0.0.1:5000/api/add-item", newItem)
            .then((response) => {
                console.log("Item added succesfully: ", response.data);
                alert(`Added ${formData.name} to fridge!`);

                // re-fetch items so dashboard updates immediately
                axios
                    .get(`http://127.0.0.1:5000/api/items/${user_id}`)
                    .then(res => setItems(res.data))
                    .catch(err => console.error(err));

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
                alert("Error adding item");
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
        });
        setShowForm(false);
    };

    return (
        <div className="dashboard-container">

            {/* Display Items */}
            {!showForm && (
                <div className="fridge-items">
                    {items.length === 0 ? (
                        <p>No items yet!</p>
                    ) : (
                        items.slice(0, 4).map((item) => (
                            <div key={item.id} className="fridge-item">
                                <span className="emoji">{getEmoji(item.name)}</span>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Form Hidden */}
            {!showForm && (
                <button className="add-food-btn" onClick={() => setShowForm(true)}>
                    Add Food +
                </button>
            )}

            {/* Dim Background */}
            {showForm && <div className="overlay"></div>}

            {/* Form Shown */}
            {showForm && (
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form_title">
                            <h1>Add a New Item</h1>
                        </div>

                        <div className="item_name">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Item Name *"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="item_quantity">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Quantity *"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                min="1"
                                required
                            />
                        </div>

                        <div className="date_purchased">
                            <label className="form-label">Date Purchased *</label>
                            <input
                                type="date"
                                className="form-control"
                                name="datePurchased"
                                value={formData.datePurchased}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="expiration_date">
                            <label className="form-label">Expiration Date (optional)</label>
                            <input
                                type="date"
                                className="form-control"
                                name="expirationDate"
                                value={formData.expirationDate}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="item_category">
                            <select
                                className="form-control"
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

                        <div className="item_brand">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Brand (optional)"
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="button-row">
                            <div className="cancel">
                                <button
                                    type="button"
                                    className="form-control form_button form_button_cancel"
                                    onClick={handleCancel}
                                >
                                    Back
                                </button>
                            </div>

                            <div className="add">
                                <button
                                    type="submit"
                                    className="form-control form_button form_button_register"
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
