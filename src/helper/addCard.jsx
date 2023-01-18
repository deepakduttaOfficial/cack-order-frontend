export const addcard = (product) => {
  if (typeof window !== "undefined") {
    let card = [];
    if (localStorage.getItem("add_card")) {
      JSON.parse(localStorage.getItem("add_card")).map((item) => {
        card.push(item);
      });
    }
    card.push(product);

    localStorage.setItem("add_card", JSON.stringify(card));
  } else {
    return false;
  }
};

export const getaddcard = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("add_card")) {
      return JSON.parse(localStorage.getItem("add_card"));
    } else {
      return [];
    }
  } else {
    return false;
  }
};

export const removeAlladdcard = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("add_card")) {
      localStorage.removeItem("add_card");
    }
  } else {
    return false;
  }
};

export const removeaddcard = (id) => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("add_card")) {
      const products = JSON.parse(localStorage.getItem("add_card"));
      let newProduct = products.filter((product) => product._id !== id);
      localStorage.setItem("add_card", JSON.stringify(newProduct));
    } else {
      return [];
    }
  } else {
    return false;
  }
};

export const updateQuantity = (quan, id) => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("add_card")) {
      const products = JSON.parse(localStorage.getItem("add_card"));
      let newProduct = [];

      for (const product of products) {
        if (product._id === id) {
          product.quantity = quan;
          newProduct.push(product);
        } else {
          newProduct.push(product);
        }
      }
      localStorage.setItem("add_card", JSON.stringify(newProduct));
    } else {
      return [];
    }
  } else {
    return false;
  }
};

export const totalPrice = (products) => {
  if (products) {
    let price = 0;
    products.map((product) => {
      price = price + product.price * (product.quantity || 1);
    });
    return price;
  } else {
    return false;
  }
};
